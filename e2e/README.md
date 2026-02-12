# E2E Tests — FrontHire (frontend-jobs)

End-to-end tests for the FrontHire job board application, powered by [Playwright](https://playwright.dev/).

## Prerequisites

1. **Node.js** ≥ 18
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```
4. Ensure environment variables are set (`.env.local`) for Supabase connectivity.

## Running Tests

| Command | Description |
|---|---|
| `npm run test:e2e` | Run all e2e tests in headless mode |
| `npm run test:e2e:headed` | Run tests with a visible browser window |
| `npm run test:e2e:ui` | Open the Playwright interactive UI |
| `npm run test:e2e:report` | View the HTML test report |
| `npx playwright test e2e/home.spec.ts` | Run a specific test file |
| `npx playwright test --grep "should render"` | Run tests matching a pattern |

## Test Structure

```
e2e/
├── README.md              # This file
├── home.spec.ts           # Home page tests (hero, banner, job listings, premium upsell)
├── navigation.spec.ts     # Navbar, routing, mobile menu tests
├── jobs-listing.spec.ts   # Jobs page: filters, search, pagination, URL params
├── job-detail.spec.ts     # Job detail page: sections, apply button, company sidebar
├── companies.spec.ts      # Companies listing & company profile pages
├── auth.spec.ts           # Login page, form validation, protected route redirects
├── dashboard.spec.ts      # Dashboard protected route tests
├── post-job.spec.ts       # Post job protected route & form tests
└── error-handling.spec.ts # 404 pages, JS error checks, responsive design
```

## Major Flows Covered

1. **Home Page** — Hero section, promotional banner dismiss, job listings (featured + regular), filter bar, premium upsell, load more button.
2. **Navigation** — Desktop navbar links, mobile hamburger menu, logo navigation, auth-aware links (Log In vs Dashboard).
3. **Jobs Listing & Filtering** — Search input, filter dropdowns (Location, Salary, Type, Seniority), expanded filter panel, URL-based filter state, clear filters, results count.
4. **Job Detail** — Loading state, job not found error, job sections (About, Responsibilities, Requirements, Benefits), Apply Now / Save Job buttons, company sidebar.
5. **Companies** — Company listing page, search/filter companies, company cards with job counts, navigation to company detail.
6. **Company Profile** — Company header, about section, open roles, company culture, Follow / Contact buttons.
7. **Authentication** — Login form rendering, input validation, error handling on invalid login, protected route redirects (`/dashboard`, `/post-job`, `/admin`), redirect parameter preservation.
8. **Dashboard** — Protected route redirect for unauthenticated users.
9. **Post Job** — Protected route redirect, login warning display.
10. **Error Handling** — 404 for non-existent routes, JavaScript error monitoring, responsive design on mobile/tablet viewports.

## Configuration

The Playwright configuration is in [`playwright.config.ts`](../playwright.config.ts):

- **Test directory:** `./e2e`
- **Base URL:** `http://localhost:3000` (configurable via `BASE_URL` env var)
- **Browser:** Chromium (Desktop Chrome)
- **Web server:** Automatically starts `npm run dev` before tests
- **Retries:** 2 on CI, 0 locally
- **Artifacts:** Screenshots on failure, traces on first retry

## Notes

- Tests that depend on Supabase data (job listings, companies) are written to handle both populated and empty states gracefully.
- Protected route tests verify middleware redirect behavior without requiring real authentication credentials.
- The dev server is automatically started by Playwright before test execution.
