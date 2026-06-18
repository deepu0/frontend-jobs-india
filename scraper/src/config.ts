import dotenv from 'dotenv';
import path from 'path';
import { CompanyConfig, ProxyConfig } from './types';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// ---------------------------------------------------------------------------
// Environment helpers
// ---------------------------------------------------------------------------

const env = (key: string, fallback = ''): string =>
  process.env[key] ?? fallback;

const envBool = (key: string, fallback = true): boolean => {
  const v = process.env[key];
  if (v === undefined) return fallback;
  return v.toLowerCase() === 'true';
};

const envInt = (key: string, fallback: number): number => {
  const v = process.env[key];
  if (v === undefined) return fallback;
  const n = parseInt(v, 10);
  return isNaN(n) ? fallback : n;
};

// ---------------------------------------------------------------------------
// Supabase
// ---------------------------------------------------------------------------

export const SUPABASE_URL = env('SUPABASE_URL', env('NEXT_PUBLIC_SUPABASE_URL'));
export const SUPABASE_SERVICE_ROLE_KEY = env(
  'SUPABASE_SERVICE_ROLE_KEY',
  env('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
);

// ---------------------------------------------------------------------------
// Scraper settings
// ---------------------------------------------------------------------------

export const MAX_CONCURRENT_PER_DOMAIN = envInt('MAX_CONCURRENT_PER_DOMAIN', 2);
export const MIN_REQUEST_DELAY = envInt('MIN_REQUEST_DELAY', 1500);
export const MAX_REQUEST_DELAY = envInt('MAX_REQUEST_DELAY', 4500);
export const MAX_RETRIES = envInt('MAX_RETRIES', 3);
export const SESSION_ROTATION_INTERVAL = envInt('SESSION_ROTATION_INTERVAL', 15);
export const LOG_LEVEL = env('LOG_LEVEL', 'info');

export const ENABLED_SCRAPERS = {
  lever: envBool('ENABLE_LEVER'),
  greenhouse: envBool('ENABLE_GREENHOUSE'),
  ashby: envBool('ENABLE_ASHBY'),
  wellfound: envBool('ENABLE_WELLFOUND'),
  naukri: envBool('ENABLE_NAUKRI'),
  linkedin: envBool('ENABLE_LINKEDIN'),
  indeed: envBool('ENABLE_INDEED'),
};

// ---------------------------------------------------------------------------
// Proxy list
// ---------------------------------------------------------------------------

export function parseProxies(): ProxyConfig[] {
  const raw = env('PROXY_LIST');
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((uri) => {
      const url = new URL(uri);
      const protocol = url.protocol.replace(':', '') as ProxyConfig['protocol'];
      return {
        protocol,
        host: url.hostname,
        port: parseInt(url.port, 10),
        ...(url.username
          ? { auth: { username: decodeURIComponent(url.username), password: decodeURIComponent(url.password) } }
          : {}),
      };
    });
}

// ---------------------------------------------------------------------------
// Frontend keywords for filtering
// ---------------------------------------------------------------------------

export const FRONTEND_KEYWORDS: string[] = [
  'react',
  'react.js',
  'reactjs',
  'next.js',
  'nextjs',
  'vue',
  'vue.js',
  'vuejs',
  'nuxt',
  'angular',
  'svelte',
  'sveltekit',
  'typescript',
  'javascript',
  'frontend',
  'front-end',
  'front end',
  'ui engineer',
  'ui developer',
  'ui/ux',
  'web developer',
  'web engineer',
  'html',
  'css',
  'tailwind',
  'sass',
  'webpack',
  'vite',
  'remix',
  'gatsby',
  'storybook',
  'design system',
  'component library',
  'accessibility',
  'a11y',
  'responsive',
  'progressive web',
  'pwa',
  'single page',
  'spa',
  'redux',
  'zustand',
  'mobx',
  'graphql',
  'apollo',
  'relay',
];

// ---------------------------------------------------------------------------
// Location filters for India
// ---------------------------------------------------------------------------

export const INDIA_LOCATIONS: string[] = [
  'india',
  'bangalore',
  'bengaluru',
  'mumbai',
  'delhi',
  'new delhi',
  'ncr',
  'gurgaon',
  'gurugram',
  'noida',
  'hyderabad',
  'pune',
  'chennai',
  'kolkata',
  'ahmedabad',
  'jaipur',
  'thiruvananthapuram',
  'kochi',
  'coimbatore',
  'indore',
  'remote',
  'remote - india',
  'india remote',
  'apac',
  'asia pacific',
];

// ---------------------------------------------------------------------------
// Skill tags to extract from descriptions
// ---------------------------------------------------------------------------

export const SKILL_TAGS: string[] = [
  'React',
  'Next.js',
  'Vue',
  'Angular',
  'Svelte',
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
  'Tailwind',
  'SASS',
  'LESS',
  'Webpack',
  'Vite',
  'Rollup',
  'Babel',
  'ESLint',
  'Jest',
  'Cypress',
  'Playwright',
  'Testing Library',
  'Storybook',
  'Figma',
  'Redux',
  'Zustand',
  'MobX',
  'GraphQL',
  'REST',
  'Apollo',
  'Relay',
  'Node.js',
  'Express',
  'Prisma',
  'PostgreSQL',
  'MongoDB',
  'Firebase',
  'Supabase',
  'AWS',
  'GCP',
  'Azure',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'Git',
  'Agile',
  'Scrum',
  'Accessibility',
  'Performance',
  'SEO',
  'PWA',
  'WebSocket',
  'Three.js',
  'D3.js',
  'Framer Motion',
  'GSAP',
  'Remix',
  'Gatsby',
  'Astro',
  'Turborepo',
  'Monorepo',
  'Micro-frontend',
  'Design System',
  'Responsive Design',
  'Mobile-first',
  'Cross-browser',
  'Web Components',
  'Shadow DOM',
  'Service Worker',
  'IndexedDB',
  'WebAssembly',
];

// ---------------------------------------------------------------------------
// Companies using Lever
// ---------------------------------------------------------------------------

export const LEVER_COMPANIES: CompanyConfig[] = [
  { slug: 'stripe', name: 'Stripe', ats: 'lever' },
  { slug: 'figma', name: 'Figma', ats: 'lever' },
  { slug: 'notion', name: 'Notion', ats: 'lever' },
  { slug: 'netlify', name: 'Netlify', ats: 'lever' },
  { slug: 'vercel', name: 'Vercel', ats: 'lever' },
  { slug: 'postman', name: 'Postman', ats: 'lever' },
  { slug: 'razorpay', name: 'Razorpay', ats: 'lever' },
  { slug: 'gojek', name: 'Gojek', ats: 'lever' },
  { slug: 'cred', name: 'CRED', ats: 'lever' },
  { slug: 'meesho', name: 'Meesho', ats: 'lever' },
  { slug: 'coinbase', name: 'Coinbase', ats: 'lever' },
  { slug: 'discord', name: 'Discord', ats: 'lever' },
  { slug: 'reddit', name: 'Reddit', ats: 'lever' },
  { slug: 'lucidchart', name: 'Lucid', ats: 'lever' },
  { slug: 'nerdwallet', name: 'NerdWallet', ats: 'lever' },
  { slug: 'benchling', name: 'Benchling', ats: 'lever' },
  { slug: 'faire', name: 'Faire', ats: 'lever' },
  { slug: 'ramp', name: 'Ramp', ats: 'lever' },
  { slug: 'brex', name: 'Brex', ats: 'lever' },
  { slug: 'plaid', name: 'Plaid', ats: 'lever' },
  { slug: 'airtable', name: 'Airtable', ats: 'lever' },
  { slug: 'webflow', name: 'Webflow', ats: 'lever' },
  { slug: 'linear', name: 'Linear', ats: 'lever' },
  { slug: 'loom', name: 'Loom', ats: 'lever' },
  { slug: 'miro', name: 'Miro', ats: 'lever' },
];

// ---------------------------------------------------------------------------
// Companies using Greenhouse
// ---------------------------------------------------------------------------

export const GREENHOUSE_COMPANIES: CompanyConfig[] = [
  { slug: 'airbnb', name: 'Airbnb', ats: 'greenhouse' },
  { slug: 'spotify', name: 'Spotify', ats: 'greenhouse' },
  { slug: 'datadog', name: 'Datadog', ats: 'greenhouse' },
  { slug: 'twilio', name: 'Twilio', ats: 'greenhouse' },
  { slug: 'hashicorp', name: 'HashiCorp', ats: 'greenhouse' },
  { slug: 'elastic', name: 'Elastic', ats: 'greenhouse' },
  { slug: 'cloudflare', name: 'Cloudflare', ats: 'greenhouse' },
  { slug: 'mongodb', name: 'MongoDB', ats: 'greenhouse' },
  { slug: 'confluent', name: 'Confluent', ats: 'greenhouse' },
  { slug: 'cockroachlabs', name: 'Cockroach Labs', ats: 'greenhouse' },
  { slug: 'grafana', name: 'Grafana Labs', ats: 'greenhouse' },
  { slug: 'snyk', name: 'Snyk', ats: 'greenhouse' },
  { slug: 'sentry', name: 'Sentry', ats: 'greenhouse' },
  { slug: 'gitlab', name: 'GitLab', ats: 'greenhouse' },
  { slug: 'canva', name: 'Canva', ats: 'greenhouse' },
  { slug: 'freshworks', name: 'Freshworks', ats: 'greenhouse' },
  { slug: 'browserstack', name: 'BrowserStack', ats: 'greenhouse' },
  { slug: 'chargebee', name: 'Chargebee', ats: 'greenhouse' },
  { slug: 'hasura', name: 'Hasura', ats: 'greenhouse' },
  { slug: 'zomato', name: 'Zomato', ats: 'greenhouse' },
  { slug: 'swiggy', name: 'Swiggy', ats: 'greenhouse' },
  { slug: 'phonepe', name: 'PhonePe', ats: 'greenhouse' },
  { slug: 'curefit', name: 'Curefit', ats: 'greenhouse' },
  { slug: 'unacademy', name: 'Unacademy', ats: 'greenhouse' },
  { slug: 'groww', name: 'Groww', ats: 'greenhouse' },
];

// ---------------------------------------------------------------------------
// Companies using Ashby
// ---------------------------------------------------------------------------

export const ASHBY_COMPANIES: CompanyConfig[] = [
  { slug: 'linear', name: 'Linear', ats: 'ashby' },
  { slug: 'ramp', name: 'Ramp', ats: 'ashby' },
  { slug: 'notion', name: 'Notion', ats: 'ashby' },
  { slug: 'vercel', name: 'Vercel', ats: 'ashby' },
  { slug: 'resend', name: 'Resend', ats: 'ashby' },
  { slug: 'cal', name: 'Cal.com', ats: 'ashby' },
  { slug: 'dub', name: 'Dub', ats: 'ashby' },
  { slug: 'raycast', name: 'Raycast', ats: 'ashby' },
  { slug: 'supabase', name: 'Supabase', ats: 'ashby' },
  { slug: 'planetscale', name: 'PlanetScale', ats: 'ashby' },
];

// ---------------------------------------------------------------------------
// Naukri search queries
// ---------------------------------------------------------------------------

export const NAUKRI_SEARCH_QUERIES: string[] = [
  'react developer',
  'frontend developer',
  'front end engineer',
  'next.js developer',
  'vue developer',
  'angular developer',
  'ui developer',
  'ui engineer',
  'javascript developer',
  'typescript developer',
  'web developer frontend',
];

// ---------------------------------------------------------------------------
// LinkedIn / Indeed search queries
// ---------------------------------------------------------------------------

export const GENERAL_SEARCH_QUERIES: string[] = [
  'frontend developer india',
  'react developer india',
  'front end engineer india',
  'ui engineer india',
  'next.js developer india',
  'vue developer india',
  'angular developer india',
  'typescript developer india',
  'javascript developer india',
  'web developer frontend india',
];
