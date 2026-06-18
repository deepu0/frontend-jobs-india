# Frontend Jobs Scraper

A production-ready, industry-grade job scraper for frontend developer positions in India. Scrapes multiple job boards and stores results in Supabase.

## Supported Job Boards

| Source | Method | Stealth Level |
|--------|--------|---------------|
| **Lever** | Public JSON API | Low (legitimate API) |
| **Greenhouse** | Public JSON API | Low (legitimate API) |
| **Ashby** | Public GraphQL API | Low (legitimate API) |
| **Wellfound** | HTML + GraphQL | Medium |
| **Naukri.com** | Internal API + HTML | High |
| **LinkedIn** | Public guest pages | High |
| **Indeed India** | HTML + embedded JSON | High |

## Architecture

```
scraper/
├── src/
│   ├── index.ts              # Main entry point & orchestrator
│   ├── types.ts              # TypeScript interfaces
│   ├── config.ts             # Configuration & environment
│   ├── base-scraper.ts       # Base class with stealth features
│   ├── scrapers/
│   │   ├── lever.ts          # Lever JSON API scraper
│   │   ├── greenhouse.ts     # Greenhouse JSON API scraper
│   │   ├── ashby.ts          # Ashby GraphQL API scraper
│   │   ├── wellfound.ts      # Wellfound scraper
│   │   ├── naukri.ts         # Naukri.com scraper
│   │   ├── linkedin.ts       # LinkedIn public listings scraper
│   │   └── indeed.ts         # Indeed India scraper
│   └── utils/
│       ├── stealth.ts        # UA rotation, headers, proxy, sessions
│       ├── rate-limiter.ts   # Per-domain rate limiting
│       ├── supabase.ts       # Supabase client & upsert logic
│       ├── filters.ts        # Location/keyword filters, tag extraction
│       └── logger.ts         # Winston logger configuration
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Setup

### 1. Install Dependencies

```bash
cd scraper
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Run Database Migration

Apply the migration in `supabase/migrations/20240101_create_scraped_jobs_table.sql` to create the `scraped_jobs` table.

### 4. Run the Scraper

```bash
# Run all scrapers
npm run scrape

# Run a specific scraper
npm run scrape:lever
npm run scrape:greenhouse
npm run scrape:ashby
npm run scrape:wellfound
npm run scrape:naukri
npm run scrape:linkedin
npm run scrape:indeed
```

## Anti-Detection Features

### User-Agent Rotation
- Pool of 27+ real browser user agents (Chrome, Firefox, Safari, Edge)
- Covers Windows, macOS, Linux, Android, iOS
- Rotated per session

### Request Header Rotation
- Realistic `Accept`, `Accept-Language`, `Accept-Encoding` headers
- Sec-CH-UA, Sec-Fetch-* headers for Chrome-based UAs
- Random referer selection (Google, Bing, DuckDuckGo)

### Humanized Delays
- Bell-curve distribution (not uniform random)
- Configurable min/max delays
- Extra jitter between requests

### Proxy Support
- HTTP, HTTPS, and SOCKS5 proxy support
- Automatic proxy rotation from pool
- Configure via `PROXY_LIST` environment variable

### Rate Limiting
- Per-domain concurrency control
- Configurable requests per domain
- Automatic backoff on 429/503 responses

### Session Management
- Periodic session rotation (configurable interval)
- New user-agent + headers + proxy per session
- Automatic rotation on repeated failures

### Retry Logic
- Exponential backoff with jitter
- Configurable max retries
- Session rotation after 2+ failures

### Robots.txt Compliance
- Checks robots.txt before scraping
- Caches robots.txt per domain
- Respects disallow rules

## Configuration

### Companies List

The scraper includes 60+ companies across Lever, Greenhouse, and Ashby, including:
- **Indian companies**: Razorpay, CRED, Meesho, Freshworks, BrowserStack, Chargebee, Hasura, Zomato, Swiggy, PhonePe, Groww, Unacademy
- **Global companies hiring in India**: Stripe, Figma, Notion, Vercel, Airbnb, Spotify, Datadog, Cloudflare, MongoDB, GitLab, Canva

### Frontend Keywords

Filters jobs matching: React, Next.js, Vue, Angular, TypeScript, JavaScript, Frontend, UI Engineer, and 40+ more keywords.

### Location Filters

Matches India-specific locations: Bangalore, Mumbai, Delhi, Hyderabad, Pune, Chennai, Remote, APAC, and more.

### Skill Tag Extraction

Automatically extracts 70+ technology tags from job descriptions including frameworks, tools, and methodologies.

## Data Schema

Each scraped job includes:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique identifier |
| `title` | string | Job title |
| `company` | string | Company name |
| `location` | string | Job location |
| `description` | string | Full job description |
| `url` | string | Direct apply link |
| `salary` | string? | Salary information |
| `source` | enum | Job board source |
| `posted_at` | timestamp? | When the job was posted |
| `scraped_at` | timestamp | When the job was scraped |
| `tags` | string[] | Extracted skills/technologies |
| `job_type` | enum? | full-time, contract, etc. |
| `experience_level` | enum? | junior, mid, senior, etc. |

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SUPABASE_URL` | Yes | - | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | - | Supabase service role key |
| `PROXY_LIST` | No | - | Comma-separated proxy URLs |
| `MAX_CONCURRENT_PER_DOMAIN` | No | 2 | Max concurrent requests per domain |
| `MIN_REQUEST_DELAY` | No | 1500 | Min delay between requests (ms) |
| `MAX_REQUEST_DELAY` | No | 4500 | Max delay between requests (ms) |
| `MAX_RETRIES` | No | 3 | Max retries per request |
| `SESSION_ROTATION_INTERVAL` | No | 15 | Session rotation interval (minutes) |
| `LOG_LEVEL` | No | info | Logging level |
| `ENABLE_LEVER` | No | true | Enable Lever scraper |
| `ENABLE_GREENHOUSE` | No | true | Enable Greenhouse scraper |
| `ENABLE_ASHBY` | No | true | Enable Ashby scraper |
| `ENABLE_WELLFOUND` | No | true | Enable Wellfound scraper |
| `ENABLE_NAUKRI` | No | true | Enable Naukri scraper |
| `ENABLE_LINKEDIN` | No | true | Enable LinkedIn scraper |
| `ENABLE_INDEED` | No | true | Enable Indeed scraper |

## Logging

Logs are written to:
- **Console** (colorized)
- **`scraper.log`** (all levels, 10MB max, 5 file rotation)
- **`scraper-error.log`** (errors only, 5MB max, 3 file rotation)

## Production Deployment

### Cron Job (Recommended)

Run the scraper on a schedule using cron:

```bash
# Run every 6 hours
0 */6 * * * cd /path/to/scraper && npm run scrape >> /var/log/scraper-cron.log 2>&1
```

### Docker

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY scraper/package*.json ./
RUN npm ci --production
COPY scraper/ .
RUN npm run build
CMD ["node", "dist/index.js"]
```

### GitHub Actions

```yaml
name: Scrape Jobs
on:
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:
jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: cd scraper && npm ci && npm run scrape
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
```

## License

Private – part of the Frontend Jobs project.
