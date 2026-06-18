/**
 * Stealth utilities for anti-detection: user-agent rotation, header generation,
 * proxy management, and humanized delays.
 */

import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { ProxyConfig, StealthHeaders } from '../types';
import { parseProxies } from '../config';
import { logger } from './logger';

// ---------------------------------------------------------------------------
// User-Agent Pool – real browser strings (Chrome, Firefox, Safari, Edge)
// ---------------------------------------------------------------------------

const USER_AGENTS: string[] = [
  // Chrome on Windows
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
  // Chrome on macOS
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  // Chrome on Linux
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  // Firefox on Windows
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0',
  // Firefox on macOS
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:132.0) Gecko/20100101 Firefox/132.0',
  // Firefox on Linux
  'Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0',
  'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0',
  // Safari on macOS
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Safari/605.1.15',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15',
  // Edge on Windows
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
  // Edge on macOS
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
  // Chrome on Android
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  // Safari on iOS
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1',
];

const ACCEPT_LANGUAGES: string[] = [
  'en-US,en;q=0.9',
  'en-GB,en;q=0.9',
  'en-US,en;q=0.9,hi;q=0.8',
  'en-IN,en;q=0.9,hi;q=0.8',
  'en-US,en;q=0.8',
  'en;q=0.9',
  'en-US,en;q=0.9,en-GB;q=0.8',
];

const REFERERS: string[] = [
  'https://www.google.com/',
  'https://www.google.co.in/',
  'https://www.bing.com/',
  'https://duckduckgo.com/',
  'https://search.yahoo.com/',
  '',
];

const SEC_CH_UA_VALUES: string[] = [
  '"Chromium";v="131", "Not_A Brand";v="24", "Google Chrome";v="131"',
  '"Chromium";v="130", "Not_A Brand";v="24", "Google Chrome";v="130"',
  '"Chromium";v="129", "Not_A Brand";v="24", "Google Chrome";v="129"',
  '"Not_A Brand";v="8", "Chromium";v="131", "Microsoft Edge";v="131"',
];

// ---------------------------------------------------------------------------
// Random helpers
// ---------------------------------------------------------------------------

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate a humanized delay with jitter.
 * Uses a truncated normal-ish distribution rather than uniform.
 */
export function humanDelay(minMs: number, maxMs: number): number {
  // Box-Muller-ish approach for a bell-curve centered between min and max
  const mean = (minMs + maxMs) / 2;
  const stddev = (maxMs - minMs) / 6; // ~99.7% within range
  let delay: number;
  do {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    delay = mean + z * stddev;
  } while (delay < minMs || delay > maxMs);
  return Math.round(delay);
}

/**
 * Sleep for a given number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Sleep with humanized jitter between min and max ms.
 */
export async function humanSleep(minMs: number, maxMs: number): Promise<void> {
  const delay = humanDelay(minMs, maxMs);
  logger.debug(`Sleeping for ${delay}ms`);
  await sleep(delay);
}

// ---------------------------------------------------------------------------
// Header generation
// ---------------------------------------------------------------------------

/**
 * Generate a full set of stealth headers that mimic a real browser.
 */
export function generateStealthHeaders(extraHeaders?: Record<string, string>): StealthHeaders {
  const ua = randomItem(USER_AGENTS);
  const isChrome = ua.includes('Chrome') && !ua.includes('Edg');
  const isFirefox = ua.includes('Firefox');
  const referer = randomItem(REFERERS);

  const headers: StealthHeaders = {
    'User-Agent': ua,
    Accept: isFirefox
      ? 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': randomItem(ACCEPT_LANGUAGES),
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
  };

  if (referer) {
    headers.Referer = referer;
  }

  if (isChrome || ua.includes('Edg')) {
    headers['Cache-Control'] = 'max-age=0';
    headers['Sec-Fetch-Dest'] = 'document';
    headers['Sec-Fetch-Mode'] = 'navigate';
    headers['Sec-Fetch-Site'] = referer ? 'cross-site' : 'none';
    headers['Sec-CH-UA'] = randomItem(SEC_CH_UA_VALUES);
    headers['Sec-CH-UA-Mobile'] = ua.includes('Mobile') ? '?1' : '?0';
    headers['Sec-CH-UA-Platform'] = ua.includes('Windows')
      ? '"Windows"'
      : ua.includes('Macintosh')
        ? '"macOS"'
        : ua.includes('Linux')
          ? '"Linux"'
          : '"Unknown"';
  }

  if (extraHeaders) {
    Object.assign(headers, extraHeaders);
  }

  return headers;
}

/**
 * Generate headers suitable for JSON API requests.
 */
export function generateApiHeaders(): Record<string, string> {
  return {
    'User-Agent': randomItem(USER_AGENTS),
    Accept: 'application/json',
    'Accept-Language': randomItem(ACCEPT_LANGUAGES),
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
  };
}

// ---------------------------------------------------------------------------
// Proxy management
// ---------------------------------------------------------------------------

let proxyPool: ProxyConfig[] = [];
let proxyIndex = 0;

export function initProxyPool(): void {
  proxyPool = parseProxies();
  if (proxyPool.length > 0) {
    logger.info(`Initialized proxy pool with ${proxyPool.length} proxies`);
  } else {
    logger.info('No proxies configured – using direct connections');
  }
}

export function getNextProxy(): ProxyConfig | null {
  if (proxyPool.length === 0) return null;
  const proxy = proxyPool[proxyIndex % proxyPool.length];
  proxyIndex++;
  return proxy;
}

export function createProxyAgent(proxy: ProxyConfig): HttpsProxyAgent<string> | SocksProxyAgent {
  const auth = proxy.auth ? `${proxy.auth.username}:${proxy.auth.password}@` : '';
  const uri = `${proxy.protocol}://${auth}${proxy.host}:${proxy.port}`;

  if (proxy.protocol === 'socks5') {
    return new SocksProxyAgent(uri);
  }
  return new HttpsProxyAgent(uri);
}

// ---------------------------------------------------------------------------
// Session management
// ---------------------------------------------------------------------------

interface Session {
  id: number;
  userAgent: string;
  headers: StealthHeaders;
  proxy: ProxyConfig | null;
  createdAt: number;
}

let sessionCounter = 0;

export function createSession(): Session {
  const proxy = getNextProxy();
  const headers = generateStealthHeaders();
  sessionCounter++;
  const session: Session = {
    id: sessionCounter,
    userAgent: headers['User-Agent'],
    headers,
    proxy,
    createdAt: Date.now(),
  };
  logger.debug(`Created session #${session.id}`);
  return session;
}

export function isSessionExpired(session: Session, rotationMinutes: number): boolean {
  const elapsed = (Date.now() - session.createdAt) / 1000 / 60;
  return elapsed >= rotationMinutes;
}

export type { Session };
