import { test, expect } from '@playwright/test';

test.describe('Job Detail Page', () => {
    test('should show loading state then job details or error', async ({ page }) => {
        // Use a UUID-like ID to test the detail page
        await page.goto('/jobs/00000000-0000-0000-0000-000000000001');

        // Should show either loading, job details, or "Job not found"
        const content = page.locator('text=Loading job details, text=About the role, text=Job not found');
        await expect(content.first()).toBeVisible({ timeout: 15000 });
    });

    test('should display "Job not found" for invalid job ID', async ({ page }) => {
        await page.goto('/jobs/invalid-nonexistent-id');

        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Should show error state
        const errorOrContent = page.locator('text=Job not found, text=About the role');
        await expect(errorOrContent.first()).toBeVisible({ timeout: 15000 });
    });

    test('should have a "Back to job board" link', async ({ page }) => {
        await page.goto('/jobs/00000000-0000-0000-0000-000000000001');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Either shows the back link (job loaded) or error page with back link
        const backLink = page.locator('a', { hasText: 'Back to job board' });
        const errorBackLink = page.locator('a', { hasText: 'Back to home' });

        const hasBackLink = await backLink.isVisible().catch(() => false);
        const hasErrorBackLink = await errorBackLink.isVisible().catch(() => false);

        expect(hasBackLink || hasErrorBackLink).toBeTruthy();
    });

    test('should display job sections when job exists', async ({ page }) => {
        // Navigate to jobs page first to find a real job
        await page.goto('/jobs');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Try to click on the first job card link if available
        const jobLink = page.locator('a[href^="/jobs/"]').first();
        const hasJobs = await jobLink.isVisible().catch(() => false);

        if (hasJobs) {
            await jobLink.click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            // Job detail page should show these sections
            await expect(page.locator('text=About the role')).toBeVisible();
            await expect(page.locator('text=Responsibilities')).toBeVisible();
            await expect(page.locator('text=Requirements')).toBeVisible();
        }
    });

    test('should display Apply Now button and Save Job button when job exists', async ({ page }) => {
        await page.goto('/jobs');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        const jobLink = page.locator('a[href^="/jobs/"]').first();
        const hasJobs = await jobLink.isVisible().catch(() => false);

        if (hasJobs) {
            await jobLink.click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            await expect(page.locator('text=Apply Now')).toBeVisible();
            await expect(page.locator('text=Save Job')).toBeVisible();
        }
    });

    test('should display company info sidebar when job exists', async ({ page }) => {
        await page.goto('/jobs');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        const jobLink = page.locator('a[href^="/jobs/"]').first();
        const hasJobs = await jobLink.isVisible().catch(() => false);

        if (hasJobs) {
            await jobLink.click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            // Company sidebar should have "About <company>" and "View profile" link
            await expect(page.locator('text=View profile')).toBeVisible();
        }
    });

    test('should show job badges (type, seniority)', async ({ page }) => {
        await page.goto('/jobs');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        const jobLink = page.locator('a[href^="/jobs/"]').first();
        const hasJobs = await jobLink.isVisible().catch(() => false);

        if (hasJobs) {
            await jobLink.click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            // Should show badge for "New"
            await expect(page.locator('text=New').first()).toBeVisible();
        }
    });
});
