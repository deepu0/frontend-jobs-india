/**
 * Indeed India scraper – scrapes public job listings from in.indeed.com.
 * Uses the public search pages with stealth measures.
 */

import * as cheerio from 'cheerio';
import { BaseScraper } from '../base-scraper';
import { JobSource, ScrapedJob } from '../types';
import { GENERAL_SEARCH_QUERIES } from '../config';
import { createSourceLogger } from '../utils/logger';
import { humanSleep } from '../utils/stealth';
import { extractTags } from '../utils/filters';

export class IndeedScraper extends BaseScraper {
  readonly name: JobSource = 'indeed';
  protected log = createSourceLogger('indeed');

  private readonly baseUrl = 'https://in.indeed.com';

  protected async fetchJobs(): Promise<ScrapedJob[]> {
    const allJobs: ScrapedJob[] = [];
    const seenUrls = new Set<string>();

    for (const query of GENERAL_SEARCH_QUERIES) {
      try {
        const jobs = await this.searchJobs(query);
        for (const job of jobs) {
          if (!seenUrls.has(job.url)) {
            seenUrls.add(job.url);
            allJobs.push(job);
          }
        }

        await humanSleep(4000, 8000);
      } catch (err) {
        this.log.error(
          `Failed to search Indeed for "${query}": ${(err as Error).message}`,
        );
        this.addError(
          `Failed to search for "${query}": ${(err as Error).message}`,
        );
      }
    }

    return allJobs;
  }

  private async searchJobs(query: string): Promise<ScrapedJob[]> {
    const jobs: ScrapedJob[] = [];

    // Search first two pages
    for (let start = 0; start <= 10; start += 10) {
      try {
        const url = `${this.baseUrl}/jobs`;
        const params: Record<string, string> = {
          q: query,
          l: 'India',
          start: String(start),
          fromage: '7', // Last 7 days
          sort: 'date',
        };

        this.log.info(
          `Fetching Indeed jobs: "${query}" (offset ${start})`,
        );

        const response = await this.get<string>(url, {
          params,
          headers: this.getStealthHeaders({
            Referer: `${this.baseUrl}/`,
          }),
        });

        if (response.status === 403) {
          this.log.warn('Indeed blocked request (403) – rotating session');
          await humanSleep(10000, 20000);
          continue;
        }

        if (response.status !== 200) {
          this.log.warn(`Indeed returned status ${response.status}`);
          continue;
        }

        const html = typeof response.data === 'string' ? response.data : '';

        // Try to extract from embedded JSON first (more reliable)
        const jsonJobs = this.extractFromJson(html);
        if (jsonJobs.length > 0) {
          jobs.push(...jsonJobs);
          this.log.info(
            `Extracted ${jsonJobs.length} jobs from Indeed JSON (offset ${start})`,
          );
        } else {
          // Fall back to HTML parsing
          const htmlJobs = this.parseJobCards(html);
          jobs.push(...htmlJobs);
          this.log.info(
            `Parsed ${htmlJobs.length} jobs from Indeed HTML (offset ${start})`,
          );
        }

        await humanSleep(3000, 6000);
      } catch (err) {
        this.log.warn(
          `Failed to fetch Indeed page (offset ${start}): ${(err as Error).message}`,
        );
      }
    }

    return jobs;
  }

  private extractFromJson(html: string): ScrapedJob[] {
    const jobs: ScrapedJob[] = [];

    // Indeed embeds job data in a script tag as window._initialData or mosaic-provider-jobcards
    const jsonPatterns = [
      /window\._initialData\s*=\s*({.+?});/s,
      /window\.mosaic\.providerData\["mosaic-provider-jobcards"\]\s*=\s*({.+?});/s,
    ];

    for (const pattern of jsonPatterns) {
      const match = html.match(pattern);
      if (match?.[1]) {
        try {
          const data = JSON.parse(match[1]);
          this.traverseForJobs(data, jobs);
        } catch {
          // Ignore parse errors
        }
      }
    }

    // Also check script tags
    const $ = cheerio.load(html);
    $('script').each((_, el) => {
      const text = $(el).html() || '';
      if (text.includes('jobKeysWithInfo') || text.includes('jobResults')) {
        try {
          // Try to extract JSON from the script
          const jsonMatch = text.match(/({[\s\S]*"results"[\s\S]*})/);
          if (jsonMatch) {
            const data = JSON.parse(jsonMatch[1]);
            this.traverseForJobs(data, jobs);
          }
        } catch {
          // Ignore
        }
      }
    });

    return jobs;
  }

  private traverseForJobs(data: unknown, jobs: ScrapedJob[]): void {
    if (!data || typeof data !== 'object') return;

    const traverse = (obj: unknown): void => {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) {
        obj.forEach(traverse);
        return;
      }

      const record = obj as Record<string, unknown>;

      // Look for job result objects
      if (
        record.title &&
        typeof record.title === 'string' &&
        (record.company || record.companyName) &&
        (record.jobkey || record.jk || record.id)
      ) {
        const jobKey = (record.jobkey || record.jk || record.id) as string;
        const company =
          (record.company as string) ||
          (record.companyName as string) ||
          'Unknown';
        const location =
          (record.formattedLocation as string) ||
          (record.location as string) ||
          '';
        const snippet =
          (record.snippet as string) || (record.description as string) || '';

        jobs.push(
          this.createJob({
            title: record.title as string,
            company,
            location,
            description: snippet,
            url: `${this.baseUrl}/viewjob?jk=${jobKey}`,
            salary:
              (record.formattedSalary as string) ||
              (record.salary as string) ||
              null,
            postedAt: record.pubDate
              ? new Date(record.pubDate as string).toISOString()
              : null,
            tags: extractTags(snippet),
          }),
        );
        return;
      }

      Object.values(record).forEach(traverse);
    };

    traverse(data);
  }

  private parseJobCards(html: string): ScrapedJob[] {
    const jobs: ScrapedJob[] = [];
    const $ = cheerio.load(html);

    // Indeed job cards
    $(
      '.job_seen_beacon, .jobsearch-ResultsList > li, .result, [class*="cardOutline"], [data-jk]',
    ).each((_, el) => {
      try {
        const $el = $(el);

        const title = $el
          .find(
            '.jobTitle span, h2.jobTitle a, [class*="jobTitle"] span, a[data-jk]',
          )
          .first()
          .text()
          .trim();

        const company = $el
          .find(
            '.companyName, [data-testid="company-name"], [class*="company"]',
          )
          .first()
          .text()
          .trim();

        const location = $el
          .find(
            '.companyLocation, [data-testid="text-location"], [class*="location"]',
          )
          .first()
          .text()
          .trim();

        const jobKey =
          $el.attr('data-jk') ||
          $el.find('a[data-jk]').first().attr('data-jk') ||
          $el.find('a[href*="jk="]').first().attr('href')?.match(/jk=([^&]+)/)?.[1] ||
          '';

        const salary = $el
          .find(
            '.salary-snippet-container, [class*="salary"], .metadata.salary-snippet-container',
          )
          .first()
          .text()
          .trim() || null;

        const snippet = $el
          .find('.job-snippet, [class*="job-snippet"]')
          .first()
          .text()
          .trim();

        const dateText = $el
          .find('.date, [class*="date"]')
          .first()
          .text()
          .trim();

        if (title && jobKey) {
          jobs.push(
            this.createJob({
              title,
              company: company || 'Unknown',
              location: location || 'India',
              description: snippet || '',
              url: `${this.baseUrl}/viewjob?jk=${jobKey}`,
              salary,
              tags: extractTags(`${title} ${snippet}`),
            }),
          );
        }
      } catch {
        // Skip malformed cards
      }
    });

    return jobs;
  }
}
