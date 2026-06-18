/**
 * LinkedIn Jobs scraper – scrapes public job listings.
 * Uses the public job search pages (no authentication required).
 * LinkedIn is aggressive with anti-scraping, so this scraper
 * uses extra caution with delays and session rotation.
 */

import * as cheerio from 'cheerio';
import { BaseScraper } from '../base-scraper';
import { JobSource, ScrapedJob } from '../types';
import { GENERAL_SEARCH_QUERIES } from '../config';
import { createSourceLogger } from '../utils/logger';
import { humanSleep } from '../utils/stealth';
import { extractTags } from '../utils/filters';

export class LinkedInScraper extends BaseScraper {
  readonly name: JobSource = 'linkedin';
  protected log = createSourceLogger('linkedin');

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

        // LinkedIn needs longer delays
        await humanSleep(5000, 10000);
      } catch (err) {
        this.log.error(
          `Failed to search LinkedIn for "${query}": ${(err as Error).message}`,
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
    const encodedQuery = encodeURIComponent(query);

    // LinkedIn public job search URL (no auth required)
    // geoId 102713980 = India
    const pages = [0, 25]; // First two pages

    for (const start of pages) {
      try {
        const url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search`;
        const params: Record<string, string> = {
          keywords: query,
          location: 'India',
          geoId: '102713980',
          f_TPR: 'r604800', // Past week
          start: String(start),
        };

        this.log.info(
          `Fetching LinkedIn jobs: "${query}" (offset ${start})`,
        );

        const response = await this.get<string>(url, {
          params,
          headers: this.getStealthHeaders({
            Referer: `https://www.linkedin.com/jobs/search/?keywords=${encodedQuery}&location=India`,
          }),
        });

        if (response.status === 429) {
          this.log.warn('LinkedIn rate limited – backing off');
          await humanSleep(30000, 60000);
          continue;
        }

        if (response.status !== 200) {
          this.log.warn(`LinkedIn returned status ${response.status}`);
          continue;
        }

        const html = typeof response.data === 'string' ? response.data : '';
        const pageJobs = this.parseJobCards(html);
        jobs.push(...pageJobs);

        this.log.info(
          `Parsed ${pageJobs.length} jobs from LinkedIn (offset ${start})`,
        );

        await humanSleep(3000, 7000);
      } catch (err) {
        this.log.warn(
          `Failed to fetch LinkedIn page (offset ${start}): ${(err as Error).message}`,
        );
      }
    }

    return jobs;
  }

  private parseJobCards(html: string): ScrapedJob[] {
    const jobs: ScrapedJob[] = [];
    const $ = cheerio.load(html);

    // LinkedIn guest job cards
    $(
      '.base-card, .job-search-card, li, [class*="base-card"]',
    ).each((_, el) => {
      try {
        const $el = $(el);

        const title = $el
          .find(
            '.base-search-card__title, .base-card__full-link, h3.base-search-card__title, [class*="base-search-card__title"]',
          )
          .first()
          .text()
          .trim();

        const company = $el
          .find(
            '.base-search-card__subtitle, h4.base-search-card__subtitle, [class*="base-search-card__subtitle"]',
          )
          .first()
          .text()
          .trim();

        const location = $el
          .find(
            '.job-search-card__location, .base-search-card__metadata, [class*="job-search-card__location"]',
          )
          .first()
          .text()
          .trim();

        const link =
          $el.find('a.base-card__full-link, a[class*="base-card__full-link"]').first().attr('href') ||
          $el.find('a[href*="linkedin.com/jobs"]').first().attr('href') ||
          '';

        const dateText = $el
          .find('time, [class*="listed-date"]')
          .first()
          .attr('datetime') || '';

        if (title && link) {
          // Clean the URL (remove tracking params)
          const cleanUrl = link.split('?')[0].trim();
          const jobUrl = cleanUrl.startsWith('http')
            ? cleanUrl
            : `https://www.linkedin.com${cleanUrl}`;

          jobs.push(
            this.createJob({
              title,
              company: company || 'Unknown',
              location: location || 'India',
              description: '', // Would need individual page fetch
              url: jobUrl,
              postedAt: dateText ? new Date(dateText).toISOString() : null,
              tags: extractTags(title),
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
