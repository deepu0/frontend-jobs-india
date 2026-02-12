/**
 * Main entry point for the job scraper system.
 * Orchestrates all scrapers, handles CLI arguments, and manages graceful shutdown.
 */

import { IScraper, JobSource, ScraperResult } from './types';
import { ENABLED_SCRAPERS } from './config';
import { logger } from './utils/logger';
import { clearRateLimiters, getRateLimiterStats } from './utils/rate-limiter';
import { initProxyPool } from './utils/stealth';

// Import all scrapers
import { LeverScraper } from './scrapers/lever';
import { GreenhouseScraper } from './scrapers/greenhouse';
import { AshbyScraper } from './scrapers/ashby';
import { WellfoundScraper } from './scrapers/wellfound';
import { NaukriScraper } from './scrapers/naukri';
import { LinkedInScraper } from './scrapers/linkedin';
import { IndeedScraper } from './scrapers/indeed';

// ---------------------------------------------------------------------------
// Scraper registry
// ---------------------------------------------------------------------------

const SCRAPER_MAP: Record<JobSource, () => IScraper> = {
  lever: () => new LeverScraper(),
  greenhouse: () => new GreenhouseScraper(),
  ashby: () => new AshbyScraper(),
  wellfound: () => new WellfoundScraper(),
  naukri: () => new NaukriScraper(),
  linkedin: () => new LinkedInScraper(),
  indeed: () => new IndeedScraper(),
};

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(): { sources: JobSource[] | null } {
  const args = process.argv.slice(2);
  const sourceArg = args.find((a) => a.startsWith('--source='));

  if (sourceArg) {
    const source = sourceArg.split('=')[1] as JobSource;
    if (SCRAPER_MAP[source]) {
      return { sources: [source] };
    }
    logger.error(`Unknown source: ${source}`);
    logger.info(`Available sources: ${Object.keys(SCRAPER_MAP).join(', ')}`);
    process.exit(1);
  }

  return { sources: null }; // Run all enabled scrapers
}

// ---------------------------------------------------------------------------
// Main orchestrator
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const startTime = Date.now();
  logger.info('=== Frontend Jobs Scraper Starting ===');

  // Initialize proxy pool
  initProxyPool();

  const { sources } = parseArgs();
  const results: ScraperResult[] = [];
  const activeScrapers: IScraper[] = [];

  // Determine which scrapers to run
  const scraperSources: JobSource[] = sources ??
    (Object.entries(ENABLED_SCRAPERS)
      .filter(([, enabled]) => enabled)
      .map(([source]) => source) as JobSource[]);

  logger.info(`Running scrapers: ${scraperSources.join(', ')}`);

  // Graceful shutdown handler
  let shuttingDown = false;
  const shutdown = async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.warn(`Received ${signal} – shutting down gracefully...`);

    for (const scraper of activeScrapers) {
      try {
        await scraper.shutdown();
      } catch (err) {
        logger.error(`Error shutting down ${scraper.name}: ${(err as Error).message}`);
      }
    }

    clearRateLimiters();
    printSummary(results, Date.now() - startTime);
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Run scrapers sequentially to be respectful of resources
  for (const source of scraperSources) {
    if (shuttingDown) break;

    try {
      const scraper = SCRAPER_MAP[source]();
      activeScrapers.push(scraper);

      logger.info(`\n--- Running ${source} scraper ---`);
      const result = await scraper.scrape();
      results.push(result);

      logger.info(
        `${source}: ${result.totalFound} jobs found, ${result.totalSaved} saved, ` +
          `${result.errors.length} errors, ${(result.duration / 1000).toFixed(1)}s`,
      );
    } catch (err) {
      logger.error(`Fatal error in ${source} scraper: ${(err as Error).message}`);
      results.push({
        source,
        jobs: [],
        errors: [
          {
            source,
            message: (err as Error).message,
            timestamp: new Date().toISOString(),
            retryable: false,
          },
        ],
        duration: 0,
        totalFound: 0,
        totalSaved: 0,
      });
    }
  }

  // Print summary
  printSummary(results, Date.now() - startTime);

  // Print rate limiter stats
  const stats = getRateLimiterStats();
  if (Object.keys(stats).length > 0) {
    logger.info('\nRate limiter stats:');
    for (const [domain, stat] of Object.entries(stats)) {
      logger.info(`  ${domain}: ${stat.requestCount} requests`);
    }
  }

  clearRateLimiters();
}

function printSummary(results: ScraperResult[], totalDuration: number): void {
  logger.info('\n=== Scraper Summary ===');

  let totalFound = 0;
  let totalSaved = 0;
  let totalErrors = 0;

  for (const result of results) {
    totalFound += result.totalFound;
    totalSaved += result.totalSaved;
    totalErrors += result.errors.length;

    const status = result.errors.length > 0 ? '⚠️' : '✅';
    logger.info(
      `  ${status} ${result.source}: ${result.totalFound} found, ${result.totalSaved} saved, ` +
        `${result.errors.length} errors (${(result.duration / 1000).toFixed(1)}s)`,
    );
  }

  logger.info(`\nTotal: ${totalFound} jobs found, ${totalSaved} saved, ${totalErrors} errors`);
  logger.info(`Total duration: ${(totalDuration / 1000).toFixed(1)}s`);
  logger.info('=== Scraper Complete ===\n');
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

main().catch((err) => {
  logger.error(`Unhandled error: ${err.message}`);
  logger.error(err.stack);
  process.exit(1);
});
