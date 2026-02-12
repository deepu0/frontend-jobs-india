/**
 * Lever scraper – uses the public JSON API:
 * https://api.lever.co/v0/postings/{company}?mode=json
 */

import { BaseScraper } from '../base-scraper';
import { JobSource, ScrapedJob } from '../types';
import { LEVER_COMPANIES } from '../config';
import { createSourceLogger } from '../utils/logger';
import { humanSleep } from '../utils/stealth';
import { extractTags } from '../utils/filters';

interface LeverPosting {
  id: string;
  text: string;
  categories: {
    commitment?: string;
    department?: string;
    location?: string;
    team?: string;
  };
  description: string;
  descriptionPlain: string;
  lists: Array<{ text: string; content: string }>;
  additional: string;
  additionalPlain: string;
  hostedUrl: string;
  applyUrl: string;
  createdAt: number;
  workplaceType?: string;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
    interval: string;
  };
}

export class LeverScraper extends BaseScraper {
  readonly name: JobSource = 'lever';
  protected log = createSourceLogger('lever');

  protected async fetchJobs(): Promise<ScrapedJob[]> {
    const allJobs: ScrapedJob[] = [];

    for (const company of LEVER_COMPANIES) {
      try {
        this.log.info(`Fetching jobs from Lever for ${company.name} (${company.slug})`);
        const url = `https://api.lever.co/v0/postings/${company.slug}?mode=json`;

        const response = await this.get<LeverPosting[]>(url, {
          headers: this.getApiHeaders(),
        });

        if (response.status === 404) {
          this.log.warn(`No Lever board found for ${company.slug}`);
          continue;
        }

        if (!Array.isArray(response.data)) {
          this.log.warn(`Unexpected response format for ${company.slug}`);
          continue;
        }

        const postings = response.data;
        this.log.info(`Found ${postings.length} postings for ${company.name}`);

        for (const posting of postings) {
          const job = this.mapPosting(posting, company.name);
          allJobs.push(job);
        }

        // Humanized delay between companies
        await humanSleep(800, 2000);
      } catch (err) {
        this.log.error(
          `Failed to fetch Lever jobs for ${company.name}: ${(err as Error).message}`,
        );
        this.addError(
          `Failed to fetch ${company.name}: ${(err as Error).message}`,
          `https://api.lever.co/v0/postings/${company.slug}`,
        );
      }
    }

    return allJobs;
  }

  private mapPosting(posting: LeverPosting, companyName: string): ScrapedJob {
    const location = posting.categories?.location ?? '';
    const fullDescription = [
      posting.description,
      ...posting.lists.map((l) => `<h3>${l.text}</h3>${l.content}`),
      posting.additional,
    ]
      .filter(Boolean)
      .join('\n');

    const salary = posting.salaryRange
      ? `${posting.salaryRange.currency} ${posting.salaryRange.min.toLocaleString()}-${posting.salaryRange.max.toLocaleString()} ${posting.salaryRange.interval}`
      : null;

    return this.createJob({
      title: posting.text,
      company: companyName,
      location,
      description: fullDescription,
      url: posting.hostedUrl,
      salary,
      postedAt: posting.createdAt
        ? new Date(posting.createdAt).toISOString()
        : null,
      tags: extractTags(fullDescription),
    });
  }
}
