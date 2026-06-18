# Architecture

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS 4, Framer Motion |
| Icons | Lucide React |
| Backend / DB | [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime) |
| Auth | Supabase Auth via `@supabase/ssr` + `@supabase/auth-helpers-nextjs` |
| Testing | Vitest + React Testing Library |
| Linting | ESLint (flat config) |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout (fonts, AuthProvider, Navbar, footer)
│   ├── page.tsx            # Home / landing page
│   ├── error.tsx           # Global error boundary
│   ├── not-found.tsx       # 404 page
│   ├── loading.tsx         # Root loading skeleton
│   ├── _global-error.tsx   # Root-level error fallback
│   ├── companies/          # Company listing & detail pages
│   ├── dashboard/          # Authenticated dashboard
│   ├── jobs/               # Job listing & detail pages
│   ├── login/              # Authentication page
│   └── post-job/           # Job posting form
├── components/
│   ├── home/               # Landing page components (Hero, PremiumUpsell)
│   ├── jobs/               # Job-related components (JobCard, FilterBar)
│   ├── layout/             # Shared layout components (Navbar)
│   └── ui/                 # Reusable UI primitives (Badge)
├── data/                   # Static/mock data
├── hooks/                  # Custom React hooks (useJobs)
├── lib/
│   ├── auth-context.tsx    # Auth context provider
│   ├── env.ts              # Environment variable helpers
│   ├── supabase.ts         # Supabase client singleton
│   ├── utils.ts            # General utilities (cn)
│   └── services/           # Centralized data-access layer
│       ├── index.ts        # Barrel export
│       ├── jobs.ts         # Job CRUD operations
│       └── companies.ts    # Company query operations
├── types/                  # Shared TypeScript types
│   └── job.ts              # Job, Company, FilterState types
└── __tests__/              # Test files
    ├── setup.ts            # Test setup (jest-dom matchers)
    ├── lib/                # Unit tests for utilities
    └── components/         # Component tests
supabase/
├── migrations/             # Database migration SQL files
└── seed.sql                # Seed data
```

## Key Design Decisions

1. **App Router** — All routing uses the Next.js App Router with file-based conventions (`layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`).

2. **Client-side data fetching** — Pages use client components (`'use client'`) with custom hooks (`useJobs`, `useJob`) for data fetching. This keeps the app interactive and allows real-time filter/search without full page reloads.

3. **Centralized service layer** (`lib/services/`) — All Supabase queries are extracted into dedicated service modules. Hooks and page components import from this layer rather than calling `supabase` directly, reducing duplication and making queries easier to test or swap.

4. **Auth via context** — `AuthProvider` wraps the app and exposes `useAuth()` for session state, admin detection, and sign-out. Admin access is determined by a hardcoded email allowlist.

5. **Tailwind + utility-first CSS** — Styling uses Tailwind CSS with a custom design-token approach (`brand-primary`, `brand-secondary`, etc.) defined in `globals.css`.

6. **Error boundaries at every level** — The root `error.tsx` and `not-found.tsx` catch unhandled errors and missing routes. Each route segment can add its own `loading.tsx` for granular loading states.

## Known Areas for Improvement

- **Server Components** — Most pages are client components. Migrating read-only pages (job detail, company listing) to Server Components would improve initial load performance and SEO.
- **Database types** — Supabase-generated types are not used; queries cast results with `as unknown as`. Generating types from the database schema would improve type safety.
- **Pagination** — Currently client-side only. Server-side pagination with cursor-based queries would scale better.
- **Testing coverage** — The test foundation is in place but coverage is minimal. Integration tests for hooks and E2E tests (e.g., Playwright) should be added.
- **Environment variables** — Supabase URL has a hardcoded fallback. All secrets should come strictly from environment variables.
- **Admin system** — Admin detection via email allowlist is fragile. A proper role-based system (Supabase RLS policies or a roles table) would be more secure.
- **Image optimization** — Company logos use raw `<img>` tags. Switching to `next/image` would enable automatic optimization.
