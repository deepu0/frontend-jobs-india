# Task Assignment Plan - Frontend Jobs India

---

## 🚀 Phase 1: Critical Fixes (IMMEDIATE)

### Task 1.1: Fix Critical Import Error
**Assignee:** Frontend Agent (Quick Fix)
**Priority:** 🔴 CRITICAL
**Est. Time:** 5 mins

**Issue:** `post-job/page.tsx` uses `<Link>` without importing it

**Action:**
1. Add `import Link from 'next/link'` at top of file
2. Commit with message: `fix: add missing Link import in post-job`

---

### Task 1.2: Create Auth Middleware
**Assignee:** Frontend Agent (Next.js Expert)
**Priority:** 🔴 CRITICAL
**Est. Time:** 30 mins

**File:** `src/middleware.ts` (at root)

**Requirements:**
- Protect `/post-job`, `/dashboard` routes
- Redirect unauthenticated users to `/login`
- Allow public access to `/`, `/jobs`, `/companies`, `/login`
- Use Supabase auth session

**Action:**
1. Create middleware.ts
2. Test all protected routes
3. Commit: `feat: add auth middleware for protected routes`

---

### Task 1.3: Create Jobs List Page
**Assignee:** Frontend Agent
**Priority:** 🔴 CRITICAL
**Est. Time:** 45 mins

**File:** `src/app/jobs/page.tsx`

**Requirements:**
- Display all jobs (similar to homepage but full page)
- Add pagination
- Keep FilterBar at top
- Responsive grid/list view
- Link to individual job pages

**Action:**
1. Create page.tsx
2. Use useJobs hook
3. Add pagination
4. Commit: `feat: add jobs listing page`

---

### Task 1.4: Create Companies List Page
**Assignee:** Frontend Agent
**Priority:** 🔴 CRITICAL
**Est. Time:** 45 mins

**File:** `src/app/companies/page.tsx`

**Requirements:**
- Display all companies in grid
- Company card with logo, name, tagline, job count
- Link to company detail page
- Search/filter companies

**Action:**
1. Create page.tsx
2. Fetch companies from Supabase
3. Create CompanyCard component
4. Commit: `feat: add companies listing page`

---

### Task 1.5: Create Dashboard Page
**Assignee:** Frontend Agent
**Priority:** 🔴 CRITICAL
**Est. Time:** 1 hour

**File:** `src/app/dashboard/page.tsx`

**Requirements:**
- Protected page (requires auth)
- Show user's posted jobs
- Show company profile (if any)
- Edit/delete job functionality
- Analytics (views on jobs)

**Sections:**
1. Welcome header with user email
2. "My Jobs" - List of jobs posted by user
3. "Company Profile" - Edit company details
4. "Post New Job" CTA button

**Action:**
1. Create page.tsx
2. Add RLS-protected queries
3. Add job management actions
4. Commit: `feat: add user dashboard`

---

### Task 1.6: Make FilterBar Functional
**Assignee:** Frontend Agent + Supabase Expert
**Priority:** 🔴 CRITICAL
**Est. Time:** 1.5 hours

**Files:**
- `src/components/jobs/FilterBar.tsx`
- `src/hooks/useJobs.ts` (modify)

**Requirements:**
- Connect filters to actual job query
- Update URL with query params for shareable filters
- Filters to implement:
  - Search (text input for title/company)
  - Location (Remote, Bangalore, Mumbai, Delhi, etc.)
  - Salary range (₹5L+, ₹10L+, ₹15L+, ₹25L+, ₹35L+)
  - Job type (Full-time, Contract, etc.)
  - Seniority (Junior, Mid, Senior, Lead)
  - Tags (React, Vue, Angular, etc.)

**Action:**
1. Update FilterBar to manage filter state
2. Modify useJobs to accept filter params
3. Update Supabase query with filters
4. Commit: `feat: implement functional job filters`

---

## 📋 Phase 2: Core Features

### Task 2.1: Forgot Password Flow
**Assignee:** Frontend Agent
**Priority:** 🟡 MEDIUM
**Est. Time:** 45 mins

**Files:**
- `src/app/forgot-password/page.tsx` (new)
- `src/app/reset-password/page.tsx` (new)
- Modify `src/app/login/page.tsx`

**Requirements:**
- Forgot password page with email input
- Reset password page with token handling
- Update login page "Forgot password?" link

**Action:**
1. Create forgot-password page
2. Create reset-password page
3. Update login page link
4. Commit: `feat: add password reset flow`

---

### Task 2.2: Implement Search
**Assignee:** Frontend Agent
**Priority:** 🟡 MEDIUM
**Est. Time:** 30 mins

**File:** `src/components/home/Hero.tsx` (modify)

**Requirements:**
- Search input in Hero section
- Search across job titles and company names
- Redirect to `/jobs?search=query`
- Debounce input for performance

**Action:**
1. Modify Hero search input
2. Add onSubmit handler
3. Navigate to jobs page with query param
4. Commit: `feat: add job search functionality`

---

### Task 2.3: Fix Salary Filters (USD → INR)
**Assignee:** Frontend Agent
**Priority:** 🟡 MEDIUM
**Est. Time:** 15 mins

**File:** `src/components/jobs/FilterBar.tsx`

**Requirements:**
- Change dropdown options from `$50k+` to `₹5L+`, `₹10L+`, `₹15L+`, `₹25L+`, `₹35L+`
- Update filter logic to work with INR ranges

**Action:**
1. Update FilterDropdown options
2. Commit: `fix: change salary filter to INR format`

---

### Task 2.4: Add Pagination
**Assignee:** Frontend Agent + Supabase Expert
**Priority:** 🟡 MEDIUM
**Est. Time:** 1 hour

**Files:**
- `src/hooks/useJobs.ts`
- `src/app/jobs/page.tsx`
- `src/components/jobs/Pagination.tsx` (new)

**Requirements:**
- Server-side pagination (not just client-side)
- 10 jobs per page
- Page numbers + Previous/Next
- URL sync (`?page=2`)
- Show total count

**Action:**
1. Create Pagination component
2. Update useJobs with pagination params
3. Modify jobs page
4. Commit: `feat: add server-side pagination`

---

### Task 2.5: Add Toast Notifications
**Assignee:** Frontend Agent
**Priority:** 🟡 MEDIUM
**Est. Time:** 30 mins

**Files:**
- Add toast library (sonner or react-hot-toast)
- Update `src/app/layout.tsx`
- Replace all `alert()` calls

**Requirements:**
- Success toasts for job posted, login success
- Error toasts for failed operations
- Loading toasts for long operations

**Action:**
1. Install sonner: `npm install sonner`
2. Add Toaster to layout
3. Replace alerts in post-job
4. Commit: `feat: add toast notifications`

---

## 🎨 Phase 3: Polish & Enhancements

### Task 3.1: Image Upload for Company Logos
**Assignee:** Supabase Expert + Frontend Agent
**Priority:** 🟢 NICE TO HAVE
**Est. Time:** 1.5 hours

**Files:**
- Supabase Storage setup
- `src/components/ui/ImageUpload.tsx` (new)
- Update post-job page

**Requirements:**
- Create Supabase Storage bucket "company-logos"
- Upload component with drag-drop
- Image preview
- Resize/compress before upload
- Store URL in database

**Action:**
1. Create storage bucket
2. Create RLS policies for uploads
3. Build ImageUpload component
4. Integrate in post-job
5. Commit: `feat: add company logo image upload`

---

### Task 3.2: SEO Optimization
**Assignee:** Frontend Agent
**Priority:** 🟢 NICE TO HAVE
**Est. Time:** 1 hour

**Files:**
- All page.tsx files
- Create `src/lib/seo.ts` helper

**Requirements:**
- Dynamic metadata for each job page
- Open Graph tags
- Twitter cards
- Structured data (JSON-LD) for job listings
- Sitemap generation

**Action:**
1. Create SEO helper functions
2. Update all page metadata
3. Add JSON-LD to job pages
4. Commit: `feat: add SEO optimization`

---

### Task 3.3: Form Validation with Zod
**Assignee:** Frontend Agent
**Priority:** 🟢 NICE TO HAVE
**Est. Time:** 1 hour

**Files:**
- `src/lib/validations.ts` (new)
- Update forms

**Requirements:**
- Install zod: `npm install zod`
- Create schemas for job posting, login, etc.
- Add form error display
- Client + server validation

**Action:**
1. Install zod
2. Create validation schemas
3. Update post-job form
4. Commit: `feat: add zod form validation`

---

### Task 3.4: Dark Mode Toggle
**Assignee:** Frontend Agent
**Priority:** 🟢 NICE TO HAVE
**Est. Time:** 30 mins

**Files:**
- `src/components/ui/ThemeToggle.tsx`
- `src/app/layout.tsx`
- `src/lib/theme-provider.tsx`

**Requirements:**
- next-themes integration
- Toggle button in navbar
- Persist preference

**Action:**
1. Install next-themes
2. Create theme provider
3. Add toggle to navbar
4. Commit: `feat: add dark mode toggle`

---

### Task 3.5: Admin Panel
**Assignee:** Full Stack Agent
**Priority:** 🟢 NICE TO HAVE
**Est. Time:** 2 hours

**Files:**
- `src/app/admin/page.tsx`
- `src/app/admin/jobs/page.tsx`
- `src/app/admin/users/page.tsx`

**Requirements:**
- Admin role check (is_admin flag in profiles)
- Dashboard with stats
- All jobs management (approve, edit, delete)
- All users view
- Company verification workflow

**Action:**
1. Add is_admin to profiles table
2. Create admin layout
3. Build admin pages
4. Commit: `feat: add admin panel`

---

## 📝 Task Assignment Summary

### Frontend Agent Tasks
- Task 1.1, 1.2, 1.3, 1.4, 1.5, 1.6
- Task 2.1, 2.2, 2.3, 2.4, 2.5
- Task 3.2, 3.3, 3.4, 3.5 (UI parts)

### Supabase Expert Tasks
- Task 1.6 (query optimization)
- Task 2.4 (pagination queries)
- Task 3.1 (storage setup)
- Task 3.5 (admin RLS policies)

### Full Stack Agent Tasks
- Task 3.5 (Admin Panel - complete)

---

## 🔄 Workflow Guidelines

1. **INFORM FIRST:** Before starting any task, message user with:
   - Task name
   - What will be changed
   - Estimated time

2. **COMMIT AFTER EACH TASK:**
   - Use conventional commit format
   - Clear, descriptive messages
   - Push to GitHub immediately

3. **VERIFY BEFORE MOVING:**
   - Test the fix/feature
   - Check no console errors
   - Verify responsive design

4. **ASK BEFORE:**
   - Deleting any files
   - Changing existing logic significantly
   - Adding new dependencies

---

## 📅 Suggested Execution Order

**Today (Immediate):**
1. Task 1.1 - Fix Link import
2. Task 1.2 - Auth middleware
3. Task 1.3 - Jobs list page
4. Task 1.4 - Companies list page

**This Week:**
5. Task 1.5 - Dashboard
6. Task 1.6 - Functional filters
7. Task 2.5 - Toast notifications

**Next Week:**
8. Remaining Phase 2 tasks
9. Phase 3 nice-to-haves
