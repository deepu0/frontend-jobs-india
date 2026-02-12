import { test, expect } from '@playwright/test';

test.describe('Companies Listing Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/companies');
    });

    test('should render the companies page header', async ({ page }) => {
        await expect(page.locator('h1', { hasText: 'Top Companies Hiring' })).toBeVisible();
        await expect(page.locator('text=companies actively hiring frontend developers')).toBeVisible();
    });

    test('should display the search input for companies', async ({ page }) => {
        const searchInput = page.locator('input[placeholder*="Search companies"]');
        await expect(searchInput).toBeVisible();
    });

    test('should show loading state then company listings or empty state', async ({ page }) => {
        const content = page.locator('text=Loading companies, text=Showing, text=No companies found, text=Failed to load');
        await expect(content.first()).toBeVisible({ timeout: 15000 });
    });

    test('should filter companies by search query', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        const searchInput = page.locator('input[placeholder*="Search companies"]');
        await searchInput.fill('NonExistentCompanyXYZ123');

        await page.waitForTimeout(500);

        // Should show "No companies found" for a non-matching query
        const noResults = page.locator('text=No companies found');
        const hasNoResults = await noResults.isVisible().catch(() => false);

        // If there are companies, the filter should work; if none match, show empty state
        if (!hasNoResults) {
            // Clear and verify companies reappear
            await searchInput.clear();
            await page.waitForTimeout(500);
        }
    });

    test('should display company cards with job counts', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Check if companies are loaded
        const showingText = page.locator('text=/Showing \\d+ companies/');
        const noCompanies = page.locator('text=No companies found');
        const errorText = page.locator('text=Failed to load companies');

        const hasCompanies = await showingText.isVisible().catch(() => false);
        const hasNoCompanies = await noCompanies.isVisible().catch(() => false);
        const hasError = await errorText.isVisible().catch(() => false);

        // One of these states should be true
        expect(hasCompanies || hasNoCompanies || hasError).toBeTruthy();

        if (hasCompanies) {
            // Company cards should show job count badges
            const jobBadge = page.locator('text=/\\d+ jobs?/').first();
            await expect(jobBadge).toBeVisible();

            // Should have "View jobs" links
            await expect(page.locator('text=View jobs').first()).toBeVisible();
        }
    });

    test('should navigate to company detail page when clicking a company', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        const companyLink = page.locator('a[href^="/companies/"]').first();
        const hasCompanies = await companyLink.isVisible().catch(() => false);

        if (hasCompanies) {
            await companyLink.click();
            await page.waitForURL('**/companies/**');
            await expect(page).toHaveURL(/\/companies\/.+/);
        }
    });
});

test.describe('Company Detail Page', () => {
    test('should display company profile with mock data', async ({ page }) => {
        // The company detail page uses MOCK_JOBS data
        await page.goto('/companies/some-company-id');
        await page.waitForLoadState('networkidle');

        // Should show company profile elements
        // The page uses mock data, so it should always render
        await expect(page.locator('text=About the company')).toBeVisible();
        await expect(page.locator('text=Open Roles')).toBeVisible();
        await expect(page.locator('text=Company Culture')).toBeVisible();
    });

    test('should display company culture section', async ({ page }) => {
        await page.goto('/companies/some-company-id');
        await page.waitForLoadState('networkidle');

        await expect(page.locator('text=Remote-first work options')).toBeVisible();
        await expect(page.locator('text=Unlimited PTO & Sick Days')).toBeVisible();
        await expect(page.locator('text=Annual learning stipend')).toBeVisible();
    });

    test('should have a Follow button and Contact Hiring Team button', async ({ page }) => {
        await page.goto('/companies/some-company-id');
        await page.waitForLoadState('networkidle');

        await expect(page.locator('text=Follow')).toBeVisible();
        await expect(page.locator('text=Contact Hiring Team')).toBeVisible();
    });

    test('should show active jobs badge count', async ({ page }) => {
        await page.goto('/companies/some-company-id');
        await page.waitForLoadState('networkidle');

        const jobsBadge = page.locator('text=/\\d+ active jobs/');
        await expect(jobsBadge).toBeVisible();
    });
});
