/**
 * Greenhouse scraper – uses the public JSON API:
 * https://boards-api.greenhouse.io/v1/boards/{company}/jobs
 */

import { BaseScraper } from '../base-scraper';
import { JobSource, ScrapedJob } from '../types';
import { GREENHOUSE_COMPANIES } from '../config';
import { createSourceLogger } from '../utils/logger';
import { humanSleep } from '../utils/stealth';
import { extractTags } from '../utils/filters';

interface GreenhouseJob {
  id: number;
  internal_job_id: number;
  title: string;
  updated_at: string;
  requisition_id: string | null;
  location: {
    name: string;
  };
  absolute_url: string;
  metadata: Array<{ id: number; name: string; value: unknown; value_type: string }>;
  departments: Array<{ id: number; name: string }>;
  offices: Array<{ id: number; name: string; location: string }>;
}

interface GreenhouseJobDetail extends GreenhouseJob {
  content: string;
}

interface GreenhouseListResponse {
  jobs: GreenhouseJob[];
  meta: { total: number };
}

export class GreenhouseScraper extends BaseScraper {
  readonly name: JobSource = 'greenhouse';
  protected log = createSourceLogger('greenhouse');

  protected async fetchJobs(): Promise<ScrapedJob[]> {
    const allJobs: ScrapedJob[] = [];

    for (const company of GREENHOUSE_COMPANIES) {
      try {
        this.log.info(
          `Fetching jobs from Greenhouse for ${company.name} (${company.slug})`,
        );
        const listUrl = `https://boards-api.greenhouse.io/v1/boards/${company.slug}/jobs`;

        const response = await this.get<GreenhouseListResponse>(listUrl, {
          headers: this.getApiHeaders(),
          params: { content: 'true' },
        });

        if (response.status === 404) {
          this.log.warn(`No Greenhouse board found for ${company.slug}`);
          continue;
        }

        const jobs = response.data?.jobs;
        if (!Array.isArray(jobs)) {
          this.log.warn(`Unexpected response format for ${company.slug}`);
          continue;
        }

        this.log.info(`Found ${jobs.length} postings for ${company.name}`);

        // Fetch details for each job (the list endpoint with content=true
        // already includes the description, but we can also fetch individually)
        for (const ghJob of jobs) {
          try {
            // If content is already included, use it directly
            const detail = ghJob as unknown as GreenhouseJobDetail;
            const job = this.mapJob(detail, company.name);
            allJobs.push(job);
          } catch (err) {
            this.log.warn(
              `Failed to map Greenhouse job ${ghJob.id}: ${(err as Error).message}`,
            );
          }
        }

        await humanSleep(800, 2000);
      } catch (err) {
        this.log.error(
          `Failed to fetch Greenhouse jobs for ${company.name}: ${(err as Error).message}`,
        );
        this.addError(
          `Failed to fetch ${company.name}: ${(err as Error).message}`,
          `https://boards-api.greenhouse.io/v1/boards/${company.slug}/jobs`,
        );
      }
    }

    return allJobs;
  }

  private mapJob(job: GreenhouseJobDetail, companyName: string): ScrapedJob {
    const location = job.location?.name ?? '';
    const description = job.content ?? '';

    // Try to extract salary from metadata
    let salary: string | null = null;
    if (job.metadata) {
      const salaryMeta = job.metadata.find(
        (m) =>
          m.name.toLowerCase().includes('salary') ||
          m.name.toLowerCase().includes('compensation'),
      );
      if (salaryMeta && salaryMeta.value) {
        salary = String(salaryMeta.value);
      }
    }

    return this.createJob({
      title: job.title,
      company: companyName,
      location,
      description,
      url: job.absolute_url,
      salary,
      postedAt: job.updated_at ? new Date(job.updated_at).toISOString() : null,
      tags: extractTags(description),
    });
  }
}
