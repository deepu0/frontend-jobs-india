/**
 * Base scraper class with stealth features, retry logic, session management,
 * and robots.txt compliance. All individual scrapers extend this class.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import robotsParser from 'robots-parser';
import { v4 as uuidv4 } from 'uuid';
import {
  IScraper,
  JobSource,
  ScrapedJob,
  ScraperError,
  ScraperResult,
} from './types';
import {
  MAX_RETRIES,
  MAX_REQUEST_DELAY,
  MIN_REQUEST_DELAY,
  SESSION_ROTATION_INTERVAL,
} from './config';
import {
  createProxyAgent,
  createSession,
  generateApiHeaders,
  generateStealthHeaders,
  humanSleep,
  initProxyPool,
  isSessionExpired,
  Session,
} from './utils/stealth';
import { rateLimitedRequest } from './utils/rate-limiter';
import { createSourceLogger } from './utils/logger';
import {
  cleanDescription,
  detectExperienceLevel,
  detectJobType,
  extractTags,
  isFrontendJob,
  isIndiaLocation,
  normalizeSalary,
} from './utils/filters';
import { upsertJobs } from './utils/supabase';

export abstract class BaseScraper implements IScraper {
  abstract readonly name: JobSource;

  protected log;
  protected session: Session;
  protected axiosInstance: AxiosInstance;
  protected errors: ScraperError[] = [];
  protected robotsCache = new Map<string, ReturnType<typeof robotsParser>>();
  private isShuttingDown = false;

  constructor() {
    initProxyPool();
    this.session = createSession();
    this.log = createSourceLogger('base');
    this.axiosInstance = this.createAxiosInstance();
  }

  // -------------------------------------------------------------------------
  // Abstract methods – each scraper must implement
  // -------------------------------------------------------------------------

  protected abstract fetchJobs(): Promise<ScrapedJob[]>;

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  async scrape(): Promise<ScraperResult> {
    this.log = createSourceLogger(this.name);
    this.log.info(`Starting ${this.name} scraper`);
    const start = Date.now();
    this.errors = [];

    let jobs: ScrapedJob[] = [];
    let totalSaved = 0;

    try {
      const rawJobs = await this.fetchJobs();
      this.log.info(`Fetched ${rawJobs.length} raw jobs from ${this.name}`);

      // Filter for India + frontend
      jobs = rawJobs.filter((job) => {
        const locationMatch = isIndiaLocation(job.location);
        const frontendMatch = isFrontendJob(job.title, job.description);
        return locationMatch && frontendMatch;
      });

      this.log.info(
        `Filtered to ${jobs.length} India frontend jobs (from ${rawJobs.length} total)`,
      );

      // Enrich jobs
      jobs = jobs.map((job) => this.enrichJob(job));

      // Save to Supabase
      try {
        totalSaved = await upsertJobs(jobs);
      } catch (err) {
        this.log.error(`Failed to save jobs to Supabase: ${(err as Error).message}`);
        this.addError('Failed to save jobs to Supabase', undefined, false);
      }
    } catch (err) {
      this.log.error(`Scraper ${this.name} failed: ${(err as Error).message}`);
      this.addError((err as Error).message, undefined, true);
    }

    const duration = Date.now() - start;
    this.log.info(
      `${this.name} scraper completed in ${(duration / 1000).toFixed(1)}s – ` +
        `${jobs.length} jobs found, ${totalSaved} saved`,
    );

    return {
      source: this.name,
      jobs,
      errors: this.errors,
      duration,
      totalFound: jobs.length,
      totalSaved,
    };
  }

  async shutdown(): Promise<void> {
    this.isShuttingDown = true;
    this.log.info(`Shutting down ${this.name} scraper`);
  }

  // -------------------------------------------------------------------------
  // HTTP helpers with stealth, retry, and rate limiting
  // -------------------------------------------------------------------------

  protected async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.requestWithRetry<T>('GET', url, config);
  }

  protected async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.requestWithRetry<T>('POST', url, { ...config, data });
  }

  private async requestWithRetry<T>(
    method: string,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    if (this.isShuttingDown) {
      throw new Error('Scraper is shutting down');
    }

    // Rotate session if expired
    if (isSessionExpired(this.session, SESSION_ROTATION_INTERVAL)) {
      this.log.debug('Rotating session');
      this.session = createSession();
      this.axiosInstance = this.createAxiosInstance();
    }

    // Check robots.txt
    const allowed = await this.checkRobotsTxt(url);
    if (!allowed) {
      this.log.warn(`Blocked by robots.txt: ${url}`);
      throw new Error(`Blocked by robots.txt: ${url}`);
    }

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await rateLimitedRequest(url, () =>
          this.axiosInstance.request<T>({
            method,
            url,
            ...config,
            headers: {
              ...this.session.headers,
              ...config?.headers,
            },
          }),
        );
        return response;
      } catch (err) {
        lastError = err as Error;
        const status = (err as { response?: { status: number } }).response?.status;

        if (status === 404) {
          throw err; // Don't retry 404s
        }

        if (status === 429 || status === 503) {
          // Rate limited or service unavailable – longer backoff
          const backoff = Math.min(30000, 2000 * Math.pow(2, attempt));
          this.log.warn(
            `Rate limited (${status}) on attempt ${attempt}/${MAX_RETRIES} for ${url} – waiting ${backoff}ms`,
          );
          await humanSleep(backoff, backoff * 1.5);
        } else {
          // Exponential backoff with jitter
          const backoff = Math.min(15000, 1000 * Math.pow(2, attempt));
          this.log.warn(
            `Request failed (attempt ${attempt}/${MAX_RETRIES}) for ${url}: ${(err as Error).message}`,
          );
          await humanSleep(backoff * 0.5, backoff * 1.5);
        }

        // Rotate session on failure
        if (attempt >= 2) {
          this.session = createSession();
          this.axiosInstance = this.createAxiosInstance();
        }
      }
    }

    throw lastError ?? new Error(`Failed after ${MAX_RETRIES} retries: ${url}`);
  }

  // -------------------------------------------------------------------------
  // Robots.txt compliance
  // -------------------------------------------------------------------------

  private async checkRobotsTxt(url: string): Promise<boolean> {
    try {
      const parsed = new URL(url);
      const robotsUrl = `${parsed.protocol}//${parsed.host}/robots.txt`;

      if (!this.robotsCache.has(parsed.host)) {
        try {
          const response = await axios.get(robotsUrl, {
            timeout: 5000,
            headers: { 'User-Agent': this.session.headers['User-Agent'] },
          });
          const robots = robotsParser(robotsUrl, response.data);
          this.robotsCache.set(parsed.host, robots);
        } catch {
          // If we can't fetch robots.txt, assume allowed
          return true;
        }
      }

      const robots = this.robotsCache.get(parsed.host);
      if (!robots) return true;

      return robots.isAllowed(url, this.session.headers['User-Agent']) ?? true;
    } catch {
      return true;
    }
  }

  // -------------------------------------------------------------------------
  // Axios instance creation
  // -------------------------------------------------------------------------

  private createAxiosInstance(): AxiosInstance {
    const config: AxiosRequestConfig = {
      timeout: 30000,
      maxRedirects: 5,
      validateStatus: (status) => status < 500,
    };

    if (this.session.proxy) {
      const agent = createProxyAgent(this.session.proxy);
      config.httpAgent = agent;
      config.httpsAgent = agent;
    }

    return axios.create(config);
  }

  // -------------------------------------------------------------------------
  // Job enrichment
  // -------------------------------------------------------------------------

  protected enrichJob(job: ScrapedJob): ScrapedJob {
    return {
      ...job,
      id: job.id || uuidv4(),
      description: cleanDescription(job.description),
      tags: job.tags.length > 0 ? job.tags : extractTags(job.description),
      experienceLevel:
        job.experienceLevel ?? detectExperienceLevel(job.title, job.description),
      jobType: job.jobType ?? detectJobType(job.title, job.description),
      salary: normalizeSalary(job.salary),
      scrapedAt: job.scrapedAt || new Date().toISOString(),
    };
  }

  // -------------------------------------------------------------------------
  // Job creation helper
  // -------------------------------------------------------------------------

  protected createJob(partial: Partial<ScrapedJob> & { title: string; company: string; url: string }): ScrapedJob {
    return {
      id: uuidv4(),
      title: partial.title,
      company: partial.company,
      location: partial.location ?? '',
      description: partial.description ?? '',
      url: partial.url,
      salary: partial.salary ?? null,
      source: this.name,
      postedAt: partial.postedAt ?? null,
      scrapedAt: new Date().toISOString(),
      tags: partial.tags ?? [],
      jobType: partial.jobType ?? null,
      experienceLevel: partial.experienceLevel ?? null,
    };
  }

  // -------------------------------------------------------------------------
  // Error tracking
  // -------------------------------------------------------------------------

  protected addError(message: string, url?: string, retryable = true): void {
    this.errors.push({
      source: this.name,
      message,
      url,
      timestamp: new Date().toISOString(),
      retryable,
    });
  }

  // -------------------------------------------------------------------------
  // API-specific headers (for Lever, Greenhouse, Ashby JSON APIs)
  // -------------------------------------------------------------------------

  protected getApiHeaders(): Record<string, string> {
    return generateApiHeaders();
  }

  protected getStealthHeaders(extra?: Record<string, string>): Record<string, string> {
    return generateStealthHeaders(extra) as unknown as Record<string, string>;
  }
}
