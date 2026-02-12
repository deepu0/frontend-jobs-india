/**
 * Core type definitions for the job scraper system.
 */

export interface ScrapedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  salary: string | null;
  source: JobSource;
  postedAt: string | null;
  scrapedAt: string;
  tags: string[];
  jobType: JobType | null;
  experienceLevel: ExperienceLevel | null;
}

export type JobSource =
  | 'lever'
  | 'greenhouse'
  | 'ashby'
  | 'wellfound'
  | 'naukri'
  | 'linkedin'
  | 'indeed';

export type JobType =
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'internship'
  | 'freelance';

export type ExperienceLevel =
  | 'intern'
  | 'junior'
  | 'mid'
  | 'senior'
  | 'lead'
  | 'principal'
  | 'staff';

export interface ScraperConfig {
  name: JobSource;
  enabled: boolean;
  maxConcurrent: number;
  minDelay: number;
  maxDelay: number;
  maxRetries: number;
  sessionRotationInterval: number;
}

export interface ProxyConfig {
  protocol: 'http' | 'https' | 'socks5';
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
}

export interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  data?: unknown;
  params?: Record<string, string>;
  timeout?: number;
  proxy?: ProxyConfig;
}

export interface ScraperResult {
  source: JobSource;
  jobs: ScrapedJob[];
  errors: ScraperError[];
  duration: number;
  totalFound: number;
  totalSaved: number;
}

export interface ScraperError {
  source: JobSource;
  message: string;
  url?: string;
  timestamp: string;
  retryable: boolean;
}

export interface IScraper {
  readonly name: JobSource;
  scrape(): Promise<ScraperResult>;
  shutdown(): Promise<void>;
}

export interface CompanyConfig {
  slug: string;
  name: string;
  ats: 'lever' | 'greenhouse' | 'ashby';
}

export interface StealthHeaders {
  'User-Agent': string;
  Accept: string;
  'Accept-Language': string;
  'Accept-Encoding': string;
  Referer?: string;
  Connection: string;
  'Cache-Control'?: string;
  'Sec-Fetch-Dest'?: string;
  'Sec-Fetch-Mode'?: string;
  'Sec-Fetch-Site'?: string;
  'Sec-CH-UA'?: string;
  'Sec-CH-UA-Mobile'?: string;
  'Sec-CH-UA-Platform'?: string;
}
