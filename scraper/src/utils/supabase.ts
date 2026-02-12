/**
 * Supabase client and upsert logic for storing scraped jobs.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ScrapedJob } from '../types';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '../config';
import { logger } from './logger';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error(
        'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables',
      );
    }
    client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
    logger.info('Supabase client initialized');
  }
  return client;
}

/**
 * Upsert a batch of jobs into the `scraped_jobs` table.
 * Uses the `url` column as the conflict target to avoid duplicates.
 * Falls back to company+title if url is not unique enough.
 */
export async function upsertJobs(jobs: ScrapedJob[]): Promise<number> {
  if (jobs.length === 0) return 0;

  const supabase = getSupabaseClient();
  let savedCount = 0;

  // Process in batches of 50 to avoid payload limits
  const batchSize = 50;
  for (let i = 0; i < jobs.length; i += batchSize) {
    const batch = jobs.slice(i, i + batchSize);

    const rows = batch.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      url: job.url,
      salary: job.salary,
      source: job.source,
      posted_at: job.postedAt,
      scraped_at: job.scrapedAt,
      tags: job.tags,
      job_type: job.jobType,
      experience_level: job.experienceLevel,
    }));

    const { data, error } = await supabase
      .from('scraped_jobs')
      .upsert(rows, {
        onConflict: 'url',
        ignoreDuplicates: false,
      })
      .select('id');

    if (error) {
      logger.error(`Supabase upsert error: ${error.message}`, {
        code: error.code,
        details: error.details,
      });
      // Try individual inserts as fallback
      for (const row of rows) {
        const { error: singleError } = await supabase
          .from('scraped_jobs')
          .upsert(row, { onConflict: 'url', ignoreDuplicates: false });
        if (!singleError) {
          savedCount++;
        } else {
          logger.warn(`Failed to upsert job: ${row.title} at ${row.company}`, {
            error: singleError.message,
          });
        }
      }
    } else {
      savedCount += data?.length ?? batch.length;
    }
  }

  logger.info(`Upserted ${savedCount}/${jobs.length} jobs to Supabase`);
  return savedCount;
}

/**
 * Check if a job URL already exists in the database.
 */
export async function jobExists(url: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('scraped_jobs')
    .select('id')
    .eq('url', url)
    .limit(1);

  if (error) {
    logger.warn(`Error checking job existence: ${error.message}`);
    return false;
  }
  return (data?.length ?? 0) > 0;
}
