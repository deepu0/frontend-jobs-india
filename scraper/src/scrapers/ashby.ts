/**
 * Ashby scraper – uses the public API endpoint:
 * POST https://jobs.ashbyhq.com/api/non-user-graphql
 * with a specific operation to list job postings.
 */

import { BaseScraper } from '../base-scraper';
import { JobSource, ScrapedJob } from '../types';
import { ASHBY_COMPANIES } from '../config';
import { createSourceLogger } from '../utils/logger';
import { humanSleep } from '../utils/stealth';
import { extractTags } from '../utils/filters';

interface AshbyJobPosting {
  id: string;
  title: string;
  departmentName: string;
  locationName: string;
  employmentType: string;
  publishedDate: string;
  descriptionHtml: string;
  descriptionPlain: string;
  compensationTierSummary: string | null;
  jobUrl: string;
  isRemote: boolean;
  secondaryLocations: Array<{ locationName: string }>;
}

interface AshbyApiResponse {
  data: {
    jobBoard: {
      jobPostings: AshbyJobPosting[];
    };
  };
}

export class AshbyScraper extends BaseScraper {
  readonly name: JobSource = 'ashby';
  protected log = createSourceLogger('ashby');

  protected async fetchJobs(): Promise<ScrapedJob[]> {
    const allJobs: ScrapedJob[] = [];

    for (const company of ASHBY_COMPANIES) {
      try {
        this.log.info(
          `Fetching jobs from Ashby for ${company.name} (${company.slug})`,
        );

        const url = 'https://jobs.ashbyhq.com/api/non-user-graphql';
        const query = {
          operationName: 'ApiJobBoardWithTeams',
          variables: {
            organizationHostedJobsPageName: company.slug,
          },
          query: `query ApiJobBoardWithTeams($organizationHostedJobsPageName: String!) {
            jobBoard: jobBoardWithTeams(
              organizationHostedJobsPageName: $organizationHostedJobsPageName
            ) {
              jobPostings {
                id
                title
                departmentName
                locationName
                employmentType
                publishedDate
                descriptionHtml
                descriptionPlain
                compensationTierSummary
                jobUrl
                isRemote
                secondaryLocations {
                  locationName
                }
              }
            }
          }`,
        };

        const response = await this.post<AshbyApiResponse>(url, query, {
          headers: {
            ...this.getApiHeaders(),
            'Content-Type': 'application/json',
          },
        });

        const postings = response.data?.data?.jobBoard?.jobPostings;
        if (!Array.isArray(postings)) {
          this.log.warn(`No postings found for ${company.slug}`);
          continue;
        }

        this.log.info(`Found ${postings.length} postings for ${company.name}`);

        for (const posting of postings) {
          const job = this.mapPosting(posting, company.name);
          allJobs.push(job);
        }

        await humanSleep(1000, 2500);
      } catch (err) {
        this.log.error(
          `Failed to fetch Ashby jobs for ${company.name}: ${(err as Error).message}`,
        );
        this.addError(
          `Failed to fetch ${company.name}: ${(err as Error).message}`,
          `https://jobs.ashbyhq.com/${company.slug}`,
        );
      }
    }

    return allJobs;
  }

  private mapPosting(posting: AshbyJobPosting, companyName: string): ScrapedJob {
    const locations = [
      posting.locationName,
      ...posting.secondaryLocations.map((l) => l.locationName),
    ]
      .filter(Boolean)
      .join(', ');

    const location = posting.isRemote ? `Remote, ${locations}` : locations;
    const description = posting.descriptionHtml || posting.descriptionPlain || '';

    return this.createJob({
      title: posting.title,
      company: companyName,
      location,
      description,
      url: posting.jobUrl || `https://jobs.ashbyhq.com/${companyName}/${posting.id}`,
      salary: posting.compensationTierSummary,
      postedAt: posting.publishedDate
        ? new Date(posting.publishedDate).toISOString()
        : null,
      tags: extractTags(description),
    });
  }
}
