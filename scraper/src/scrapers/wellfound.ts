/**
 * Wellfound (formerly AngelList Talent) scraper.
 * Uses the public GraphQL API endpoint that powers the Wellfound job search.
 */

import * as cheerio from 'cheerio';
import { BaseScraper } from '../base-scraper';
import { JobSource, ScrapedJob } from '../types';
import { GENERAL_SEARCH_QUERIES } from '../config';
import { createSourceLogger } from '../utils/logger';
import { humanSleep } from '../utils/stealth';
import { extractTags } from '../utils/filters';

interface WellfoundJob {
  id: string;
  title: string;
  slug: string;
  description: string;
  remote: boolean;
  primaryRoleTitle: string;
  liveStartAt: number;
  locationNames: string[];
  compensation: string | null;
  startup: {
    name: string;
    companyUrl: string;
  };
}

interface WellfoundGraphQLResponse {
  data: {
    talent: {
      seoLandingPageJobSearchResults: {
        startupSearchResults: Array<{
          highlightedJobListings: Array<{
            jobListing: WellfoundJob;
          }>;
        }>;
      };
    };
  };
}

export class WellfoundScraper extends BaseScraper {
  readonly name: JobSource = 'wellfound';
  protected log = createSourceLogger('wellfound');

  protected async fetchJobs(): Promise<ScrapedJob[]> {
    const allJobs: ScrapedJob[] = [];
    const seenUrls = new Set<string>();

    // Strategy 1: Scrape the public job listing pages
    const searchUrls = [
      'https://wellfound.com/role/frontend-developer',
      'https://wellfound.com/role/frontend-engineer',
      'https://wellfound.com/role/react-developer',
      'https://wellfound.com/role/ui-engineer',
      'https://wellfound.com/role/javascript-developer',
    ];

    for (const searchUrl of searchUrls) {
      try {
        this.log.info(`Fetching Wellfound page: ${searchUrl}`);

        const response = await this.get<string>(searchUrl, {
          headers: this.getStealthHeaders({
            Referer: 'https://wellfound.com/',
          }),
        });

        if (response.status !== 200) {
          this.log.warn(`Wellfound returned status ${response.status} for ${searchUrl}`);
          continue;
        }

        const html = typeof response.data === 'string' ? response.data : '';
        const jobs = this.parseJobListings(html);

        for (const job of jobs) {
          if (!seenUrls.has(job.url)) {
            seenUrls.add(job.url);
            allJobs.push(job);
          }
        }

        this.log.info(`Parsed ${jobs.length} jobs from ${searchUrl}`);
        await humanSleep(2000, 4000);
      } catch (err) {
        this.log.error(
          `Failed to fetch Wellfound page ${searchUrl}: ${(err as Error).message}`,
        );
        this.addError(
          `Failed to fetch ${searchUrl}: ${(err as Error).message}`,
          searchUrl,
        );
      }
    }

    // Strategy 2: Try the GraphQL API
    try {
      const graphqlJobs = await this.fetchViaGraphQL();
      for (const job of graphqlJobs) {
        if (!seenUrls.has(job.url)) {
          seenUrls.add(job.url);
          allJobs.push(job);
        }
      }
    } catch (err) {
      this.log.warn(`GraphQL approach failed: ${(err as Error).message}`);
    }

    return allJobs;
  }

  private parseJobListings(html: string): ScrapedJob[] {
    const jobs: ScrapedJob[] = [];
    const $ = cheerio.load(html);

    // Wellfound renders job cards with specific data attributes
    // The structure may change, so we use multiple selectors
    const jobCards = $(
      '[data-test="StartupResult"], .styles_jobListing__*, .job-listing, [class*="JobListing"]',
    );

    jobCards.each((_, el) => {
      try {
        const $el = $(el);
        const title =
          $el.find('[data-test="JobListingTitle"], h2, [class*="title"]').first().text().trim() ||
          $el.find('a').first().text().trim();

        const company =
          $el.find('[data-test="StartupName"], h3, [class*="company"]').first().text().trim();

        const location =
          $el.find('[data-test="Location"], [class*="location"]').first().text().trim();

        const link = $el.find('a[href*="/jobs/"]').first().attr('href') ||
          $el.find('a').first().attr('href');

        const salary =
          $el.find('[data-test="Compensation"], [class*="compensation"], [class*="salary"]')
            .first()
            .text()
            .trim() || null;

        if (title && company && link) {
          const url = link.startsWith('http')
            ? link
            : `https://wellfound.com${link}`;

          jobs.push(
            this.createJob({
              title,
              company,
              location: location || 'Not specified',
              description: '',
              url,
              salary,
              tags: extractTags(title),
            }),
          );
        }
      } catch {
        // Skip malformed cards
      }
    });

    // Also try to extract from embedded JSON/script tags
    $('script[type="application/json"], script#__NEXT_DATA__').each((_, el) => {
      try {
        const jsonText = $(el).html();
        if (!jsonText) return;
        const data = JSON.parse(jsonText);
        this.extractJobsFromJson(data, jobs);
      } catch {
        // Ignore parse errors
      }
    });

    return jobs;
  }

  private extractJobsFromJson(data: unknown, jobs: ScrapedJob[]): void {
    if (!data || typeof data !== 'object') return;

    const traverse = (obj: unknown): void => {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) {
        obj.forEach(traverse);
        return;
      }

      const record = obj as Record<string, unknown>;

      // Look for job-like objects
      if (
        record.title &&
        typeof record.title === 'string' &&
        (record.slug || record.url || record.id) &&
        record.startup &&
        typeof record.startup === 'object'
      ) {
        const startup = record.startup as Record<string, unknown>;
        const url = record.slug
          ? `https://wellfound.com/jobs/${record.slug}`
          : (record.url as string) || '';

        if (url) {
          jobs.push(
            this.createJob({
              title: record.title as string,
              company: (startup.name as string) || 'Unknown',
              location: Array.isArray(record.locationNames)
                ? (record.locationNames as string[]).join(', ')
                : '',
              description: (record.description as string) || '',
              url,
              salary: (record.compensation as string) || null,
              tags: extractTags((record.description as string) || ''),
            }),
          );
        }
      }

      // Recurse into values
      Object.values(record).forEach(traverse);
    };

    traverse(data);
  }

  private async fetchViaGraphQL(): Promise<ScrapedJob[]> {
    const jobs: ScrapedJob[] = [];

    const query = `
      query SeoLandingPageSearchResults($query: String!, $page: Int!) {
        talent {
          seoLandingPageJobSearchResults(query: $query, page: $page) {
            startupSearchResults {
              highlightedJobListings {
                jobListing {
                  id
                  title
                  slug
                  description
                  remote
                  primaryRoleTitle
                  liveStartAt
                  locationNames
                  compensation
                  startup {
                    name
                    companyUrl
                  }
                }
              }
            }
          }
        }
      }
    `;

    const queries = ['frontend developer india', 'react developer india'];

    for (const searchQuery of queries) {
      try {
        const response = await this.post<WellfoundGraphQLResponse>(
          'https://wellfound.com/graphql',
          {
            query,
            variables: { query: searchQuery, page: 1 },
          },
          {
            headers: {
              ...this.getStealthHeaders(),
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
          },
        );

        const results =
          response.data?.data?.talent?.seoLandingPageJobSearchResults
            ?.startupSearchResults;

        if (Array.isArray(results)) {
          for (const result of results) {
            for (const { jobListing } of result.highlightedJobListings || []) {
              if (jobListing) {
                jobs.push(
                  this.createJob({
                    title: jobListing.title,
                    company: jobListing.startup?.name || 'Unknown',
                    location: jobListing.locationNames?.join(', ') || '',
                    description: jobListing.description || '',
                    url: jobListing.slug
                      ? `https://wellfound.com/jobs/${jobListing.slug}`
                      : '',
                    salary: jobListing.compensation,
                    postedAt: jobListing.liveStartAt
                      ? new Date(jobListing.liveStartAt * 1000).toISOString()
                      : null,
                    tags: extractTags(jobListing.description || ''),
                  }),
                );
              }
            }
          }
        }

        await humanSleep(2000, 4000);
      } catch (err) {
        this.log.warn(`Wellfound GraphQL query failed: ${(err as Error).message}`);
      }
    }

    return jobs;
  }
}
