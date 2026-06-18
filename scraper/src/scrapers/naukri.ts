/**
 * Naukri.com scraper – India's largest job board.
 * Scrapes the public search results pages and attempts to use
 * the internal API endpoints that power the search.
 */

import * as cheerio from 'cheerio';
import { BaseScraper } from '../base-scraper';
import { JobSource, ScrapedJob } from '../types';
import { NAUKRI_SEARCH_QUERIES } from '../config';
import { createSourceLogger } from '../utils/logger';
import { humanSleep } from '../utils/stealth';
import { extractTags } from '../utils/filters';

interface NaukriJobData {
  title: string;
  companyName: string;
  placeholders: Array<{ type: string; label: string }>;
  jdURL: string;
  jobDescription: string;
  tagsAndSkills: string;
  footerPlaceholderLabel: string;
  createdDate: string;
  ambitionBoxData?: {
    CompanyName: string;
  };
  salary?: string;
  staticUrl?: string;
}

interface NaukriApiResponse {
  jobDetails: NaukriJobData[];
  noOfJobs: number;
}

export class NaukriScraper extends BaseScraper {
  readonly name: JobSource = 'naukri';
  protected log = createSourceLogger('naukri');

  protected async fetchJobs(): Promise<ScrapedJob[]> {
    const allJobs: ScrapedJob[] = [];
    const seenUrls = new Set<string>();

    for (const query of NAUKRI_SEARCH_QUERIES) {
      try {
        // Strategy 1: Use the internal API
        const apiJobs = await this.fetchViaApi(query);
        for (const job of apiJobs) {
          if (!seenUrls.has(job.url)) {
            seenUrls.add(job.url);
            allJobs.push(job);
          }
        }

        await humanSleep(2000, 4500);
      } catch (err) {
        this.log.warn(`API approach failed for "${query}": ${(err as Error).message}`);

        // Strategy 2: Scrape HTML
        try {
          const htmlJobs = await this.fetchViaHtml(query);
          for (const job of htmlJobs) {
            if (!seenUrls.has(job.url)) {
              seenUrls.add(job.url);
              allJobs.push(job);
            }
          }
        } catch (htmlErr) {
          this.log.error(
            `HTML scrape also failed for "${query}": ${(htmlErr as Error).message}`,
          );
          this.addError(
            `Failed to scrape Naukri for "${query}": ${(htmlErr as Error).message}`,
          );
        }

        await humanSleep(3000, 6000);
      }
    }

    return allJobs;
  }

  private async fetchViaApi(query: string): Promise<ScrapedJob[]> {
    const jobs: ScrapedJob[] = [];
    const encodedQuery = encodeURIComponent(query.replace(/\s+/g, '-'));

    // Naukri's internal API endpoint
    const url = `https://www.naukri.com/jobapi/v3/search`;
    const params: Record<string, string> = {
      noOfResults: '50',
      urlType: 'search_by_keyword',
      searchType: 'adv',
      keyword: query,
      pageNo: '1',
      k: query,
      seoKey: encodedQuery,
      src: 'jobsearchDesk',
      latLong: '',
    };

    const response = await this.get<NaukriApiResponse>(url, {
      params,
      headers: {
        ...this.getStealthHeaders({
          Referer: `https://www.naukri.com/${encodedQuery}-jobs`,
        }),
        appid: '109',
        systemid: 'Jeeves',
        'gid': 'LOCATION,INDUSTRY,EDUCATION,FAREA_ROLE',
      },
    });

    if (response.data?.jobDetails && Array.isArray(response.data.jobDetails)) {
      this.log.info(
        `Naukri API returned ${response.data.jobDetails.length} jobs for "${query}"`,
      );

      for (const jobData of response.data.jobDetails) {
        const job = this.mapApiJob(jobData);
        if (job) jobs.push(job);
      }
    }

    return jobs;
  }

  private mapApiJob(data: NaukriJobData): ScrapedJob | null {
    if (!data.title || !data.jdURL) return null;

    const location =
      data.placeholders
        ?.filter((p) => p.type === 'location')
        .map((p) => p.label)
        .join(', ') || '';

    const experience =
      data.placeholders
        ?.filter((p) => p.type === 'experience')
        .map((p) => p.label)
        .join(', ') || '';

    const salary =
      data.salary ||
      data.placeholders
        ?.filter((p) => p.type === 'salary')
        .map((p) => p.label)
        .join(', ') ||
      null;

    const url = data.jdURL.startsWith('http')
      ? data.jdURL
      : `https://www.naukri.com${data.jdURL}`;

    const description = data.jobDescription || '';
    const skills = data.tagsAndSkills
      ? data.tagsAndSkills.split(',').map((s) => s.trim())
      : [];

    return this.createJob({
      title: data.title,
      company: data.companyName || data.ambitionBoxData?.CompanyName || 'Unknown',
      location,
      description: `${description}\n\nExperience: ${experience}`,
      url,
      salary,
      postedAt: data.createdDate
        ? new Date(data.createdDate).toISOString()
        : null,
      tags: skills.length > 0 ? skills : extractTags(description),
    });
  }

  private async fetchViaHtml(query: string): Promise<ScrapedJob[]> {
    const jobs: ScrapedJob[] = [];
    const encodedQuery = query.replace(/\s+/g, '-').toLowerCase();
    const url = `https://www.naukri.com/${encodedQuery}-jobs`;

    this.log.info(`Fetching Naukri HTML: ${url}`);

    const response = await this.get<string>(url, {
      headers: this.getStealthHeaders({
        Referer: 'https://www.naukri.com/',
      }),
    });

    if (response.status !== 200) {
      throw new Error(`Naukri returned status ${response.status}`);
    }

    const html = typeof response.data === 'string' ? response.data : '';
    const $ = cheerio.load(html);

    // Parse job cards
    $('.srp-jobtuple-wrapper, .jobTuple, [class*="jobTuple"]').each((_, el) => {
      try {
        const $el = $(el);
        const title = $el.find('.title, .desig, a.title').first().text().trim();
        const company = $el
          .find('.comp-name, .companyInfo .subTitle, a.subTitle')
          .first()
          .text()
          .trim();
        const location = $el
          .find('.loc, .locWdth, [class*="location"]')
          .first()
          .text()
          .trim();
        const link =
          $el.find('a.title, a[class*="title"]').first().attr('href') || '';
        const salary = $el
          .find('.sal, [class*="salary"]')
          .first()
          .text()
          .trim() || null;
        const experience = $el
          .find('.exp, .expwdth, [class*="experience"]')
          .first()
          .text()
          .trim();
        const description = $el
          .find('.job-desc, .ellipsis, [class*="description"]')
          .first()
          .text()
          .trim();
        const skills = $el
          .find('.tags-gt li, .tag-li, [class*="skill"], [class*="tag"]')
          .map((_, tag) => $(tag).text().trim())
          .get()
          .filter(Boolean);

        if (title && link) {
          const jobUrl = link.startsWith('http')
            ? link
            : `https://www.naukri.com${link}`;

          jobs.push(
            this.createJob({
              title,
              company: company || 'Unknown',
              location,
              description: `${description}\n\nExperience: ${experience}`,
              url: jobUrl,
              salary,
              tags: skills.length > 0 ? skills : extractTags(description),
            }),
          );
        }
      } catch {
        // Skip malformed cards
      }
    });

    // Also try to extract from __NEXT_DATA__ or embedded JSON
    $('script#__NEXT_DATA__, script[type="application/json"]').each((_, el) => {
      try {
        const jsonText = $(el).html();
        if (!jsonText) return;
        const data = JSON.parse(jsonText);
        const jobDetails = this.findJobDetails(data);
        for (const jobData of jobDetails) {
          const job = this.mapApiJob(jobData);
          if (job) jobs.push(job);
        }
      } catch {
        // Ignore parse errors
      }
    });

    this.log.info(`Parsed ${jobs.length} jobs from Naukri HTML for "${query}"`);
    return jobs;
  }

  private findJobDetails(data: unknown): NaukriJobData[] {
    const results: NaukriJobData[] = [];

    const traverse = (obj: unknown): void => {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) {
        obj.forEach(traverse);
        return;
      }

      const record = obj as Record<string, unknown>;

      if (record.jobDetails && Array.isArray(record.jobDetails)) {
        results.push(...(record.jobDetails as NaukriJobData[]));
        return;
      }

      Object.values(record).forEach(traverse);
    };

    traverse(data);
    return results;
  }
}
