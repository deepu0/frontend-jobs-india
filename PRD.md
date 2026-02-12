# Product Requirements Document (PRD)

## FrontEndJobs.in — India's Curated Front-End Job Portal

**Version:** 1.0
**Date:** February 12, 2026
**Status:** Draft — Ready for Review

---

## Table of Contents

1. [Product Vision & Overview](#1-product-vision--overview)
2. [User Personas](#2-user-personas)
3. [Core Features — Job Seeker Portal](#3-core-features--job-seeker-portal)
4. [Core Features — Employer Portal](#4-core-features--employer-portal)
5. [Core Features — Admin Portal](#5-core-features--admin-portal)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [Tech Stack Recommendations](#7-tech-stack-recommendations)
8. [Database Schema (High-Level)](#8-database-schema-high-level)
9. [Pages / Routes](#9-pages--routes)
10. [SEO & Marketing](#10-seo--marketing)
11. [Monetization Ideas](#11-monetization-ideas)
12. [MVP Scope vs Future Scope](#12-mvp-scope-vs-future-scope)
13. [Non-Functional Requirements](#13-non-functional-requirements)
14. [Success Metrics / KPIs](#14-success-metrics--kpis)

---

## 1. Product Vision & Overview

### 1.1 Elevator Pitch

**FrontEndJobs.in** is India's first and only curated job portal exclusively for front-end developers. Every job listing is hand-picked and verified by our editorial team — no scraped listings, no spam, no ghost jobs. We believe in **quality over quantity**: fewer listings, but every single one is real, relevant, and worth your time.

### 1.2 Problem Statement

The Indian front-end developer job market suffers from several critical problems:

- **Signal-to-noise ratio is abysmal.** Major job portals (Naukri, LinkedIn, Indeed) are flooded with thousands of irrelevant, duplicate, and outdated listings. A front-end developer searching for a React role will wade through hundreds of generic "Software Engineer" postings, backend roles mislabeled as frontend, and listings from body-shopping consultancies.

- **Ghost jobs are rampant.** Companies post jobs they have no intention of filling — for brand visibility, to build a candidate pipeline, or because they forgot to close the listing. Developers waste hours applying to positions that don't exist.

- **No specialization.** General-purpose job boards treat front-end development as a subcategory. There's no platform that deeply understands the front-end ecosystem — the difference between a React developer and an Angular developer, the nuances of Next.js vs Remix, or why a developer who knows Tailwind CSS is different from one who knows Bootstrap.

- **Poor employer quality signals.** Developers can't easily distinguish between a well-funded startup offering meaningful work and a consultancy looking for cheap labor. Salary ranges are hidden, company culture is opaque, and tech stack details are vague.

- **India-specific gaps.** Remote work policies, salary expectations in INR, tier-2/tier-3 city opportunities, and the unique dynamics of the Indian tech job market are poorly served by global platforms.

### 1.3 Target Audience

**Primary:** Front-end developers based in India at all career stages (0–15+ years of experience), actively looking for jobs or passively open to opportunities.

**Secondary:** Employers and recruiters in India (startups, product companies, agencies, enterprises) looking to hire front-end talent.

**Tertiary:** Front-end developers of Indian origin working abroad who want to relocate back to India.

### 1.4 Unique Value Proposition

| Aspect | Traditional Job Boards | FrontEndJobs.in |
|--------|----------------------|-----------------|
| Listings | Scraped/aggregated, thousands of low-quality posts | Hand-picked, curated, every listing verified |
| Focus | Generic — all roles, all industries | Laser-focused on front-end development |
| Quality | Ghost jobs, duplicates, spam | Every job is real, active, and verified |
| Relevance | Broad filters, poor categorization | Deep front-end taxonomy (framework, tools, paradigm) |
| Salary | Often hidden | Salary range mandatory or strongly encouraged |
| Geography | Global or poorly localized | India-first — INR salaries, Indian cities, Indian companies |
| Curation | Algorithmic/automated | Human editorial review for every listing |

### 1.5 Product Principles

1. **Quality over quantity** — 50 curated jobs beat 5,000 scraped ones.
2. **Transparency** — Salary ranges, company details, and tech stacks should be visible upfront.
3. **Developer-first** — The UX should feel like a product built by developers, for developers.
4. **India-first** — Designed for the Indian market from day one, not an afterthought.
5. **Speed** — The site should be blazing fast. Developers notice performance.

---

## 2. User Personas

### 2.1 Job Seeker Personas

#### Persona 1: Arjun — Junior Front-End Developer (0–2 years)

| Attribute | Detail |
|-----------|--------|
| **Age** | 22–25 |
| **Location** | Pune, Maharashtra |
| **Education** | B.Tech in Computer Science |
| **Experience** | 1 year at a small IT services company |
| **Skills** | HTML, CSS, JavaScript, React (basic), Bootstrap |
| **Goals** | Land a role at a product company, learn modern tooling (Next.js, Tailwind), get a significant salary bump |
| **Frustrations** | Can't filter for junior-friendly roles, overwhelmed by listings requiring 5+ years for "junior" positions, doesn't know which companies are good to work for |
| **Salary Expectation** | ₹4–8 LPA |
| **Job Search Behavior** | Checks job boards daily, applies to 10–15 jobs per week, relies heavily on filters |
| **What he needs from us** | Clear experience-level tagging, company reviews/reputation signals, "good for freshers" badge |

#### Persona 2: Priya — Mid-Level Front-End Developer (3–6 years)

| Attribute | Detail |
|-----------|--------|
| **Age** | 26–30 |
| **Location** | Bangalore, Karnataka (open to remote) |
| **Experience** | 4 years — 2 at a startup, 2 at a mid-size product company |
| **Skills** | React, Next.js, TypeScript, Tailwind CSS, Redux, REST APIs, basic Node.js |
| **Goals** | Find a senior role or lead position, work on a product she's passionate about, remote-first preferred |
| **Frustrations** | LinkedIn is noisy, recruiters spam her with irrelevant roles, hard to find companies that genuinely offer remote work, salary negotiation is a black box |
| **Salary Expectation** | ₹15–30 LPA |
| **Job Search Behavior** | Passively looking, checks curated sources weekly, values recommendations from peers |
| **What she needs from us** | Remote-first filter, salary transparency, company culture insights, weekly email digest of relevant roles |

#### Persona 3: Vikram — Senior Front-End Developer / Tech Lead (7–15 years)

| Attribute | Detail |
|-----------|--------|
| **Age** | 30–40 |
| **Location** | Hyderabad, Telangana (willing to relocate for the right role) |
| **Experience** | 10 years — has worked at TCS, a YC startup, and a unicorn |
| **Skills** | React, Angular, Vue, Next.js, micro-frontends, design systems, performance optimization, team leadership |
| **Goals** | Principal engineer or engineering manager role, equity/ESOPs, work on technically challenging problems |
| **Frustrations** | Most job boards don't cater to senior roles, tired of recruiter spam, wants to evaluate companies before they evaluate him |
| **Salary Expectation** | ₹40–80+ LPA |
| **Job Search Behavior** | Very selective, only applies to 1–2 roles per month, relies on network and curated sources |
| **What he needs from us** | High-quality senior roles, detailed company profiles, ESOP/equity information, direct contact with hiring managers |

### 2.2 Employer Personas

#### Persona 4: Sneha — HR Manager at a Series B Startup

| Attribute | Detail |
|-----------|--------|
| **Company** | A fintech startup in Bangalore, 150 employees |
| **Hiring Need** | 3 mid-level React developers, 1 senior front-end lead |
| **Budget** | Willing to pay for quality hires, currently spending ₹50K/month on Naukri + LinkedIn |
| **Frustrations** | Gets hundreds of irrelevant applications on Naukri, LinkedIn recruiter seat is expensive, hard to find specialized front-end talent |
| **What she needs from us** | Targeted reach to front-end developers, quality applications (not quantity), employer branding, applicant management |

#### Persona 5: Rahul — CTO at an Early-Stage Startup

| Attribute | Detail |
|-----------|--------|
| **Company** | A SaaS startup in Delhi, 10 employees |
| **Hiring Need** | 1 full-stack developer with strong front-end skills |
| **Budget** | Limited — needs affordable job posting options |
| **Frustrations** | Can't compete with big companies on salary, needs to sell the vision, free job boards attract low-quality candidates |
| **What he needs from us** | Affordable posting options, ability to highlight startup culture/equity, reach to developers who are excited about startups |

### 2.3 Admin Persona

#### Persona 6: Admin / Curator

| Attribute | Detail |
|-----------|--------|
| **Role** | Content curator and platform administrator |
| **Responsibilities** | Review every job submission, verify company legitimacy, approve/reject listings, manually add high-quality jobs found through research, manage featured listings, monitor platform health |
| **Daily Workflow** | Review 20–50 job submissions, research companies, check for duplicates, ensure salary ranges are reasonable, flag suspicious listings |
| **Tools Needed** | Moderation queue with approve/reject/request-changes actions, company verification tools, analytics dashboard, bulk actions, notes system for internal communication |
| **What they need from us** | Efficient moderation workflow, company database with verification status, templates for rejection reasons, analytics on approval rates and time-to-review |

---

## 3. Core Features — Job Seeker Portal

### 3.1 Landing Page

The landing page is the primary entry point and must immediately communicate the value proposition.

**Components:**

- **Hero Section**
  - Headline: "India's Only Curated Front-End Job Board"
  - Subheadline: "Every job is hand-picked. No spam. No ghost jobs. Just real opportunities for front-end developers."
  - Search bar with location and keyword inputs
  - Quick filter chips: React, Vue, Angular, Next.js, Remote, Bangalore, Delhi, Mumbai
  - Stats bar: "X curated jobs · Y companies · Z developers trust us"

- **Featured Jobs Section**
  - 4–6 premium/featured job cards (paid placement by employers)
  - Each card shows: Company logo, job title, company name, location, salary range, tech stack tags, "Featured" badge
  - "View all featured jobs" link

- **Latest Curated Jobs**
  - 10–15 most recently approved jobs
  - Infinite scroll or "Load more" button
  - Each card shows: Job title, company name, location, work mode (remote/hybrid/onsite), salary range, experience level, tech stack tags, posted date
  - Quick apply / save button on each card

- **Browse by Category**
  - Grid of popular categories: React Jobs, Vue Jobs, Angular Jobs, Next.js Jobs, TypeScript Jobs, Remote Jobs, Fresher Jobs, Startup Jobs
  - Each category shows job count

- **Browse by City**
  - Popular Indian cities: Bangalore, Mumbai, Delhi/NCR, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Jaipur, Kochi
  - "Remote" as a virtual location
  - Each city shows job count

- **Why FrontEndJobs.in Section**
  - 3–4 value proposition cards explaining curation, quality, India-focus
  - Testimonials from developers (once available)

- **For Employers CTA**
  - "Hire the best front-end talent in India" with link to employer registration

- **Newsletter Signup**
  - "Get curated front-end jobs in your inbox every week"
  - Email input + frequency selector (daily/weekly)

- **Blog Preview**
  - 3 latest blog posts (salary guides, interview tips, tech stack comparisons)

- **Footer**
  - Links to all major pages, social media, contact, legal pages

### 3.2 Job Listing Page

**URL:** `/jobs`

**Layout:** Two-column layout — filters sidebar (left) + job list (right) on desktop; filters as a slide-out drawer on mobile.

**Filters:**

| Filter | Type | Options |
|--------|------|---------|
| **Keyword Search** | Text input | Full-text search across title, description, company name, skills |
| **Location** | Multi-select dropdown | All major Indian cities + "Remote" + "Anywhere in India" |
| **Work Mode** | Checkbox group | Remote, Hybrid, Onsite |
| **Experience Level** | Checkbox group | Fresher (0–1 yr), Junior (1–3 yr), Mid (3–6 yr), Senior (6–10 yr), Lead/Staff (10+ yr) |
| **Tech Stack** | Multi-select with search | React, Vue, Angular, Next.js, Nuxt.js, Svelte, TypeScript, JavaScript, Tailwind CSS, Material UI, Redux, GraphQL, Node.js, and more |
| **Salary Range** | Range slider | ₹0 – ₹1 Cr+ LPA (with presets: ₹5L+, ₹10L+, ₹20L+, ₹40L+) |
| **Company Size** | Checkbox group | Startup (1–50), Small (51–200), Medium (201–1000), Large (1000+) |
| **Company Type** | Checkbox group | Product, Service, Agency, Consultancy, Startup |
| **Posted Date** | Radio group | Last 24 hours, Last 7 days, Last 30 days, All time |
| **Sort By** | Dropdown | Most Recent, Salary (High to Low), Salary (Low to High), Most Relevant |

**Job Card (in listing):**

```
┌─────────────────────────────────────────────────────┐
│ [Company Logo]  Senior React Developer              │
│                 Razorpay · Bangalore · Remote OK     │
│                                                     │
│ ₹25–40 LPA  ·  3–6 years  ·  Posted 2 days ago     │
│                                                     │
│ [React] [TypeScript] [Next.js] [Tailwind CSS]       │
│                                                     │
│ [Save ♡]                              [Apply →]     │
└─────────────────────────────────────────────────────┘
```

**Behavior:**
- URL updates with filter parameters (e.g., `/jobs?location=bangalore&stack=react&mode=remote`) for shareability and SEO
- Results update in real-time as filters change (debounced)
- Pagination or infinite scroll (configurable)
- Empty state with suggestions if no results match
- "Clear all filters" button
- Filter count badge showing active filters
- Mobile: Sticky "Filter" button at bottom of screen

### 3.3 Job Detail Page

**URL:** `/jobs/[slug]` (SEO-friendly slug, e.g., `/jobs/senior-react-developer-razorpay-bangalore`)

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back to Jobs                                              │
│                                                             │
│ [Company Logo]                                              │
│ Senior React Developer                                      │
│ Razorpay · Bangalore, Karnataka · Remote OK                 │
│ ₹25–40 LPA · 3–6 years experience                          │
│ Posted 2 days ago · 45 applicants                           │
│                                                             │
│ [Apply Now]  [Save Job]  [Share]                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ## About the Role                                           │
│ [Rich text job description]                                 │
│                                                             │
│ ## Requirements                                             │
│ - 3+ years of experience with React                         │
│ - Strong TypeScript skills                                  │
│ - Experience with Next.js                                   │
│ - ...                                                       │
│                                                             │
│ ## Nice to Have                                             │
│ - Experience with design systems                            │
│ - Contributions to open source                              │
│ - ...                                                       │
│                                                             │
│ ## Tech Stack                                               │
│ [React] [TypeScript] [Next.js] [Tailwind] [GraphQL]        │
│                                                             │
│ ## Benefits & Perks                                         │
│ - Health insurance                                          │
│ - ESOPs                                                     │
│ - Flexible hours                                            │
│ - ...                                                       │
│                                                             │
│ ## Salary Range                                             │
│ ₹25,00,000 – ₹40,00,000 per annum                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ## About Razorpay                                           │
│ [Company logo] [Company description]                        │
│ Industry: Fintech · Size: 1000+ · Founded: 2014            │
│ Website: razorpay.com                                       │
│ [View all jobs from Razorpay →]                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ## Similar Jobs                                             │
│ [3–4 related job cards]                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- JSON-LD structured data for Google Jobs integration
- Open Graph meta tags for social sharing
- "Report this job" option
- Application method: Either redirect to external URL or in-app application form
- View count (visible to employer, optionally to job seekers)
- Social sharing buttons (Twitter, LinkedIn, WhatsApp, Copy Link)
- Breadcrumb navigation

### 3.4 Job Search

**Full-Text Search:**
- Powered by Supabase full-text search (PostgreSQL `tsvector`/`tsquery`) or Algolia
- Searches across: Job title, job description, company name, skills/tech stack, location
- Typo tolerance and fuzzy matching
- Search suggestions/autocomplete as user types
- Recent searches saved locally
- Popular searches displayed when search is empty

**Search Results Page:**
- Same layout as job listing page but with search query highlighted
- "X results for 'React developer in Bangalore'"
- Filters available alongside search results
- "Did you mean...?" for misspelled queries

### 3.5 Save / Bookmark Jobs

- Heart/bookmark icon on every job card and job detail page
- Saved jobs accessible from user dashboard (`/dashboard/saved-jobs`)
- Saved jobs list with:
  - Job card preview
  - Date saved
  - Job status indicator (still active / closed / expired)
  - "Remove from saved" action
  - "Apply" action
- Requires authentication (prompt to login/signup if not authenticated)
- Saved jobs count shown in navbar

### 3.6 Apply to Jobs

**Two application methods (configured per job by employer):**

1. **External Redirect:**
   - "Apply on company website" button
   - Opens company's ATS/careers page in new tab
   - We track the click as an application
   - Confirmation: "You're being redirected to Razorpay's careers page"

2. **In-App Application:**
   - Application form with:
     - Name (pre-filled from profile)
     - Email (pre-filled from profile)
     - Phone number
     - Resume upload (PDF, max 5MB) or select from uploaded resumes
     - Cover letter (optional, text area)
     - Portfolio/GitHub URL (optional)
     - Expected salary (optional)
     - Notice period dropdown
     - "Why are you interested in this role?" (optional)
   - Submit button with confirmation
   - Application status tracked in dashboard

**Post-Application:**
- Confirmation screen/toast: "Application submitted successfully!"
- Email confirmation sent to applicant
- Application appears in user's application tracker
- Employer notified of new application

### 3.7 Email Alerts / Job Notifications

**Job Alert Setup:**
- Users can create alerts based on:
  - Keywords (e.g., "React", "Senior Frontend")
  - Location (e.g., Bangalore, Remote)
  - Experience level
  - Tech stack
  - Salary range
- Frequency: Instant (as jobs are approved), Daily digest, Weekly digest
- Maximum 5 active alerts per user (free tier)

**Email Content:**
- Clean, mobile-friendly HTML email
- Subject: "5 new React jobs in Bangalore this week — FrontEndJobs.in"
- Job cards with title, company, salary, location
- "View Job" and "Apply" CTAs
- Unsubscribe link (one-click)
- "Manage alert preferences" link

**Implementation:**
- Cron job runs at configured intervals (daily at 9 AM IST, weekly on Monday 9 AM IST)
- Matches new approved jobs against user alert criteria
- Batches emails to avoid rate limits
- Tracks open rates and click-through rates

### 3.8 User Profile

**URL:** `/dashboard/profile`

**Profile Sections:**

1. **Basic Information**
   - Full name
   - Email (verified)
   - Phone number
   - Location (city, state)
   - Profile photo (upload or Gravatar)
   - Headline (e.g., "Senior React Developer | 5 years experience")
   - Bio / About me (rich text, 500 words max)

2. **Professional Details**
   - Current role & company
   - Total years of experience
   - Experience level (Fresher / Junior / Mid / Senior / Lead)
   - Current salary (private, used for job matching)
   - Expected salary range
   - Notice period
   - Availability: Immediately / 15 days / 30 days / 60 days / 90 days

3. **Skills & Tech Stack**
   - Tag-based skill selector from predefined list
   - Proficiency level per skill: Beginner / Intermediate / Advanced / Expert
   - Categories: Languages, Frameworks, Libraries, Tools, Methodologies

4. **Work Experience**
   - Add multiple entries:
     - Company name
     - Role/title
     - Start date – End date (or "Present")
     - Description (bullet points)
     - Tech stack used

5. **Education**
   - Degree, institution, year of graduation
   - Multiple entries supported

6. **Resume**
   - Upload PDF resume (max 5MB)
   - Multiple resumes supported (e.g., "General", "React-focused", "Lead-focused")
   - Set a default resume for quick applications
   - Resume parsing (future scope): Auto-fill profile from uploaded resume

7. **Links**
   - Portfolio website
   - GitHub profile
   - LinkedIn profile
   - Twitter/X profile
   - Stack Overflow profile
   - Personal blog

8. **Preferences**
   - Preferred work mode: Remote / Hybrid / Onsite / Any
   - Preferred locations (multiple)
   - Preferred company types
   - Open to opportunities: Yes / No / Only for the right role
   - Profile visibility: Public / Private / Visible to employers only

### 3.9 Application Tracker

**URL:** `/dashboard/applications`

**Features:**
- List of all applications with:
  - Job title & company
  - Date applied
  - Application method (in-app / external redirect)
  - Status: Applied → Under Review → Shortlisted → Interview → Offered → Rejected / Withdrawn
  - Status is updated by employer (for in-app applications) or manually by user (for external)
- Filter by status
- Sort by date
- Notes field per application (private, for user's own tracking)
- "Withdraw application" action
- Statistics: Total applied, Under review, Shortlisted, Rejected

---

## 4. Core Features — Employer Portal

### 4.1 Employer Registration & Company Profile

**Registration Flow:**
1. Sign up with email/password or Google OAuth
2. Select role: "I'm hiring" (employer)
3. Company information form:
   - Company name
   - Company website
   - Company email domain (for verification)
   - Industry
   - Company size
   - Founded year
   - Headquarters location
   - Company description (rich text)
   - Company logo upload
   - Social media links
4. Admin reviews and verifies the company (manual process)
5. Employer receives verification confirmation email
6. Can start posting jobs

**Company Profile Page (Public):**
- **URL:** `/companies/[slug]`
- Company logo, name, tagline
- About section
- Industry, size, founded year, location
- Tech stack used at the company
- Benefits & perks
- Company photos/culture gallery (future scope)
- All active job listings from this company
- "Follow this company" button (get notified of new jobs)

### 4.2 Post a Job

**URL:** `/dashboard/employer/post-job`

**Job Posting Form:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Job Title | Text | Yes | e.g., "Senior React Developer" |
| Job Slug | Auto-generated | Yes | From title, editable |
| Experience Level | Select | Yes | Fresher, Junior, Mid, Senior, Lead/Staff |
| Experience Range | Number range | Yes | e.g., 3–6 years |
| Location | Multi-select | Yes | Indian cities + Remote |
| Work Mode | Select | Yes | Remote, Hybrid, Onsite |
| Job Type | Select | Yes | Full-time, Part-time, Contract, Freelance, Internship |
| Salary Range | Number range | Strongly encouraged | Min–Max in LPA; "Competitive" option available but discouraged |
| Tech Stack | Multi-select tags | Yes | From predefined list + custom tags |
| Job Description | Rich text editor | Yes | Markdown support, min 200 characters |
| Requirements | Rich text editor | Yes | Bullet points encouraged |
| Nice to Have | Rich text editor | No | |
| Benefits & Perks | Checkbox list + custom | No | Health insurance, ESOPs, remote work, flexible hours, etc. |
| Application Method | Radio | Yes | "Apply on our website" (URL) or "Apply via FrontEndJobs.in" |
| Application URL | URL | Conditional | Required if external application |
| Application Email | Email | No | For receiving applications via email |
| Company | Auto-filled | Yes | From employer's company profile |
| Featured Listing | Checkbox | No | Paid option — appears in featured section |

**Post-Submission:**
- Job enters the **moderation queue** (not published immediately)
- Employer sees status: "Pending Review"
- Admin reviews and approves/rejects (see Section 5)
- Employer notified via email when job is approved or rejected (with reason)
- Approved jobs go live immediately

**Job Posting Guidelines (shown to employer):**
- Must be a front-end or front-end-adjacent role
- Must include salary range (strongly encouraged)
- Must be a real, active position (no pipeline building)
- Must include specific tech stack requirements
- No discriminatory language
- Company must be verified

### 4.3 Manage Posted Jobs

**URL:** `/dashboard/employer/jobs`

**Features:**
- List of all posted jobs with:
  - Job title
  - Status: Draft, Pending Review, Active, Paused, Closed, Rejected
  - Posted date
  - Views count
  - Applications count
  - Actions: Edit, Pause, Resume, Close, Duplicate
- **Edit:** Modify job details (re-enters moderation if significant changes)
- **Pause:** Temporarily hide from listings (e.g., enough applications received)
- **Resume:** Re-activate a paused job
- **Close:** Permanently close the listing (mark as filled or cancelled)
- **Duplicate:** Create a new job posting pre-filled with this job's details
- Bulk actions: Close multiple jobs, pause multiple jobs

### 4.4 View Applicants

**URL:** `/dashboard/employer/jobs/[id]/applicants`

**Features:**
- List of all applicants for a specific job:
  - Applicant name
  - Headline
  - Experience level
  - Key skills (matching job requirements highlighted)
  - Applied date
  - Resume download link
  - Application status
- **Applicant Detail View:**
  - Full profile information
  - Resume viewer (in-browser PDF viewer)
  - Cover letter
  - Portfolio/GitHub links
  - Application answers
  - Status update dropdown: Under Review → Shortlisted → Interview → Offered → Rejected
  - Internal notes (visible only to employer team)
  - "Download Resume" button
  - "Send Email" action (opens email client or in-app messaging — future scope)
- **Filters:** By status, by date, by experience level
- **Sort:** By date, by relevance (skill match score — future scope)
- **Export:** Download all applicants as CSV

### 4.5 Employer Dashboard

**URL:** `/dashboard/employer`

**Dashboard Widgets:**

1. **Overview Cards:**
   - Total active jobs
   - Total applications received (this month)
   - Total views across all jobs (this month)
   - Application-to-view ratio

2. **Recent Applications:**
   - Last 10 applications across all jobs
   - Quick actions: View profile, Update status

3. **Job Performance:**
   - Table/chart showing each active job's views, applications, and conversion rate
   - Trend over time (last 30 days)

4. **Quick Actions:**
   - Post a new job
   - View moderation queue status
   - Edit company profile

5. **Notifications:**
   - New applications
   - Job approved/rejected by admin
   - Job expiring soon (30-day auto-expiry warning)

---

## 5. Core Features — Admin Portal

### 5.1 Admin Dashboard

**URL:** `/admin`

**Dashboard Widgets:**

1. **Key Metrics (Real-time):**
   - Total active jobs
   - Total registered users (job seekers)
   - Total registered employers
   - Total applications this month
   - Jobs pending review
   - Jobs approved today / this week / this month
   - Jobs rejected today / this week / this month

2. **Moderation Queue Summary:**
   - X jobs pending review
   - Average time to review
   - Oldest pending job (urgency indicator)

3. **Growth Charts:**
   - New users over time (daily/weekly/monthly)
   - New jobs over time
   - Applications over time
   - Traffic / page views (from analytics integration)

4. **Recent Activity Feed:**
   - Latest job submissions
   - Latest user registrations
   - Latest applications
   - Admin actions log

5. **System Health:**
   - Database size
   - Storage usage
   - Email delivery stats
   - Error rates

### 5.2 Job Moderation Queue — The Curation Workflow

This is the **core differentiator** of the platform. Every job goes through human review.

**URL:** `/admin/moderation`

**Queue View:**
- List of all pending jobs, sorted by submission date (oldest first)
- Each item shows:
  - Job title
  - Company name (with verification badge if verified)
  - Submitted by (employer name)
  - Submitted date/time
  - Time in queue
  - Quick preview of job details

**Review Interface:**

```
┌─────────────────────────────────────────────────────────────┐
│ MODERATION REVIEW                                           │
│                                                             │
│ Job: Senior React Developer                                 │
│ Company: Razorpay (✓ Verified)                              │
│ Submitted: 2 hours ago by sneha@razorpay.com                │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Full job preview as it would appear on the site]       │ │
│ │ ...                                                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ CHECKLIST:                                                  │
│ ☑ Is this a front-end or front-end-adjacent role?           │
│ ☑ Is the company legitimate?                                │
│ ☑ Is the salary range reasonable?                           │
│ ☑ Is the job description detailed enough?                   │
│ ☑ Are tech stack requirements specific?                     │
│ ☑ No discriminatory language?                               │
│ ☑ No duplicate of existing active listing?                  │
│                                                             │
│ ADMIN NOTES:                                                │
│ [Text area for internal notes]                              │
│                                                             │
│ ACTIONS:                                                    │
│ [✓ Approve]  [✗ Reject]  [↩ Request Changes]  [⏸ Hold]     │
│                                                             │
│ If rejecting, select reason:                                │
│ ○ Not a front-end role                                      │
│ ○ Company not verified                                      │
│ ○ Insufficient job description                              │
│ ○ Suspected ghost job                                       │
│ ○ Duplicate listing                                         │
│ ○ Discriminatory content                                    │
│ ○ Other: [custom reason]                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Workflow States:**

```
Submitted → Pending Review → [Approved | Rejected | Changes Requested | On Hold]
                                  ↓                        ↓
                              Published              Employer notified
                                  ↓                  (resubmits with changes)
                           Active (30 days)                ↓
                                  ↓                  Back to Pending Review
                              Expired
```

**Approval Actions:**
- **Approve:** Job goes live immediately. Employer notified. Job appears in listings and triggers matching job alerts.
- **Reject:** Job is rejected with a reason. Employer notified with the reason. Employer can edit and resubmit.
- **Request Changes:** Admin sends specific feedback (e.g., "Please add salary range", "Please clarify if this is remote-friendly"). Employer notified and can edit.
- **Hold:** Admin puts the job on hold for further investigation (e.g., company verification pending).

**Bulk Actions:**
- Approve multiple jobs at once
- Reject multiple jobs with a common reason

### 5.3 User Management

**URL:** `/admin/users`

**Features:**
- Searchable, sortable list of all registered users
- Filters: Role (job seeker / employer / admin), Status (active / suspended / unverified), Registration date
- User detail view:
  - Profile information
  - Activity log (applications, saved jobs, logins)
  - Account status management: Activate, Suspend, Delete
  - Role management: Change role, Grant admin access
- Bulk actions: Suspend, Delete, Export

### 5.4 Employer Management

**URL:** `/admin/employers`

**Features:**
- List of all registered companies
- Verification status: Unverified, Pending Verification, Verified, Rejected
- Company detail view:
  - Company profile information
  - Verification documents (if required)
  - All jobs posted by this company
  - Employer team members
  - Verification actions: Verify, Reject, Request more info
- Verification workflow:
  1. Employer registers and creates company profile
  2. Admin reviews company website, LinkedIn, and other signals
  3. Admin verifies or requests additional information
  4. Verified companies get a badge on their profile and job listings

### 5.5 Content Management

**URL:** `/admin/content`

**Features:**

1. **Blog Management:**
   - Create, edit, publish, unpublish blog posts
   - Rich text editor with image upload
   - Categories and tags
   - SEO fields (meta title, meta description, slug)
   - Schedule publishing

2. **Featured Jobs:**
   - Select which jobs appear in the "Featured" section on the homepage
   - Set featured duration
   - Reorder featured jobs

3. **Banners:**
   - Create announcement banners for the site header
   - Set start/end dates
   - Link to relevant page
   - Dismiss behavior (once per session / permanent)

4. **Static Pages:**
   - Edit About, Contact, Privacy Policy, Terms of Service pages
   - Rich text editor

5. **Email Templates:**
   - Edit email templates for:
     - Welcome email
     - Job alert digest
     - Application confirmation
     - Job approved/rejected notification
     - Password reset
     - Email verification

### 5.6 Analytics & Reporting

**URL:** `/admin/analytics`

**Reports:**

1. **Platform Overview:**
   - Total users, employers, jobs, applications (all-time and trends)
   - DAU/WAU/MAU
   - Traffic sources

2. **Job Metrics:**
   - Jobs posted vs approved vs rejected (approval rate)
   - Average time to review
   - Most popular tech stacks
   - Most popular locations
   - Salary distribution

3. **User Metrics:**
   - Registration trends
   - Profile completion rate
   - Application rate (applications per user)
   - Retention (returning users)

4. **Employer Metrics:**
   - Jobs per employer
   - Applications per job (average)
   - Employer satisfaction (future: survey)

5. **Search Analytics:**
   - Most searched keywords
   - Searches with no results
   - Filter usage patterns

### 5.7 Manual Job Addition

**URL:** `/admin/jobs/add`

Admins can manually add jobs they discover through research (e.g., from company career pages, Twitter, LinkedIn). This is a key part of the curation strategy — proactively finding great jobs, not just waiting for employers to post.

**Features:**
- Same form as employer job posting
- Additional fields:
  - Source URL (where the admin found the job)
  - Source type: Company career page, LinkedIn, Twitter, Referral, Other
  - Contact person at company (if known)
  - Admin notes
- Auto-approved (no moderation needed since admin is adding it)
- Option to invite the company to claim the listing and create an employer account

---

## 6. Authentication & Authorization

### 6.1 Authentication Methods

#### Email/Password Signup & Login

- **Signup:**
  - Email, password (min 8 characters, must include uppercase, lowercase, number)
  - Role selection: "I'm looking for a job" / "I'm hiring"
  - Email verification required (magic link or 6-digit OTP)
  - Welcome email sent after verification

- **Login:**
  - Email + password
  - "Remember me" checkbox (extends session duration)
  - "Forgot password?" link
  - Rate limiting: Max 5 failed attempts per 15 minutes, then CAPTCHA or temporary lockout

#### Google OAuth

- One-click signup/login with Google
- Extracts: Name, email, profile photo
- If email already exists, links accounts
- Role selection on first OAuth login

#### GitHub OAuth

- One-click signup/login with GitHub
- Extracts: Name, email, profile photo, GitHub username
- Particularly relevant for developers
- Auto-populates GitHub profile link

### 6.2 Role-Based Access Control (RBAC)

| Permission | Job Seeker | Employer | Admin |
|------------|-----------|----------|-------|
| View jobs | ✅ | ✅ | ✅ |
| Apply to jobs | ✅ | ❌ | ❌ |
| Save jobs | ✅ | ❌ | ❌ |
| Create job alerts | ✅ | ❌ | ❌ |
| Post jobs | ❌ | ✅ | ✅ |
| View applicants | ❌ | ✅ (own jobs) | ✅ (all) |
| Manage company profile | ❌ | ✅ (own) | ✅ (all) |
| Moderate jobs | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |
| View analytics | ❌ | ✅ (own) | ✅ (all) |
| Manage content | ❌ | ❌ | ✅ |

### 6.3 Password Reset

- "Forgot password?" on login page
- Enter email → receive reset link (valid for 1 hour)
- Reset link leads to "Set new password" page
- Password requirements enforced
- Confirmation email sent after successful reset
- All existing sessions invalidated after password reset

### 6.4 Email Verification

- Required for all email/password signups
- Verification email sent immediately after signup
- Contains a magic link (valid for 24 hours) or 6-digit OTP
- Resend verification email option (max 3 per hour)
- Unverified accounts have limited access (can browse but not apply or post)

### 6.5 Session Management

- **JWT-based authentication** via Supabase Auth
- Access token: Short-lived (1 hour)
- Refresh token: Long-lived (30 days, or 90 days with "Remember me")
- Tokens stored in HTTP-only cookies (not localStorage) for security
- Automatic token refresh on API calls
- Session invalidation on:
  - Logout
  - Password change
  - Account suspension by admin
- Multi-device support: Users can be logged in on multiple devices
- "Active sessions" view in settings (future scope)

---

## 7. Tech Stack Recommendations

### 7.1 Frontend

| Technology | Purpose | Rationale |
|-----------|---------|-----------|
| **Next.js 14+ (App Router)** | Full-stack React framework | SSR for SEO, API routes for backend, App Router for modern patterns, excellent DX |
| **TypeScript** | Type safety | Catches bugs at compile time, better DX with autocomplete, essential for a production app |
| **Tailwind CSS** | Utility-first CSS | Rapid UI development, consistent design, small bundle size with purging, great for responsive design |
| **shadcn/ui** | Component library | Beautiful, accessible components built on Radix UI, fully customizable, not a dependency (copied into project) |
| **React Hook Form** | Form management | Performant forms with minimal re-renders, great validation with Zod |
| **Zod** | Schema validation | Runtime type checking, form validation, API request/response validation |
| **TanStack Query (React Query)** | Data fetching & caching | Automatic caching, background refetching, optimistic updates, pagination support |
| **Zustand** | Client state management | Lightweight, simple API, good for UI state (filters, modals, etc.) |
| **Lucide React** | Icons | Consistent, beautiful icon set, tree-shakeable |
| **date-fns** | Date formatting | Lightweight date utility, tree-shakeable |

### 7.2 Backend

| Technology | Purpose | Rationale |
|-----------|---------|-----------|
| **Next.js API Routes (Route Handlers)** | API layer | Co-located with frontend, serverless, easy deployment on Vercel |
| **Supabase Client SDK** | Database & auth client | Type-safe database queries, real-time subscriptions, auth helpers |
| **Supabase Edge Functions** | Serverless functions | For background tasks like email sending, webhook handling |

### 7.3 Database & Backend Services

| Technology | Purpose | Rationale |
|-----------|---------|-----------|
| **Supabase (PostgreSQL)** | Primary database | Managed PostgreSQL with excellent DX, Row Level Security, real-time, generous free tier |
| **Supabase Auth** | Authentication | Built-in email/password, OAuth providers, JWT management, session handling |
| **Supabase Storage** | File storage | Resume uploads, company logos, profile photos; integrated with auth for access control |
| **Supabase Realtime** | Real-time updates | Live notification counts, real-time moderation queue updates |
| **Row Level Security (RLS)** | Data access control | Database-level security policies ensuring users can only access their own data |

### 7.4 Email

| Technology | Purpose | Rationale |
|-----------|---------|-----------|
| **Resend** (primary recommendation) | Transactional email | Developer-friendly API, React Email for templates, good deliverability, generous free tier |
| **SendGrid** (alternative) | Transactional email | Industry standard, robust, good for high volume |
| **React Email** | Email templates | Build email templates with React components, works perfectly with Resend |

### 7.5 Search

| Technology | Purpose | Rationale |
|-----------|---------|-----------|
| **Supabase Full-Text Search** (MVP) | Job search | Built into PostgreSQL, no additional service, good enough for MVP |
| **Algolia** (future) | Advanced search | Typo tolerance, faceted search, instant results, better UX for scale |

### 7.6 Deployment & Infrastructure

| Technology | Purpose | Rationale |
|-----------|---------|-----------|
| **Vercel** | Hosting & deployment | Optimized for Next.js, automatic previews, edge network, excellent DX |
| **Vercel Analytics** | Web analytics | Privacy-friendly, integrated with Next.js |
| **Sentry** | Error tracking | Real-time error monitoring, performance tracking |
| **Upstash Redis** | Rate limiting & caching | Serverless Redis, perfect for rate limiting API routes and caching |

### 7.7 Development Tools

| Technology | Purpose |
|-----------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Husky** | Git hooks (pre-commit linting) |
| **GitHub Actions** | CI/CD pipeline |
| **Playwright** | E2E testing |
| **Vitest** | Unit testing |

---

## 8. Database Schema (High-Level)

### 8.1 Entity Relationship Overview

```
Users ──────────── Profiles (1:1)
  │                    │
  │                    ├── WorkExperience (1:N)
  │                    ├── Education (1:N)
  │                    └── Skills (1:N)
  │
  ├── Companies (1:N, as employer)
  │       │
  │       └── Jobs (1:N)
  │              │
  │              ├── Applications (1:N) ←── Users (as job seeker)
  │              └── SavedJobs (1:N) ←── Users (as job seeker)
  │
  ├── JobAlerts (1:N)
  │
  └── AdminActions (1:N, as admin)
```

### 8.2 Table Definitions

#### `users` (Managed by Supabase Auth)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Supabase Auth user ID |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User's email |
| `encrypted_password` | VARCHAR | NOT NULL | Managed by Supabase Auth |
| `role` | ENUM | NOT NULL, DEFAULT 'job_seeker' | 'job_seeker', 'employer', 'admin' |
| `email_confirmed_at` | TIMESTAMP | | Email verification timestamp |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `last_sign_in_at` | TIMESTAMP | | |

#### `profiles`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, FK → users.id | |
| `full_name` | VARCHAR(255) | NOT NULL | |
| `headline` | VARCHAR(255) | | Professional headline |
| `bio` | TEXT | | About me |
| `phone` | VARCHAR(20) | | |
| `location_city` | VARCHAR(100) | | |
| `location_state` | VARCHAR(100) | | |
| `avatar_url` | TEXT | | Profile photo URL |
| `experience_years` | INTEGER | | Total years of experience |
| `experience_level` | ENUM | | 'fresher', 'junior', 'mid', 'senior', 'lead' |
| `current_company` | VARCHAR(255) | | |
| `current_role` | VARCHAR(255) | | |
| `current_salary` | INTEGER | | In LPA, private |
| `expected_salary_min` | INTEGER | | In LPA |
| `expected_salary_max` | INTEGER | | In LPA |
| `notice_period` | ENUM | | 'immediate', '15_days', '30_days', '60_days', '90_days' |
| `resume_url` | TEXT | | Primary resume URL |
| `portfolio_url` | TEXT | | |
| `github_url` | TEXT | | |
| `linkedin_url` | TEXT | | |
| `twitter_url` | TEXT | | |
| `is_open_to_work` | BOOLEAN | DEFAULT true | |
| `preferred_work_mode` | ENUM | | 'remote', 'hybrid', 'onsite', 'any' |
| `profile_visibility` | ENUM | DEFAULT 'public' | 'public', 'private', 'employers_only' |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

#### `companies`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | |
| `owner_id` | UUID | FK → users.id, NOT NULL | Employer who created the company |
| `name` | VARCHAR(255) | NOT NULL | |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL-friendly name |
| `description` | TEXT | | Rich text company description |
| `website` | TEXT | | |
| `logo_url` | TEXT | | |
| `industry` | VARCHAR(100) | | e.g., "Fintech", "E-commerce", "SaaS" |
| `company_size` | ENUM | | 'startup', 'small', 'medium', 'large' |
| `employee_count` | VARCHAR(50) | | e.g., "51-200" |
| `founded_year` | INTEGER | | |
| `headquarters_city` | VARCHAR(100) | | |
| `headquarters_state` | VARCHAR(100) | | |
| `tech_stack` | TEXT[] | | Array of technologies used |
| `benefits` | TEXT[] | | Array of benefits offered |
| `linkedin_url` | TEXT | | |
| `twitter_url` | TEXT | | |
| `is_verified` | BOOLEAN | DEFAULT false | Admin-verified |
| `verification_status` | ENUM | DEFAULT 'pending' | 'pending', 'verified', 'rejected' |
| `verified_at` | TIMESTAMP | | |
| `verified_by` | UUID | FK → users.id | Admin who verified |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

#### `jobs`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | |
| `company_id` | UUID | FK → companies.id, NOT NULL | |
| `posted_by` | UUID | FK → users.id, NOT NULL | Employer or admin who posted |
| `title` | VARCHAR(255) | NOT NULL | |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | SEO-friendly URL slug |
| `description` | TEXT | NOT NULL | Rich text job description |
| `requirements` | TEXT | | Rich text requirements |
| `nice_to_have` | TEXT | | |
| `experience_level` | ENUM | NOT NULL | 'fresher', 'junior', 'mid', 'senior', 'lead' |
| `experience_min` | INTEGER | | Minimum years |
| `experience_max` | INTEGER | | Maximum years |
| `location_city` | VARCHAR(100)[] | | Array of cities |
| `location_state` | VARCHAR(100)[] | | |
| `work_mode` | ENUM | NOT NULL | 'remote', 'hybrid', 'onsite' |
| `job_type` | ENUM | NOT NULL | 'full_time', 'part_time', 'contract', 'freelance', 'internship' |
| `salary_min` | INTEGER | | In LPA |
| `salary_max` | INTEGER | | In LPA |
| `salary_disclosed` | BOOLEAN | DEFAULT true | |
| `tech_stack` | TEXT[] | NOT NULL | Array of required technologies |
| `benefits` | TEXT[] | | |
| `application_method` | ENUM | NOT NULL | 'in_app', 'external' |
| `application_url` | TEXT | | External application URL |
| `application_email` | VARCHAR(255) | | |
| `status` | ENUM | NOT NULL, DEFAULT 'pending_review' | 'draft', 'pending_review', 'approved', 'rejected', 'changes_requested', 'paused', 'closed', 'expired' |
| `is_featured` | BOOLEAN | DEFAULT false | Paid featured listing |
| `featured_until` | TIMESTAMP | | |
| `source` | ENUM | DEFAULT 'employer' | 'employer', 'admin_manual', 'admin_scraped' |
| `source_url` | TEXT | | For admin-added jobs |
| `moderation_notes` | TEXT | | Admin's internal notes |
| `rejection_reason` | TEXT | | Reason for rejection |
| `reviewed_by` | UUID | FK → users.id | Admin who reviewed |
| `reviewed_at` | TIMESTAMP | | |
| `published_at` | TIMESTAMP | | When the job went live |
| `expires_at` | TIMESTAMP | | Auto-expiry date (30 days from publish) |
| `view_count` | INTEGER | DEFAULT 0 | |
| `application_count` | INTEGER | DEFAULT 0 | Denormalized for performance |
| `search_vector` | TSVECTOR | | Full-text search index |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Indexes:**
- `idx_jobs_status` on `status`
- `idx_jobs_company` on `company_id`
- `idx_jobs_experience_level` on `experience_level`
- `idx_jobs_work_mode` on `work_mode`
- `idx_jobs_published_at` on `published_at`
- `idx_jobs_search` GIN index on `search_vector`
- `idx_jobs_tech_stack` GIN index on `tech_stack`
- `idx_jobs_location` GIN index on `location_city`

#### `applications`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | |
| `job_id` | UUID | FK → jobs.id, NOT NULL | |
| `user_id` | UUID | FK → users.id, NOT NULL | Job seeker |
| `resume_url` | TEXT | | Resume used for this application |
| `cover_letter` | TEXT | | |
| `portfolio_url` | TEXT | | |
| `expected_salary` | INTEGER | | In LPA |
| `notice_period` | VARCHAR(50) | | |
| `why_interested` | TEXT | | |
| `status` | ENUM | NOT NULL, DEFAULT 'applied' | 'applied', 'under_review', 'shortlisted', 'interview', 'offered', 'rejected', 'withdrawn' |
| `application_method` | ENUM | NOT NULL | 'in_app', 'external_redirect' |
| `employer_notes` | TEXT | | Internal notes by employer |
| `status_updated_at` | TIMESTAMP | | |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Constraints:**
- UNIQUE(`job_id`, `user_id`) — one application per user per job

#### `saved_jobs`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | |
| `user_id` | UUID | FK → users.id, NOT NULL | |
| `job_id` | UUID | FK → jobs.id, NOT NULL | |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Constraints:**
- UNIQUE(`user_id`, `job_id`)

#### `job_alerts`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | |
| `user_id` | UUID | FK → users.id, NOT NULL | |
| `name` | VARCHAR(255) | | User-friendly alert name |
| `keywords` | TEXT[] | | Search keywords |
| `locations` | TEXT[] | | City filters |
| `work_modes` | TEXT[] | | Remote/hybrid/onsite |
| `experience_levels` | TEXT[] | | |
| `tech_stack` | TEXT[] | | |
| `salary_min` | INTEGER | | |
| `frequency` | ENUM | NOT NULL, DEFAULT 'weekly' | 'instant', 'daily', 'weekly' |
| `is_active` | BOOLEAN | DEFAULT true | |
| `last_sent_at` | TIMESTAMP | | |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

#### `admin_actions`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | |
| `admin_id` | UUID | FK → users.id, NOT NULL | |
| `action_type` | ENUM | NOT NULL | 'job_approved', 'job_rejected', 'job_changes_requested', 'user_suspended', 'user_activated', 'company_verified', 'company_rejected', 'job_featured', 'job_manually_added' |
| `target_type` | VARCHAR(50) | NOT NULL | 'job', 'user', 'company' |
| `target_id` | UUID | NOT NULL | ID of the affected entity |
| `reason` | TEXT | | Reason for the action |
| `metadata` | JSONB | | Additional context |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

#### `blog_posts` (Content Management)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | |
| `author_id` | UUID | FK → users.id, NOT NULL | |
| `title` | VARCHAR(255) | NOT NULL | |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | |
| `content` | TEXT | NOT NULL | Rich text / Markdown |
| `excerpt` | TEXT | | Short summary |
| `cover_image_url` | TEXT | | |
| `category` | VARCHAR(100) | | |
| `tags` | TEXT[] | | |
| `meta_title` | VARCHAR(255) | | SEO |
| `meta_description` | TEXT | | SEO |
| `status` | ENUM | DEFAULT 'draft' | 'draft', 'published', 'archived' |
| `published_at` | TIMESTAMP | | |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

#### `newsletter_subscribers`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | |
| `frequency` | ENUM | DEFAULT 'weekly' | 'daily', 'weekly' |
| `is_active` | BOOLEAN | DEFAULT true | |
| `unsubscribed_at` | TIMESTAMP | | |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

### 8.3 Row Level Security (RLS) Policies

| Table | Policy | Description |
|-------|--------|-------------|
| `profiles` | SELECT: Public for `public` visibility; owner + admins for `private` | Profile visibility control |
| `profiles` | UPDATE: Owner only | Users can only edit their own profile |
| `companies` | SELECT: Public | All companies are publicly viewable |
| `companies` | INSERT/UPDATE: Owner or admin | Only company owner or admin can modify |
| `jobs` | SELECT: `status = 'approved'` for public; all for admin; own for employer | Only approved jobs are publicly visible |
| `jobs` | INSERT: Employer or admin | |
| `jobs` | UPDATE: Owner employer or admin | |
| `applications` | SELECT: Applicant (own) or job owner (employer) or admin | |
| `applications` | INSERT: Job seekers only | |
| `saved_jobs` | ALL: Owner only | Users can only manage their own saved jobs |
| `job_alerts` | ALL: Owner only | Users can only manage their own alerts |
| `admin_actions` | ALL: Admin only | |

---

## 9. Pages / Routes

### 9.1 Public Pages (No Auth Required)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home / Landing Page | Hero, featured jobs, latest jobs, categories |
| `/jobs` | Job Listings | Filterable, searchable job list |
| `/jobs/[slug]` | Job Detail | Full job description, company info, apply button |
| `/companies` | Company Directory | Browse all verified companies |
| `/companies/[slug]` | Company Profile | Company details + their active jobs |
| `/blog` | Blog Listing | All published blog posts |
| `/blog/[slug]` | Blog Post | Individual blog post |
| `/about` | About Us | Platform story, team, mission |
| `/contact` | Contact Us | Contact form |
| `/privacy` | Privacy Policy | |
| `/terms` | Terms of Service | |
| `/login` | Login | Email/password + OAuth |
| `/signup` | Sign Up | Registration with role selection |
| `/signup/employer` | Employer Sign Up | Employer-specific registration |
| `/forgot-password` | Forgot Password | Password reset request |
| `/reset-password` | Reset Password | Set new password (from email link) |
| `/verify-email` | Email Verification | Verify email address |

### 9.2 Job Seeker Pages (Auth Required, Role: job_seeker)

| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard Home | Overview, recent applications, saved jobs |
| `/dashboard/profile` | Edit Profile | Full profile editor |
| `/dashboard/applications` | Application Tracker | All applications with status |
| `/dashboard/saved-jobs` | Saved Jobs | Bookmarked jobs |
| `/dashboard/job-alerts` | Job Alerts | Manage email alerts |
| `/dashboard/resumes` | Resume Manager | Upload and manage resumes |
| `/dashboard/settings` | Account Settings | Email, password, notifications, delete account |

### 9.3 Employer Pages (Auth Required, Role: employer)

| Route | Page | Description |
|-------|------|-------------|
| `/dashboard/employer` | Employer Dashboard | Overview, stats, recent applications |
| `/dashboard/employer/company` | Company Profile Editor | Edit company details |
| `/dashboard/employer/post-job` | Post a Job | Job posting form |
| `/dashboard/employer/jobs` | Manage Jobs | List of all posted jobs with actions |
| `/dashboard/employer/jobs/[id]` | Job Detail (Employer View) | Job stats + edit |
| `/dashboard/employer/jobs/[id]/applicants` | View Applicants | Applicants for a specific job |
| `/dashboard/employer/jobs/[id]/applicants/[id]` | Applicant Detail | Full applicant profile + actions |
| `/dashboard/employer/settings` | Employer Settings | Billing, notifications, team |

### 9.4 Admin Pages (Auth Required, Role: admin)

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Admin Dashboard | Key metrics, activity feed |
| `/admin/moderation` | Moderation Queue | Review pending jobs |
| `/admin/moderation/[id]` | Review Job | Detailed review interface |
| `/admin/jobs` | All Jobs | Manage all jobs on the platform |
| `/admin/jobs/add` | Add Job Manually | Admin adds a curated job |
| `/admin/users` | User Management | All users with actions |
| `/admin/users/[id]` | User Detail | User profile + admin actions |
| `/admin/employers` | Employer Management | All companies with verification |
| `/admin/employers/[id]` | Company Detail (Admin) | Company details + verification actions |
| `/admin/content/blog` | Blog Management | CRUD for blog posts |
| `/admin/content/blog/new` | New Blog Post | Blog editor |
| `/admin/content/blog/[id]` | Edit Blog Post | |
| `/admin/content/featured` | Featured Jobs | Manage featured listings |
| `/admin/content/banners` | Banner Management | Site-wide announcements |
| `/admin/analytics` | Analytics & Reports | Platform-wide analytics |
| `/admin/settings` | Admin Settings | Platform configuration |

### 9.5 API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/signup` | POST | User registration |
| `/api/auth/login` | POST | User login |
| `/api/auth/logout` | POST | User logout |
| `/api/auth/callback` | GET | OAuth callback handler |
| `/api/jobs` | GET | List jobs (with filters) |
| `/api/jobs` | POST | Create job (employer/admin) |
| `/api/jobs/[id]` | GET | Get job details |
| `/api/jobs/[id]` | PUT | Update job |
| `/api/jobs/[id]` | DELETE | Delete job |
| `/api/jobs/[id]/apply` | POST | Apply to job |
| `/api/jobs/[id]/save` | POST | Save/unsave job |
| `/api/jobs/search` | GET | Full-text search |
| `/api/applications` | GET | List user's applications |
| `/api/applications/[id]` | PUT | Update application status |
| `/api/companies` | GET | List companies |
| `/api/companies/[id]` | GET | Get company details |
| `/api/companies` | POST | Create company |
| `/api/companies/[id]` | PUT | Update company |
| `/api/profile` | GET | Get current user's profile |
| `/api/profile` | PUT | Update profile |
| `/api/job-alerts` | GET | List user's alerts |
| `/api/job-alerts` | POST | Create alert |
| `/api/job-alerts/[id]` | PUT | Update alert |
| `/api/job-alerts/[id]` | DELETE | Delete alert |
| `/api/admin/moderation` | GET | Get moderation queue |
| `/api/admin/moderation/[id]/approve` | POST | Approve job |
| `/api/admin/moderation/[id]/reject` | POST | Reject job |
| `/api/admin/users` | GET | List all users |
| `/api/admin/users/[id]` | PUT | Update user (suspend, role change) |
| `/api/admin/analytics` | GET | Get analytics data |
| `/api/newsletter/subscribe` | POST | Subscribe to newsletter |
| `/api/newsletter/unsubscribe` | POST | Unsubscribe |
| `/api/upload/resume` | POST | Upload resume file |
| `/api/upload/image` | POST | Upload image (logo, avatar) |

---

## 10. SEO & Marketing

### 10.1 Technical SEO

**Server-Side Rendering (SSR):**
- All public pages are server-rendered for optimal SEO
- Job listing and detail pages use SSR with ISR (Incremental Static Regeneration) for performance
- Company pages use SSR

**Meta Tags (per page):**
- `<title>` — Unique, descriptive, includes primary keyword
  - Home: "FrontEndJobs.in — India's Curated Front-End Job Board"
  - Job listing: "React Developer Jobs in Bangalore — FrontEndJobs.in"
  - Job detail: "Senior React Developer at Razorpay — ₹25-40 LPA — FrontEndJobs.in"
- `<meta name="description">` — Compelling, 150–160 characters
- `<meta name="robots">` — Appropriate indexing directives
- Canonical URLs on all pages
- `hreflang` tags (if multi-language support added later)

**JSON-LD Structured Data:**

Job Posting (on job detail pages):
```json
{
  "@context": "https://schema.org/",
  "@type": "JobPosting",
  "title": "Senior React Developer",
  "description": "...",
  "datePosted": "2026-02-10",
  "validThrough": "2026-03-10",
  "employmentType": "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Razorpay",
    "sameAs": "https://razorpay.com",
    "logo": "https://..."
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "INR",
    "value": {
      "@type": "QuantitativeValue",
      "minValue": 2500000,
      "maxValue": 4000000,
      "unitText": "YEAR"
    }
  },
  "jobLocationType": "TELECOMMUTE",
  "applicantLocationRequirements": {
    "@type": "Country",
    "name": "India"
  }
}
```

Organization (on homepage):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FrontEndJobs.in",
  "url": "https://frontendjobs.in",
  "logo": "https://frontendjobs.in/logo.png",
  "description": "India's curated front-end job board",
  "sameAs": [
    "https://twitter.com/frontendjobsin",
    "https://linkedin.com/company/frontendjobsin"
  ]
}
```

**Sitemap & Robots:**
- Dynamic XML sitemap (`/sitemap.xml`) generated from all public pages
- Includes all job detail pages, company pages, blog posts
- Updated daily
- `robots.txt` allowing all public pages, blocking admin/dashboard routes
- Sitemap submitted to Google Search Console

**Performance (Core Web Vitals):**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Next.js Image optimization for all images
- Font optimization with `next/font`
- Code splitting and lazy loading

**URL Structure:**
- Clean, descriptive URLs
- `/jobs/senior-react-developer-razorpay-bangalore` (not `/jobs/123`)
- `/companies/razorpay` (not `/companies/456`)
- `/blog/react-vs-vue-2026` (not `/blog/789`)

### 10.2 Blog Section

**Purpose:** Drive organic traffic, establish authority, provide value to the community.

**Content Categories:**
1. **Salary Guides:** "Front-End Developer Salary in India 2026 — Complete Guide"
2. **Tech Stack Comparisons:** "React vs Vue vs Angular in 2026 — Which Should You Learn?"
3. **Interview Prep:** "Top 50 React Interview Questions for 2026"
4. **Career Advice:** "How to Transition from Backend to Frontend Development"
5. **Industry Reports:** "State of Front-End Development in India — 2026 Report"
6. **Company Spotlights:** "Inside Razorpay's Front-End Engineering Team"
7. **Tutorial/Guides:** "Getting Started with Next.js App Router"

**SEO Strategy:**
- Target long-tail keywords relevant to Indian front-end developers
- Internal linking between blog posts and relevant job listings
- Author profiles with social links
- Table of contents for long posts
- Reading time estimate

### 10.3 Social Sharing

**Job Detail Pages:**
- Share buttons: Twitter/X, LinkedIn, WhatsApp (important for India), Copy Link
- Pre-formatted share text:
  - Twitter: "🚀 [Company] is hiring a [Title] — [Salary] — Apply now on @FrontEndJobsIn [URL]"
  - LinkedIn: Professional format with job details
  - WhatsApp: Concise message with key details and link

**Open Graph Tags:**
```html
<meta property="og:title" content="Senior React Developer at Razorpay — ₹25-40 LPA" />
<meta property="og:description" content="Razorpay is looking for a Senior React Developer in Bangalore. Remote OK. Apply now on FrontEndJobs.in" />
<meta property="og:image" content="https://frontendjobs.in/og/jobs/senior-react-developer-razorpay.png" />
<meta property="og:url" content="https://frontendjobs.in/jobs/senior-react-developer-razorpay-bangalore" />
<meta property="og:type" content="website" />
```

**Dynamic OG Images:**
- Auto-generated OG images for each job using `@vercel/og` or Satori
- Include: Job title, company logo, salary range, location
- Consistent branding

### 10.4 Newsletter

- Signup form on homepage, blog sidebar, and job listing page
- Double opt-in (email confirmation)
- Frequency options: Daily digest, Weekly digest
- Content: New curated jobs matching subscriber interests, blog highlights, industry news
- Unsubscribe in one click
- Track open rates, click rates, unsubscribe rates
- Use Resend or SendGrid for delivery

---

## 11. Monetization Ideas

### 11.1 Featured Job Listings

| Tier | Price | Duration | Benefits |
|------|-------|----------|----------|
| **Basic Listing** | Free | 30 days | Standard listing in search results |
| **Featured Listing** | ₹2,999/job | 30 days | Highlighted in search, appears in "Featured" section on homepage, badge on listing |
| **Premium Featured** | ₹4,999/job | 30 days | All Featured benefits + top of search results, social media promotion, newsletter inclusion |

### 11.2 Employer Subscription Plans

| Plan | Price | Jobs/Month | Features |
|------|-------|------------|----------|
| **Starter** | Free | 1 | Basic listing, standard support |
| **Growth** | ₹4,999/mo | 5 | Featured listings (2), applicant management, analytics, priority review |
| **Pro** | ₹9,999/mo | 15 | All Growth features + premium featured (3), dedicated account manager, employer branding page |
| **Enterprise** | Custom | Unlimited | All Pro features + API access, ATS integration, custom branding, bulk posting |

### 11.3 Resume Database Access

- Employers can search and browse job seeker profiles (with consent)
- Pricing: ₹2,999/mo for 50 profile views, ₹7,999/mo for unlimited
- Only profiles with `visibility = 'public'` or `'employers_only'` are searchable
- Contact information revealed only after profile view is "purchased"

### 11.4 Additional Revenue Streams

1. **Sponsored Blog Posts:** Companies can sponsor content (clearly labeled)
2. **Job Slot Packs:** Buy 10 job postings at a discount (₹19,999 for 10)
3. **Employer Branding:** Enhanced company profile with photos, videos, culture section (₹4,999/mo)
4. **Referral Program:** Employers get credits for referring other employers
5. **API Access:** For recruitment agencies to integrate with their ATS (custom pricing)

---

## 12. MVP Scope vs Future Scope

### 12.1 Phase 1 — MVP (Weeks 1–8)

**Goal:** Launch a functional curated job board with core job seeker and admin flows.

**In Scope:**

- [ ] Landing page with hero, featured jobs, latest jobs
- [ ] Job listing page with filters (location, work mode, experience level, tech stack)
- [ ] Job detail page with full description
- [ ] Full-text job search
- [ ] Email/password authentication (signup, login, logout)
- [ ] Google OAuth
- [ ] Job seeker profile (basic info, skills, resume upload)
- [ ] Save/bookmark jobs
- [ ] Apply to jobs (external redirect only)
- [ ] Admin dashboard (basic metrics)
- [ ] Admin moderation queue (approve/reject jobs)
- [ ] Admin manual job addition
- [ ] Employer registration and company profile
- [ ] Employer job posting form
- [ ] Employer job management (edit, pause, close)
- [ ] Basic SEO (meta tags, JSON-LD for jobs, sitemap)
- [ ] Mobile-responsive design
- [ ] Email verification
- [ ] Password reset

**Out of Scope for MVP:**
- In-app applications
- Application tracker
- Job alerts / email notifications
- Blog
- Newsletter
- Employer analytics
- Resume database
- Monetization features
- GitHub OAuth
- Advanced search (Algolia)

### 12.2 Phase 2 — Growth (Weeks 9–16)

**Goal:** Add engagement features, employer tools, and initial monetization.

- [ ] In-app job applications
- [ ] Application tracker for job seekers
- [ ] Employer applicant management (view applicants, update status)
- [ ] Employer dashboard with analytics
- [ ] Job alerts (daily/weekly email digest)
- [ ] Newsletter signup and delivery
- [ ] GitHub OAuth
- [ ] Blog section with CMS
- [ ] Company directory page
- [ ] Social sharing (Twitter, LinkedIn, WhatsApp)
- [ ] Dynamic OG images
- [ ] Featured job listings (paid)
- [ ] Basic employer subscription plans
- [ ] Admin employer verification workflow
- [ ] Admin user management
- [ ] Admin content management (blog, banners)
- [ ] Email templates (welcome, application confirmation, job alerts)
- [ ] Performance optimization (caching, ISR)

### 12.3 Phase 3 — Scale (Weeks 17–24+)

**Goal:** Advanced features, full monetization, and platform maturity.

- [ ] Algolia-powered search with typo tolerance and facets
- [ ] Resume database access for employers
- [ ] Employer branding pages (enhanced company profiles)
- [ ] ATS integration (Greenhouse, Lever, etc.)
- [ ] In-app messaging between employers and candidates
- [ ] Skill assessments / coding challenges integration
- [ ] Salary insights and benchmarking tool
- [ ] Company reviews by employees
- [ ] Referral system (users refer candidates)
- [ ] Mobile app (React Native or PWA)
- [ ] AI-powered job recommendations
- [ ] AI-powered resume parsing (auto-fill profile from resume)
- [ ] Advanced analytics and reporting
- [ ] Multi-language support (Hindi, regional languages)
- [ ] Slack/Discord integration for job alerts
- [ ] Webhook API for employers
- [ ] Enterprise features (SSO, team management, bulk operations)
- [ ] Community features (forums, Q&A)

---

## 13. Non-Functional Requirements

### 13.1 Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Time to First Byte (TTFB)** | < 200ms | Vercel Edge Network |
| **Largest Contentful Paint (LCP)** | < 2.5s | Lighthouse / Web Vitals |
| **First Input Delay (FID)** | < 100ms | Lighthouse / Web Vitals |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Lighthouse / Web Vitals |
| **Lighthouse Performance Score** | > 90 | Lighthouse CI in GitHub Actions |
| **API Response Time (p95)** | < 500ms | Vercel Analytics / Sentry |
| **Job Search Response Time** | < 300ms | Application monitoring |
| **Page Load (3G)** | < 5s | Lighthouse with throttling |
| **Bundle Size (JS)** | < 200KB gzipped | Next.js bundle analyzer |

**Strategies:**
- Server-side rendering for initial page loads
- Incremental Static Regeneration (ISR) for job listings (revalidate every 60s)
- Static generation for blog posts and static pages
- Image optimization with `next/image` (WebP, lazy loading, responsive sizes)
- Code splitting at route level (automatic with Next.js App Router)
- Database query optimization with proper indexes
- Connection pooling for database (Supabase built-in)
- CDN caching for static assets (Vercel Edge Network)
- Redis caching for frequently accessed data (Upstash)

### 13.2 Security

| Requirement | Implementation |
|-------------|---------------|
| **Authentication** | Supabase Auth with JWT, HTTP-only cookies |
| **Authorization** | Row Level Security (RLS) at database level |
| **Input Validation** | Zod schemas on both client and server |
| **SQL Injection** | Parameterized queries via Supabase client (never raw SQL) |
| **XSS Prevention** | React's built-in escaping, CSP headers, sanitize rich text input |
| **CSRF Protection** | SameSite cookies, CSRF tokens for mutations |
| **Rate Limiting** | Upstash Redis rate limiter on API routes (100 req/min per IP) |
| **File Upload Security** | File type validation, size limits, virus scanning (future), Supabase Storage policies |
| **HTTPS** | Enforced via Vercel (automatic SSL) |
| **Content Security Policy** | Strict CSP headers via `next.config.js` |
| **Dependency Security** | `npm audit` in CI, Dependabot alerts |
| **Data Encryption** | At rest (Supabase/AWS encryption), in transit (TLS 1.3) |
| **PII Protection** | Salary data private by default, profile visibility controls |
| **GDPR/Privacy** | Data export, account deletion, cookie consent |
| **Secrets Management** | Environment variables via Vercel, never committed to git |

### 13.3 Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
|-------------|---------------|
| **Keyboard Navigation** | All interactive elements focusable and operable via keyboard |
| **Screen Reader Support** | Semantic HTML, ARIA labels, live regions for dynamic content |
| **Color Contrast** | Minimum 4.5:1 for normal text, 3:1 for large text |
| **Focus Indicators** | Visible focus rings on all interactive elements |
| **Alt Text** | All images have descriptive alt text |
| **Form Labels** | All form inputs have associated labels |
| **Error Messages** | Clear, descriptive error messages associated with form fields |
| **Skip Navigation** | "Skip to main content" link |
| **Responsive Text** | Text scales with browser zoom up to 200% |
| **Motion** | Respect `prefers-reduced-motion` media query |
| **Component Library** | shadcn/ui built on Radix UI (accessibility-first) |

**Testing:**
- Axe DevTools in development
- Lighthouse accessibility audit in CI (score > 90)
- Manual screen reader testing (NVDA, VoiceOver)
- Keyboard-only navigation testing

### 13.4 Mobile Responsiveness

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| **Mobile** | < 640px | Single column, bottom navigation, slide-out filters |
| **Tablet** | 640px – 1024px | Two-column where appropriate, collapsible sidebar |
| **Desktop** | > 1024px | Full layout with sidebar filters, multi-column grids |

**Mobile-Specific Considerations:**
- Touch-friendly tap targets (min 44x44px)
- Swipe gestures for job cards (save, dismiss — future)
- Bottom sheet for filters on mobile
- Sticky apply button on job detail page (mobile)
- Optimized images for mobile bandwidth
- WhatsApp share button prominently placed (India-specific)
- PWA support with offline job viewing (future)

### 13.5 Reliability & Availability

| Metric | Target |
|--------|--------|
| **Uptime** | 99.9% (< 8.76 hours downtime/year) |
| **Error Rate** | < 0.1% of requests |
| **Recovery Time** | < 15 minutes for critical issues |
| **Data Backup** | Daily automated backups (Supabase) |
| **Monitoring** | Sentry for errors, Vercel Analytics for performance, UptimeRobot for availability |

### 13.6 Scalability

- **Database:** Supabase Pro plan supports up to 100K rows easily; upgrade path to Enterprise for millions
- **Serverless:** Vercel auto-scales API routes based on traffic
- **CDN:** Vercel Edge Network handles traffic spikes for static content
- **Search:** Migrate to Algolia when full-text search becomes a bottleneck (> 10K jobs)
- **Email:** Resend/SendGrid handle high-volume email delivery
- **Target:** Support 10K concurrent users, 50K jobs, 500K applications in Phase 3

---

## 14. Success Metrics / KPIs

### 14.1 North Star Metric

**Number of quality applications submitted per month** — This metric captures both supply (jobs) and demand (developers) and reflects the core value of the platform.

### 14.2 Acquisition Metrics

| Metric | Target (Month 3) | Target (Month 6) | Target (Month 12) |
|--------|-------------------|-------------------|---------------------|
| Monthly Active Users (MAU) | 5,000 | 20,000 | 75,000 |
| Registered Job Seekers | 1,000 | 5,000 | 25,000 |
| Registered Employers | 50 | 200 | 500 |
| Organic Traffic (monthly) | 10,000 | 50,000 | 200,000 |
| Newsletter Subscribers | 500 | 3,000 | 15,000 |

### 14.3 Engagement Metrics

| Metric | Target |
|--------|--------|
| Average Session Duration | > 3 minutes |
| Pages per Session | > 4 |
| Job Detail Page View Rate | > 40% of listing views |
| Save/Bookmark Rate | > 10% of job views |
| Application Rate | > 5% of job detail views |
| Return Visit Rate (weekly) | > 30% |
| Job Alert Signup Rate | > 15% of registered users |
| Email Open Rate (job alerts) | > 35% |
| Email Click Rate (job alerts) | > 10% |

### 14.4 Supply Metrics (Jobs)

| Metric | Target (Month 3) | Target (Month 6) | Target (Month 12) |
|--------|-------------------|-------------------|---------------------|
| Active Curated Jobs | 100 | 500 | 2,000 |
| New Jobs per Week | 25 | 75 | 200 |
| Employer-Submitted Jobs | 40% | 60% | 80% |
| Admin-Curated Jobs | 60% | 40% | 20% |
| Approval Rate | > 70% | > 75% | > 80% |
| Average Time to Review | < 24 hours | < 12 hours | < 6 hours |

### 14.5 Quality Metrics

| Metric | Target |
|--------|--------|
| Job Freshness (% active < 30 days) | > 90% |
| Salary Disclosure Rate | > 70% |
| Ghost Job Rate (reported) | < 2% |
| User-Reported Issues per 1000 jobs | < 5 |
| NPS (Net Promoter Score) | > 40 |

### 14.6 Revenue Metrics (Post-Monetization)

| Metric | Target (Month 6) | Target (Month 12) |
|--------|-------------------|---------------------|
| Monthly Recurring Revenue (MRR) | ₹50,000 | ₹3,00,000 |
| Paying Employers | 20 | 100 |
| Featured Listing Revenue | ₹30,000/mo | ₹1,50,000/mo |
| Average Revenue per Employer | ₹2,500/mo | ₹3,000/mo |
| Conversion Rate (Free → Paid) | 10% | 15% |

### 14.7 Technical Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance Score | > 90 |
| Lighthouse Accessibility Score | > 90 |
| Lighthouse SEO Score | > 95 |
| Core Web Vitals (all green) | 100% of pages |
| API Error Rate | < 0.1% |
| Uptime | > 99.9% |
| Deploy Frequency | Multiple times per week |
| Mean Time to Recovery (MTTR) | < 30 minutes |

---

## Appendix A: Glossary

| Term | Definition |
|------|-----------|
| **Curated** | Every job listing is manually reviewed and approved by the admin team before being published |
| **LPA** | Lakhs Per Annum — standard Indian salary notation (1 LPA = ₹1,00,000/year) |
| **Ghost Job** | A job listing for a position that doesn't actually exist or is not being actively filled |
| **RLS** | Row Level Security — PostgreSQL feature that restricts data access at the database level |
| **ISR** | Incremental Static Regeneration — Next.js feature for updating static pages without full rebuild |
| **OG** | Open Graph — protocol for rich link previews on social media |
| **ATS** | Applicant Tracking System — software used by companies to manage hiring |

## Appendix B: Competitive Landscape

| Platform | Focus | Curation | India-Specific |
|----------|-------|----------|----------------|
| Naukri.com | General jobs | ❌ Automated | ✅ |
| LinkedIn Jobs | General jobs | ❌ Automated | Partial |
| Indeed India | General jobs | ❌ Aggregated | Partial |
| Instahyre | Tech jobs | Partial (AI) | ✅ |
| Cutshort | Tech jobs | Partial (AI) | ✅ |
| RemoteOK | Remote jobs | ❌ Automated | ❌ |
| WeWorkRemotely | Remote jobs | ✅ Manual | ❌ |
| **FrontEndJobs.in** | **Front-end only** | **✅ Fully curated** | **✅** |

Our unique position: **The only platform that combines front-end specialization, full manual curation, and India-first focus.**

---

*This PRD is a living document and will be updated as the product evolves. Last updated: February 12, 2026.*
