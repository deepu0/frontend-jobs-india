# Product Requirements Document (PRD)

## Curated Front-End Job Portal for India

**Version:** 1.0
**Last Updated:** 2026-02-12
**Status:** Draft

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [User Personas](#2-user-personas)
3. [Job Seeker Features](#3-job-seeker-features)
4. [Employer Features](#4-employer-features)
5. [Admin Portal](#5-admin-portal)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [Tech Stack](#7-tech-stack)
8. [Database Schema](#8-database-schema)
9. [Pages & Routes](#9-pages--routes)
10. [SEO & Marketing](#10-seo--marketing)
11. [Monetization](#11-monetization)
12. [MVP vs Future Phases](#12-mvp-vs-future-phases)
13. [Non-Functional Requirements](#13-non-functional-requirements)
14. [KPIs & Success Metrics](#14-kpis--success-metrics)

---

## 1. Product Vision

### Problem Statement

The Indian front-end developer job market is flooded with low-quality, duplicated, and irrelevant listings across generic job portals. Job seekers waste significant time sifting through spam postings, outdated listings, and roles that don't match their skill set. Employers, on the other hand, struggle to reach qualified front-end talent in a sea of generic applicants.

### Vision

Build **India's premier curated front-end job portal** where every listing is hand-picked and verified by our editorial team. We aim to be the single trusted destination for front-end developers in India — covering React, Next.js, Vue, Angular, Svelte, and related technologies — to find high-quality, vetted opportunities from reputable employers.

### Core Principles

- **Quality over Quantity:** Every job listing is manually reviewed and curated before going live.
- **India-First:** Tailored for the Indian job market — INR salaries, Indian cities, remote-friendly roles, and local employer verification.
- **Developer Experience:** A fast, clean, and modern interface that respects developers' time.
- **Transparency:** Clear salary ranges, company details, and honest job descriptions.
- **Trust:** Verified employers, moderated content, and zero spam.

### Target Market

- Front-end developers in India (junior to senior, 0–15+ years experience)
- Indian startups, mid-size companies, and enterprises hiring front-end talent
- Remote-first companies hiring from India

---

## 2. User Personas

### 2.1 Job Seeker Personas

#### Persona A: Fresh Graduate — "Priya"

- **Age:** 22
- **Location:** Pune, Maharashtra
- **Experience:** 0–1 years (internships)
- **Skills:** HTML, CSS, JavaScript, React basics
- **Goals:** Land her first full-time front-end role; wants clear salary info and beginner-friendly listings
- **Pain Points:** Overwhelmed by generic portals; can't distinguish real opportunities from spam; unsure about salary expectations
- **Behavior:** Browses daily on mobile, applies to 5–10 jobs per week, values company reviews

#### Persona B: Mid-Level Developer — "Rahul"

- **Age:** 28
- **Location:** Bangalore, Karnataka
- **Experience:** 3–5 years
- **Skills:** React, Next.js, TypeScript, Tailwind CSS, Redux
- **Goals:** Find a senior role or lead position at a product company; wants remote-friendly options
- **Pain Points:** Too many recruiter spam messages; hard to find roles that match his exact stack; wants salary transparency
- **Behavior:** Checks weekly, bookmarks interesting roles, prefers one-click apply

#### Persona C: Senior Developer — "Ananya"

- **Age:** 34
- **Location:** Remote (Hyderabad base)
- **Experience:** 8+ years
- **Skills:** Full front-end architecture, React, Vue, performance optimization, mentoring
- **Goals:** Find a principal/staff engineer role or a high-paying remote contract; values company culture
- **Pain Points:** Most portals show junior roles; wants curated senior-only listings; values privacy
- **Behavior:** Passive job seeker, wants alerts for specific roles, applies selectively

### 2.2 Employer Personas

#### Persona D: Startup Founder — "Vikram"

- **Age:** 30
- **Location:** Delhi NCR
- **Company Size:** 10–50 employees
- **Goals:** Hire 2–3 strong front-end developers quickly; limited HR bandwidth
- **Pain Points:** Generic portals bring unqualified applicants; wants a targeted audience of front-end specialists
- **Behavior:** Posts jobs himself, wants a simple posting flow, values quality applicants over volume

#### Persona E: HR Manager — "Meera"

- **Age:** 35
- **Location:** Mumbai, Maharashtra
- **Company Size:** 500+ employees
- **Goals:** Fill multiple front-end positions across teams; needs applicant tracking and bulk management
- **Pain Points:** Existing portals have poor filtering; wants verified, serious candidates
- **Behavior:** Uses dashboard daily, manages multiple active listings, exports applicant data

### 2.3 Admin Persona

#### Persona F: Platform Curator — "Admin Team"

- **Goals:** Maintain listing quality, verify employers, moderate content, grow the platform
- **Responsibilities:** Review every submitted job, approve/reject listings, manage user reports, verify employer legitimacy, add hand-picked jobs from external sources
- **Tools Needed:** Curation queue, analytics dashboard, user management, content moderation tools

---

## 3. Job Seeker Features

### 3.1 Job Listings

- Browse all curated job listings in a clean, card-based layout
- Each listing displays: job title, company name & logo, location (city or remote), salary range (INR), experience level, key skills/tags, posted date, and job type (full-time, part-time, contract, freelance)
- "Curated" badge on all listings to reinforce trust
- Featured/promoted listings appear at the top with visual distinction
- Pagination and infinite scroll support

### 3.2 Filters

- **Location:** City-based (Bangalore, Mumbai, Delhi NCR, Pune, Hyderabad, Chennai, Kolkata, etc.) + Remote + Hybrid
- **Experience Level:** Fresher (0–1 yr), Junior (1–3 yr), Mid (3–5 yr), Senior (5–8 yr), Lead/Staff (8+ yr)
- **Job Type:** Full-time, Part-time, Contract, Freelance, Internship
- **Salary Range:** Slider or predefined brackets (e.g., ₹3–6 LPA, ₹6–12 LPA, ₹12–25 LPA, ₹25–50 LPA, ₹50+ LPA)
- **Skills/Technologies:** React, Next.js, Vue, Angular, Svelte, TypeScript, JavaScript, Tailwind CSS, CSS, HTML, Redux, GraphQL, etc.
- **Company Type:** Startup, Mid-size, Enterprise, Agency, Remote-first
- **Date Posted:** Last 24 hours, Last 7 days, Last 30 days
- Filters are combinable and URL-persisted for shareability

### 3.3 Search

- Full-text search across job titles, descriptions, company names, and skills
- Autocomplete suggestions as the user types
- Search results ranked by relevance with curated listings prioritized
- Recent searches saved locally
- Search works in combination with active filters

### 3.4 Bookmarks

- Authenticated users can bookmark/save jobs for later
- Dedicated "Saved Jobs" page in user dashboard
- Bookmark count visible on each job card
- Remove bookmarks with one click
- Bookmarks persist across sessions (stored in database)

### 3.5 Apply to Jobs

- **Direct Apply:** One-click apply using saved profile and resume
- **External Apply:** Redirect to company's application page (tracked as a click)
- **Apply with Cover Letter:** Optional cover letter text field during application
- Application confirmation with email notification
- Prevent duplicate applications to the same job
- Track application status (Applied, Viewed, Shortlisted, Rejected)

### 3.6 Job Alerts

- Users can set up alerts based on: keywords, location, experience level, salary range, skills
- Alert frequency: Instant (email per new match), Daily digest, Weekly digest
- Manage alerts from dashboard (create, edit, delete, pause)
- Maximum of 5 active alerts per free user
- Email notifications with direct links to matching jobs

### 3.7 User Profile

- **Basic Info:** Name, email, phone, location, profile photo
- **Professional Info:** Current role, years of experience, skills (tag-based), bio/summary
- **Resume:** Upload PDF/DOCX (max 5 MB), or link to external resume
- **Social Links:** GitHub, LinkedIn, Portfolio/Website, Twitter
- **Preferences:** Desired role, preferred locations, salary expectations, job type preference, open to remote
- Profile completeness indicator with prompts to fill missing sections
- Public profile option (visible to employers)

### 3.8 Application Tracker

- Dashboard view of all submitted applications
- Status tracking: Applied → Viewed by Employer → Shortlisted → Interview → Offered → Rejected
- Filter applications by status, date, company
- Notes field for personal tracking
- Timeline view showing application history
- Email notifications on status changes

---

## 4. Employer Features

### 4.1 Employer Registration

- Sign up with company email (free personal emails flagged for manual review)
- Company profile setup: name, logo, website, description, industry, size, founded year, headquarters, social links
- Employer verification process (manual review by admin within 24–48 hours)
- Verification badge displayed on company profile and job listings
- Multiple team members can be invited to the same company account

### 4.2 Post Jobs

- Step-by-step job posting form:
  - **Job Title** (required)
  - **Job Type** (full-time, part-time, contract, freelance, internship)
  - **Location** (city selection + remote/hybrid toggle)
  - **Experience Level** (dropdown)
  - **Salary Range** (min–max in INR LPA, option to hide)
  - **Skills Required** (tag selector from predefined + custom)
  - **Job Description** (rich text editor with markdown support)
  - **Requirements** (bulleted list)
  - **Benefits/Perks** (predefined checkboxes + custom)
  - **Application Method** (apply on platform or external URL)
  - **Application Deadline** (optional)
- Preview before submission
- Jobs enter curation queue after submission (not immediately live)
- Notification when job is approved/rejected with feedback
- Save as draft functionality
- Duplicate/clone existing job posting

### 4.3 Manage Jobs

- Dashboard listing all posted jobs with status: Draft, Pending Review, Active, Paused, Expired, Rejected
- Edit active listings (changes re-enter curation queue)
- Pause/unpause listings
- Close listings manually
- Extend expiry date
- View performance metrics per listing (views, applications, bookmarks)

### 4.4 View Applicants

- List of all applicants per job posting
- Applicant card: name, experience, skills, resume link, applied date, cover letter
- Filter applicants by experience, skills, application date
- Shortlist/reject applicants with one click
- Download applicant resumes (individual or bulk)
- Send status update notifications to applicants
- Export applicant list as CSV

### 4.5 Employer Dashboard

- Overview metrics: total active jobs, total applications received, profile views, shortlisted candidates
- Recent applications feed
- Job performance charts (views over time, application conversion rate)
- Account settings and team management
- Billing and subscription management (for premium features)
- Company profile editor

---

## 5. Admin Portal

### 5.1 Admin Dashboard

- Platform-wide metrics at a glance:
  - Total users (job seekers + employers), new registrations (daily/weekly/monthly)
  - Total jobs (active, pending, expired, rejected)
  - Total applications submitted
  - Platform traffic (page views, unique visitors)
  - Revenue metrics (if monetized)
- Trend charts for key metrics over time
- Quick action buttons for common tasks
- System health indicators

### 5.2 Job Moderation / Curation Queue

- **Incoming Queue:** All newly submitted jobs awaiting review, sorted by submission date
- **Review Interface:**
  - Full job details displayed alongside company info
  - Approve with optional edits (admin can improve title, description, tags)
  - Reject with reason (predefined reasons + custom message sent to employer)
  - Request changes (send back to employer with specific feedback)
  - Flag for further review
- **Quality Checklist:**
  - Salary range included and reasonable
  - Job description is detailed and clear
  - No discriminatory language
  - Company is verified or verifiable
  - Skills and requirements are realistic
  - No duplicate listings
- **Bulk Actions:** Approve/reject multiple listings at once
- **Curation Stats:** Average review time, approval rate, rejection reasons breakdown

### 5.3 User Management

- Searchable list of all users (job seekers and employers)
- User detail view: profile info, activity history, applications/postings
- Actions: suspend, ban, warn, delete account, reset password, change role
- Filter users by role, registration date, activity level, verification status
- Handle user reports and complaints
- Impersonate user (view platform as that user for debugging)

### 5.4 Employer Verification

- Queue of employers pending verification
- Verification checklist:
  - Valid company website
  - Company email domain matches website
  - LinkedIn company page exists
  - GST/CIN number verification (optional)
  - Physical address verification (optional)
- Approve/reject verification with notes
- Revoke verification if issues arise later
- Verification badge management

### 5.5 Content Management

- Manage static pages (About, Contact, Terms, Privacy Policy, FAQ)
- Blog/resource management (if applicable)
- Manage skill tags and categories
- Manage location/city list
- Manage predefined benefits/perks list
- Site-wide announcements and banners
- Email template management

### 5.6 Analytics

- **User Analytics:** Registration trends, active users, retention rates, user demographics
- **Job Analytics:** Posting trends, category distribution, salary trends, most-demanded skills
- **Application Analytics:** Application rates, conversion funnels, time-to-apply
- **Search Analytics:** Top search queries, zero-result searches, popular filters
- **Revenue Analytics:** Subscription metrics, featured listing revenue, conversion rates
- Export reports as CSV/PDF
- Custom date range selection for all reports

### 5.7 Manual Job Addition

- Admin can manually add jobs sourced from external platforms, social media, or direct outreach
- Same form as employer job posting but with additional fields:
  - Source URL (original listing link)
  - Source platform (LinkedIn, company website, Twitter, etc.)
  - Attributed company (link to existing or create new company profile)
  - Admin notes (internal, not visible to users)
- These jobs are marked as "Curated by [Platform Name]" instead of employer-posted
- Auto-expire after 30 days unless renewed
- Track performance separately from employer-posted jobs

---

## 6. Authentication & Authorization

### 6.1 Email/Password Authentication

- Registration with email and password
- Password requirements: minimum 8 characters, at least one uppercase, one lowercase, one number
- Email validation on registration
- Login with email and password
- "Remember me" functionality
- Rate limiting on login attempts (max 5 failed attempts, then 15-minute lockout)

### 6.2 OAuth (Social Login)

- **Google OAuth 2.0:** One-click sign in/sign up with Google account
- **GitHub OAuth:** One-click sign in/sign up with GitHub account (relevant for developer audience)
- OAuth accounts automatically verified (no email verification needed)
- Link/unlink OAuth providers from account settings
- Handle account merging when OAuth email matches existing account

### 6.3 Role-Based Access Control (RBAC)

- **Roles:**
  - `job_seeker` — Default role for new registrations; can browse, apply, bookmark, manage profile
  - `employer` — Can post jobs, manage listings, view applicants; requires company profile setup
  - `admin` — Full platform access; can moderate, manage users, access analytics
  - `super_admin` — All admin permissions + manage other admins, system configuration
- **Permissions Matrix:**

| Feature | Job Seeker | Employer | Admin | Super Admin |
|---|---|---|---|---|
| Browse jobs | ✅ | ✅ | ✅ | ✅ |
| Apply to jobs | ✅ | ❌ | ❌ | ❌ |
| Bookmark jobs | ✅ | ❌ | ✅ | ✅ |
| Post jobs | ❌ | ✅ | ✅ | ✅ |
| View applicants | ❌ | ✅ (own) | ✅ (all) | ✅ (all) |
| Moderate jobs | ❌ | ❌ | ✅ | ✅ |
| Manage users | ❌ | ❌ | ✅ | ✅ |
| System config | ❌ | ❌ | ❌ | ✅ |

- Role assignment on registration (job seeker by default, employer on company setup)
- Admin roles assigned manually by super_admin only

### 6.4 Password Reset

- "Forgot Password" flow via email
- Secure, time-limited reset token (expires in 1 hour)
- One-time use tokens (invalidated after use)
- Email notification on successful password change
- Rate limiting on reset requests (max 3 per hour)

### 6.5 Email Verification

- Verification email sent on registration with a secure link
- Link expires after 24 hours
- Resend verification email option (max 3 resends per day)
- Unverified users can browse but cannot apply or post jobs
- Reminder emails for unverified accounts (after 24 hours and 72 hours)

### 6.6 JWT (JSON Web Tokens)

- **Access Token:** Short-lived (15 minutes), used for API authentication
- **Refresh Token:** Long-lived (7 days), stored in HTTP-only secure cookie
- Token rotation on refresh (old refresh token invalidated)
- Token payload includes: user ID, email, role, issued-at, expiry
- Supabase handles JWT generation and validation natively
- Middleware validates tokens on protected routes
- Automatic token refresh on the client side before expiry
- Logout invalidates refresh token server-side

---

## 7. Tech Stack

### 7.1 Frontend

| Technology | Purpose |
|---|---|
| **Next.js 14+** (App Router) | React framework with SSR, SSG, ISR, API routes, and file-based routing |
| **TypeScript** | Type safety across the entire codebase |
| **Tailwind CSS** | Utility-first CSS framework for rapid, consistent styling |
| **shadcn/ui** | Accessible, customizable UI component library built on Radix UI |
| **React Hook Form** | Performant form handling with validation |
| **Zod** | Schema validation for forms and API inputs |
| **Zustand** | Lightweight state management (if needed beyond React context) |
| **Lucide Icons** | Consistent icon set |

### 7.2 Backend & Database

| Technology | Purpose |
|---|---|
| **Supabase** | Backend-as-a-Service: PostgreSQL database, authentication, real-time subscriptions, storage, edge functions |
| **Supabase Auth** | Handles email/password, OAuth, JWT, session management |
| **Supabase Database** (PostgreSQL) | Primary data store with Row Level Security (RLS) |
| **Supabase Storage** | File uploads (resumes, company logos, profile photos) |
| **Supabase Edge Functions** | Serverless functions for custom backend logic (email notifications, webhooks) |
| **Supabase Realtime** | Real-time updates for notifications and dashboard data |

### 7.3 Deployment & Infrastructure

| Technology | Purpose |
|---|---|
| **Vercel** | Hosting and deployment for Next.js with edge network, preview deployments, and analytics |
| **Vercel Analytics** | Web vitals and performance monitoring |
| **Vercel Cron Jobs** | Scheduled tasks (expire old listings, send digest emails) |
| **GitHub Actions** | CI/CD pipeline for linting, testing, and deployment |

### 7.4 Third-Party Services

| Service | Purpose |
|---|---|
| **Resend / SendGrid** | Transactional emails (verification, alerts, notifications) |
| **Sentry** | Error tracking and monitoring |
| **Google Analytics** | User behavior analytics |
| **Cloudflare** (optional) | DDoS protection and CDN |
| **Razorpay** (future) | Payment processing for premium features |

---

## 8. Database Schema

### 8.1 Core Tables

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'job_seeker' CHECK (role IN ('job_seeker', 'employer', 'admin', 'super_admin')),
  bio TEXT,
  location TEXT,
  years_of_experience INTEGER,
  skills TEXT[], -- array of skill tags
  resume_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  twitter_url TEXT,
  is_email_verified BOOLEAN DEFAULT FALSE,
  is_profile_public BOOLEAN DEFAULT FALSE,
  preferred_job_type TEXT,
  preferred_locations TEXT[],
  expected_salary_min INTEGER,
  expected_salary_max INTEGER,
  open_to_remote BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  website TEXT,
  description TEXT,
  industry TEXT,
  company_size TEXT CHECK (company_size IN ('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')),
  founded_year INTEGER,
  headquarters TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES public.profiles(id),
  gst_number TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Company Members (team access)
CREATE TABLE public.company_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  invited_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, user_id)
);

-- Jobs
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  posted_by UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  job_type TEXT NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'contract', 'freelance', 'internship')),
  experience_level TEXT NOT NULL CHECK (experience_level IN ('fresher', 'junior', 'mid', 'senior', 'lead', 'staff')),
  location TEXT NOT NULL,
  is_remote BOOLEAN DEFAULT FALSE,
  is_hybrid BOOLEAN DEFAULT FALSE,
  salary_min INTEGER, -- in LPA (Lakhs Per Annum)
  salary_max INTEGER,
  salary_visible BOOLEAN DEFAULT TRUE,
  skills TEXT[] NOT NULL,
  benefits TEXT[],
  apply_url TEXT, -- external application URL (null = apply on platform)
  application_deadline TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'active', 'paused', 'expired', 'rejected', 'closed')),
  rejection_reason TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_manually_added BOOLEAN DEFAULT FALSE,
  source_url TEXT, -- for manually added jobs
  source_platform TEXT,
  admin_notes TEXT, -- internal notes
  view_count INTEGER DEFAULT 0,
  application_count INTEGER DEFAULT 0,
  bookmark_count INTEGER DEFAULT 0,
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'viewed', 'shortlisted', 'interview', 'offered', 'rejected', 'withdrawn')),
  status_updated_at TIMESTAMPTZ DEFAULT NOW(),
  employer_notes TEXT, -- internal notes by employer
  user_notes TEXT, -- personal notes by applicant
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, user_id) -- prevent duplicate applications
);

-- Bookmarks
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- Job Alerts
CREATE TABLE public.job_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  keywords TEXT,
  locations TEXT[],
  experience_levels TEXT[],
  job_types TEXT[],
  skills TEXT[],
  salary_min INTEGER,
  salary_max INTEGER,
  frequency TEXT NOT NULL DEFAULT 'daily' CHECK (frequency IN ('instant', 'daily', 'weekly')),
  is_active BOOLEAN DEFAULT TRUE,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'application_status', 'new_job_match', 'job_approved', 'job_rejected', etc.
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Activity Log
CREATE TABLE public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL, -- 'approve_job', 'reject_job', 'verify_employer', 'ban_user', etc.
  target_type TEXT, -- 'job', 'user', 'company'
  target_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 8.2 Indexes

```sql
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_company ON public.jobs(company_id);
CREATE INDEX idx_jobs_location ON public.jobs(location);
CREATE INDEX idx_jobs_experience ON public.jobs(experience_level);
CREATE INDEX idx_jobs_type ON public.jobs(job_type);
CREATE INDEX idx_jobs_skills ON public.jobs USING GIN(skills);
CREATE INDEX idx_jobs_created ON public.jobs(created_at DESC);
CREATE INDEX idx_jobs_featured ON public.jobs(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_applications_user ON public.applications(user_id);
CREATE INDEX idx_applications_job ON public.applications(job_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_bookmarks_user ON public.bookmarks(user_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_companies_verified ON public.companies(is_verified);

-- Full-text search index
CREATE INDEX idx_jobs_search ON public.jobs USING GIN(
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))
);
```

### 8.3 Row Level Security (RLS)

- **Profiles:** Users can read public profiles; users can update only their own profile
- **Jobs:** Anyone can read active jobs; employers can CRUD their own company's jobs; admins can CRUD all jobs
- **Applications:** Job seekers can read/create their own applications; employers can read applications for their jobs; admins can read all
- **Bookmarks:** Users can CRUD only their own bookmarks
- **Companies:** Anyone can read verified companies; company owners/admins can update their company
- **Notifications:** Users can read/update only their own notifications
- **Admin Logs:** Only admins can read

---

## 9. Pages & Routes

### 9.1 Public Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section, featured jobs, search bar, value proposition, stats |
| `/jobs` | Job Listings | Browsable, filterable list of all active curated jobs |
| `/jobs/[slug]` | Job Detail | Full job description, company info, apply button, related jobs |
| `/companies` | Company Directory | Browse verified companies hiring on the platform |
| `/companies/[slug]` | Company Profile | Company details, active listings, reviews |
| `/about` | About Us | Platform mission, team, story |
| `/contact` | Contact | Contact form, support email |
| `/terms` | Terms of Service | Legal terms |
| `/privacy` | Privacy Policy | Data handling policies |
| `/faq` | FAQ | Frequently asked questions |
| `/blog` | Blog (future) | Career tips, industry insights |

### 9.2 Authentication Pages

| Route | Page | Description |
|---|---|---|
| `/login` | Login | Email/password + OAuth login |
| `/register` | Register | Sign up with role selection |
| `/forgot-password` | Forgot Password | Password reset request |
| `/reset-password` | Reset Password | Set new password (via token) |
| `/verify-email` | Email Verification | Confirm email address |

### 9.3 Job Seeker Pages (Protected)

| Route | Page | Description |
|---|---|---|
| `/dashboard` | Seeker Dashboard | Overview: recent applications, saved jobs, alerts, profile completeness |
| `/dashboard/applications` | My Applications | All applications with status tracking |
| `/dashboard/bookmarks` | Saved Jobs | Bookmarked job listings |
| `/dashboard/alerts` | Job Alerts | Manage job alert preferences |
| `/dashboard/profile` | Edit Profile | Update personal and professional info |
| `/dashboard/settings` | Account Settings | Password change, linked accounts, notifications, delete account |

### 9.4 Employer Pages (Protected)

| Route | Page | Description |
|---|---|---|
| `/employer/dashboard` | Employer Dashboard | Overview metrics, recent applications, active jobs |
| `/employer/jobs` | Manage Jobs | List of all posted jobs with status |
| `/employer/jobs/new` | Post New Job | Job posting form |
| `/employer/jobs/[id]/edit` | Edit Job | Modify existing listing |
| `/employer/jobs/[id]/applicants` | View Applicants | Applicants for a specific job |
| `/employer/company` | Company Profile | Edit company information |
| `/employer/team` | Team Management | Invite/manage team members |
| `/employer/settings` | Employer Settings | Account and billing settings |

### 9.5 Admin Pages (Protected)

| Route | Page | Description |
|---|---|---|
| `/admin` | Admin Dashboard | Platform-wide metrics and quick actions |
| `/admin/jobs` | Job Management | All jobs with filters and bulk actions |
| `/admin/jobs/queue` | Curation Queue | Pending jobs awaiting review |
| `/admin/jobs/queue/[id]` | Review Job | Detailed review interface for a single job |
| `/admin/jobs/new` | Add Job Manually | Admin form to add externally sourced jobs |
| `/admin/users` | User Management | All users with search, filter, and actions |
| `/admin/users/[id]` | User Detail | Detailed user view with activity history |
| `/admin/companies` | Company Management | All companies with verification status |
| `/admin/companies/[id]` | Company Detail | Company review and verification |
| `/admin/analytics` | Analytics | Detailed platform analytics and reports |
| `/admin/content` | Content Management | Manage static pages, tags, categories |
| `/admin/settings` | System Settings | Platform configuration |
| `/admin/logs` | Activity Logs | Admin action audit trail |

---

## 10. SEO & Marketing

### 10.1 Technical SEO

- **Server-Side Rendering (SSR):** All public pages rendered server-side for optimal crawlability
- **Static Generation (SSG):** Company profiles and blog posts statically generated with ISR (Incremental Static Regeneration)
- **Meta Tags:** Dynamic `<title>`, `<meta description>`, Open Graph, and Twitter Card tags for every page
- **Structured Data:** JSON-LD schema markup for:
  - `JobPosting` schema on job detail pages
  - `Organization` schema on company pages
  - `BreadcrumbList` for navigation
  - `WebSite` with `SearchAction` for sitelinks search
- **Sitemap:** Auto-generated `sitemap.xml` with all public pages, job listings, and company profiles
- **Robots.txt:** Properly configured to allow crawling of public pages, block admin/dashboard routes
- **Canonical URLs:** Prevent duplicate content issues
- **Performance:** Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### 10.2 Content SEO

- **Job Listing URLs:** SEO-friendly slugs (e.g., `/jobs/senior-react-developer-bangalore-company-name`)
- **Company URLs:** Clean slugs (e.g., `/companies/razorpay`)
- **Location Pages:** `/jobs?location=bangalore` with unique meta descriptions per city
- **Skill Pages:** `/jobs?skills=react` with targeted content for each technology
- **Blog Content:** Career advice, salary guides, interview tips, technology trends (future phase)

### 10.3 Marketing Channels

- **Organic Search:** Primary acquisition channel via SEO
- **Social Media:** Twitter/X (developer community), LinkedIn (professional network), Reddit (r/developersIndia)
- **Developer Communities:** Dev.to, Hashnode, Discord servers, Telegram groups
- **Email Marketing:** Weekly job digest newsletter, new feature announcements
- **Partnerships:** Coding bootcamps, developer communities, tech meetup groups
- **Content Marketing:** Salary reports, hiring trends, developer surveys
- **Referral Program:** Users earn credits for referring other users (future phase)

### 10.4 Analytics & Tracking

- Google Analytics 4 for user behavior tracking
- Vercel Analytics for performance monitoring
- Custom event tracking: job views, applications, searches, filter usage
- UTM parameter support for campaign tracking
- Conversion funnel tracking: visit → search → view job → apply

---

## 11. Monetization

### 11.1 Free Tier (Job Seekers)

- All job seeker features are free forever
- Browse, search, filter, apply, bookmark, alerts, profile, application tracker
- Maximum 5 active job alerts

### 11.2 Free Tier (Employers)

- Post up to 2 active job listings per month
- Basic applicant management
- Company profile

### 11.3 Premium Employer Plans

| Feature | Starter (₹2,999/mo) | Growth (₹7,999/mo) | Enterprise (Custom) |
|---|---|---|---|
| Active job listings | 5 | 20 | Unlimited |
| Featured listings | 1/month | 5/month | Unlimited |
| Applicant exports | ✅ | ✅ | ✅ |
| Priority curation | ❌ | ✅ | ✅ |
| Analytics dashboard | Basic | Advanced | Custom |
| Team members | 2 | 5 | Unlimited |
| Dedicated support | ❌ | Email | Dedicated manager |
| API access | ❌ | ❌ | ✅ |

### 11.4 Additional Revenue Streams (Future)

- **Featured Job Listings:** One-time fee (₹999–₹2,999) to promote a single listing
- **Company Spotlight:** Premium company profile placement on homepage
- **Resume Database Access:** Employers pay to search and contact candidates directly
- **Job Slot Packs:** Buy bundles of job posting credits at a discount
- **Sponsored Content:** Sponsored blog posts and newsletter placements

---

## 12. MVP vs Future Phases

### 12.1 MVP (Phase 1) — Weeks 1–8

**Goal:** Launch a functional curated job portal with core features.

- [x] Public job listings page with filters and search
- [x] Job detail pages with full descriptions
- [x] Company directory and profiles
- [x] User authentication (email/password + Google OAuth)
- [x] Job seeker profile and resume upload
- [x] Bookmark jobs
- [x] Apply to jobs (on-platform + external redirect)
- [x] Employer registration and job posting
- [x] Admin curation queue (approve/reject jobs)
- [x] Admin dashboard with basic metrics
- [x] Manual job addition by admin
- [x] Email verification
- [x] Basic SEO (meta tags, sitemap, structured data)
- [x] Mobile-responsive design
- [x] Deployment on Vercel + Supabase

### 12.2 Phase 2 — Weeks 9–16

**Goal:** Enhance engagement and employer experience.

- [ ] GitHub OAuth integration
- [ ] Application status tracking (full pipeline)
- [ ] Job alerts with email notifications
- [ ] Employer applicant management (shortlist, reject, notes)
- [ ] Employer analytics dashboard
- [ ] Admin user management
- [ ] Admin employer verification workflow
- [ ] Advanced search with autocomplete
- [ ] Email notifications (application updates, job alerts)
- [ ] Profile completeness indicator
- [ ] Related jobs recommendations

### 12.3 Phase 3 — Weeks 17–24

**Goal:** Monetization and growth features.

- [ ] Premium employer plans (Razorpay integration)
- [ ] Featured job listings
- [ ] Team management for employers
- [ ] Admin analytics (detailed reports, exports)
- [ ] Blog/content section
- [ ] Newsletter with weekly job digest
- [ ] Public developer profiles
- [ ] Company reviews (basic)
- [ ] PWA support (installable on mobile)

### 12.4 Phase 4 — Weeks 25+

**Goal:** Scale and differentiate.

- [ ] Resume database for employers
- [ ] AI-powered job recommendations
- [ ] Salary insights and benchmarking tool
- [ ] Interview preparation resources
- [ ] Skill assessments / coding challenges
- [ ] Referral program
- [ ] API for third-party integrations
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Hindi, regional languages)
- [ ] Slack/Discord bot for job alerts

---

## 13. Non-Functional Requirements

### 13.1 Performance

- **Page Load Time:** < 2 seconds for initial load on 4G connection
- **Time to Interactive (TTI):** < 3 seconds
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **API Response Time:** < 200ms for 95th percentile
- **Search Response:** < 500ms for full-text search queries
- **Concurrent Users:** Support 10,000+ concurrent users

### 13.2 Scalability

- Serverless architecture (Vercel + Supabase) scales automatically
- Database connection pooling via Supabase
- CDN for static assets via Vercel Edge Network
- Image optimization via Next.js Image component
- Incremental Static Regeneration for frequently accessed pages

### 13.3 Security

- HTTPS everywhere (enforced by Vercel)
- Row Level Security (RLS) on all database tables
- Input sanitization and validation (Zod schemas)
- CSRF protection via SameSite cookies
- XSS prevention via React's built-in escaping + Content Security Policy
- Rate limiting on authentication and API endpoints
- SQL injection prevention via parameterized queries (Supabase client)
- File upload validation (type, size, content)
- Regular dependency audits (`npm audit`)
- GDPR-compliant data handling (delete account, export data)

### 13.4 Reliability

- **Uptime Target:** 99.9% availability
- **Error Monitoring:** Sentry for real-time error tracking
- **Database Backups:** Supabase automatic daily backups with point-in-time recovery
- **Graceful Degradation:** Fallback UI for failed API calls
- **Health Checks:** Automated monitoring for critical endpoints

### 13.5 Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML throughout
- Keyboard navigation support
- Screen reader compatibility (ARIA labels, roles)
- Color contrast ratios meeting AA standards
- Focus indicators on interactive elements
- Alt text for all images
- Responsive design (320px to 2560px)

### 13.6 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 15+)
- Chrome for Android (last 2 versions)

### 13.7 Code Quality

- TypeScript strict mode enabled
- ESLint with recommended rules
- Prettier for code formatting
- Husky pre-commit hooks for linting
- Unit tests for critical business logic (Jest + React Testing Library)
- E2E tests for critical user flows (Playwright)
- Code review required for all PRs
- Conventional commits for version history

---

## 14. KPIs & Success Metrics

### 14.1 User Acquisition

| Metric | Target (Month 1) | Target (Month 3) | Target (Month 6) |
|---|---|---|---|
| Registered job seekers | 500 | 3,000 | 15,000 |
| Registered employers | 20 | 100 | 500 |
| Monthly active users (MAU) | 1,000 | 5,000 | 25,000 |
| Organic traffic (monthly) | 5,000 | 25,000 | 100,000 |

### 14.2 Engagement

| Metric | Target |
|---|---|
| Average session duration | > 3 minutes |
| Pages per session | > 4 |
| Job detail page view rate | > 40% of visitors |
| Application rate (views → apply) | > 8% |
| Bookmark rate | > 15% of logged-in users |
| Return visitor rate | > 30% |
| Job alert subscription rate | > 10% of registered users |

### 14.3 Content Quality

| Metric | Target |
|---|---|
| Curation approval rate | 60–80% |
| Average curation review time | < 4 hours |
| Active job listings | 50+ at any time |
| Jobs with salary info | > 80% |
| Verified employers | > 70% of active employers |
| Zero spam listings | 100% (goal) |

### 14.4 Employer Success

| Metric | Target |
|---|---|
| Average applications per job | > 15 |
| Employer satisfaction (NPS) | > 40 |
| Employer retention (monthly) | > 70% |
| Time to first applicant | < 48 hours |
| Job fill rate | > 20% |

### 14.5 Technical Performance

| Metric | Target |
|---|---|
| Page load time (p50) | < 1.5 seconds |
| API response time (p95) | < 200ms |
| Uptime | > 99.9% |
| Error rate | < 0.1% |
| Lighthouse score | > 90 (all categories) |

### 14.6 Revenue (Post-Monetization)

| Metric | Target (Month 6) | Target (Month 12) |
|---|---|---|
| Monthly Recurring Revenue (MRR) | ₹50,000 | ₹3,00,000 |
| Paying employers | 10 | 50 |
| Average Revenue Per Employer | ₹5,000/mo | ₹6,000/mo |
| Featured listing revenue | ₹10,000/mo | ₹50,000/mo |

---

## Appendix

### A. Glossary

- **LPA:** Lakhs Per Annum (Indian salary unit; 1 Lakh = ₹1,00,000)
- **RLS:** Row Level Security (Supabase/PostgreSQL feature)
- **ISR:** Incremental Static Regeneration (Next.js feature)
- **SSR:** Server-Side Rendering
- **SSG:** Static Site Generation
- **RBAC:** Role-Based Access Control
- **JWT:** JSON Web Token
- **OAuth:** Open Authorization protocol

### B. References

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Vercel Documentation](https://vercel.com/docs)

---

*This document is a living specification and will be updated as the product evolves.*
