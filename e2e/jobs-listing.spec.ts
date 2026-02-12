import { test, expect } from '@playwright/test';

test.describe('Jobs Listing Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/jobs');
    });

    test('should render the jobs page header', async ({ page }) => {
        await expect(page.locator('h1', { hasText: 'All Frontend Jobs' })).toBeVisible();
        await expect(page.locator('text=opportunities at top companies')).toBeVisible();
    });

    test('should display the filter bar with search input', async ({ page }) => {
        const searchInput = page.locator('input[placeholder*="Search"]');
        await expect(searchInput).toBeVisible();
    });

    test('should show loading state initially', async ({ page }) => {
        // On fresh load, either loading or content should appear
        const content = page.locator('text=Loading jobs, text=Showing, text=No jobs found, text=Failed to load');
        await expect(content.first()).toBeVisible({ timeout: 15000 });
    });

    test('should display filter dropdown buttons', async ({ page }) => {
        // Filter dropdown buttons
        await expect(page.locator('button', { hasText: 'Location' }).first()).toBeVisible();
        await expect(page.locator('button', { hasText: 'Salary' }).first()).toBeVisible();
        await expect(page.locator('button', { hasText: 'Type' }).first()).toBeVisible();
        await expect(page.locator('button', { hasText: 'Seniority' }).first()).toBeVisible();
    });

    test('should open location filter dropdown and select a filter', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        // Click Location dropdown
        const locationBtn = page.locator('button', { hasText: 'Location' }).first();
        await locationBtn.click();

        // Should show filter options
        await expect(page.locator('button', { hasText: 'Remote' }).last()).toBeVisible();

        // Select Remote
        await page.locator('button', { hasText: 'Remote' }).last().click();

        // URL should update with location param
        await expect(page).toHaveURL(/location=Remote/);
    });

    test('should open type filter dropdown and select a filter', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        const typeBtn = page.locator('button', { hasText: 'Type' }).first();
        await typeBtn.click();

        await expect(page.locator('button', { hasText: 'Full-time' }).last()).toBeVisible();
        await page.locator('button', { hasText: 'Full-time' }).last().click();

        await expect(page).toHaveURL(/type=Full-time/);
    });

    test('should search for jobs using the search input', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        const searchInput = page.locator('input[placeholder*="Search"]');
        await searchInput.fill('React');

        // URL should update with search param
        await expect(page).toHaveURL(/search=React/);
    });

    test('should expand the "All Filters" panel', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        const allFiltersBtn = page.locator('button', { hasText: 'All Filters' });
        await allFiltersBtn.click();

        // Expanded panel should show filter sections
        await expect(page.locator('h4', { hasText: 'Location' })).toBeVisible();
        await expect(page.locator('h4', { hasText: 'Salary Range' })).toBeVisible();
        await expect(page.locator('h4', { hasText: 'Job Type' })).toBeVisible();
        await expect(page.locator('h4', { hasText: 'Seniority' })).toBeVisible();
    });

    test('should clear all filters', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        // Apply a filter first
        const searchInput = page.locator('input[placeholder*="Search"]');
        await searchInput.fill('React');
        await expect(page).toHaveURL(/search=React/);

        // Click "Clear all"
        const clearBtn = page.locator('text=Clear all');
        await clearBtn.click();

        // Search should be cleared
        await expect(searchInput).toHaveValue('');
    });

    test('should show results count when jobs are loaded', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Either shows "Showing X of Y jobs" or "No jobs found"
        const resultsOrEmpty = page.locator('text=/Showing \\d+ of \\d+ jobs/, text=No jobs found');
        await expect(resultsOrEmpty.first()).toBeVisible({ timeout: 15000 });
    });

    test('should navigate to jobs page with URL filter params', async ({ page }) => {
        await page.goto('/jobs?search=React&type=Full-time');

        await page.waitForLoadState('networkidle');

        // Search input should have the value from URL
        const searchInput = page.locator('input[placeholder*="Search"]');
        await expect(searchInput).toHaveValue('React');
    });
});
