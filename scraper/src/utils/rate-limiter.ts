/**
 * Per-domain rate limiter with configurable concurrency and delays.
 * Uses p-queue for concurrency control and adds humanized delays.
 */

import PQueue from 'p-queue';
import { humanSleep } from './stealth';
import { logger } from './logger';
import { MIN_REQUEST_DELAY, MAX_REQUEST_DELAY, MAX_CONCURRENT_PER_DOMAIN } from '../config';

interface DomainLimiter {
  queue: PQueue;
  lastRequestAt: number;
  requestCount: number;
}

const domainLimiters = new Map<string, DomainLimiter>();

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function getOrCreateLimiter(domain: string): DomainLimiter {
  let limiter = domainLimiters.get(domain);
  if (!limiter) {
    limiter = {
      queue: new PQueue({ concurrency: MAX_CONCURRENT_PER_DOMAIN }),
      lastRequestAt: 0,
      requestCount: 0,
    };
    domainLimiters.set(domain, limiter);
  }
  return limiter;
}

/**
 * Execute a function with per-domain rate limiting.
 * Ensures humanized delays between requests to the same domain.
 */
export async function rateLimitedRequest<T>(
  url: string,
  fn: () => Promise<T>,
): Promise<T> {
  const domain = extractDomain(url);
  const limiter = getOrCreateLimiter(domain);

  return limiter.queue.add(async () => {
    // Enforce minimum delay since last request to this domain
    const elapsed = Date.now() - limiter.lastRequestAt;
    const minDelay = MIN_REQUEST_DELAY;
    if (elapsed < minDelay && limiter.lastRequestAt > 0) {
      const waitTime = minDelay - elapsed;
      await humanSleep(waitTime, waitTime + 500);
    }

    // Add humanized jitter
    if (limiter.requestCount > 0) {
      await humanSleep(MIN_REQUEST_DELAY, MAX_REQUEST_DELAY);
    }

    limiter.lastRequestAt = Date.now();
    limiter.requestCount++;

    logger.debug(`Rate limiter: request #${limiter.requestCount} to ${domain}`);

    return fn();
  }) as Promise<T>;
}

/**
 * Get stats for all domain limiters.
 */
export function getRateLimiterStats(): Record<string, { pending: number; requestCount: number }> {
  const stats: Record<string, { pending: number; requestCount: number }> = {};
  for (const [domain, limiter] of domainLimiters) {
    stats[domain] = {
      pending: limiter.queue.pending,
      requestCount: limiter.requestCount,
    };
  }
  return stats;
}

/**
 * Clear all domain limiters (for shutdown).
 */
export function clearRateLimiters(): void {
  for (const [, limiter] of domainLimiters) {
    limiter.queue.clear();
  }
  domainLimiters.clear();
}
