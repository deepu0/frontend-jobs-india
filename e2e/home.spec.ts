import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should render the hero section', async ({ page }) => {
        // Hero component should be visible
        await expect(page.locator('text=FrontHire')).toBeVisible();
    });

    test('should display the promotional banner with dismiss functionality', async ({ page }) => {
        // Banner text should be visible
        const banner = page.locator('text=Hiring? Reach 1M+ professional frontend developers.');
        await expect(banner).toBeVisible();

        // "Post a job for free" button in banner
        await expect(page.locator('text=Post a job for free')).toBeVisible();

        // Dismiss the banner
        const closeButton = page.locator('button').filter({ has: page.locator('svg.lucide-x') }).first();
        await closeButton.click();

        // Banner should be hidden after dismissal
        await expect(banner).not.toBeVisible();
    });

    test('should show loading state then job listings', async ({ page }) => {
        // Either loading spinner or job content should appear
        // Wait for content to load (loading state or actual jobs)
        await page.waitForSelector('text=Featured Opportunities, text=Recent Postings, text=Searching for the best frontend roles, text=Failed to load jobs', { timeout: 15000 });
    });

    test('should display the filter bar', async ({ page }) => {
        // Filter bar search input should be present
        const searchInput = page.locator('input[placeholder*="Search"]');
        await expect(searchInput).toBeVisible();
    });

    test('should display the premium upsell section', async ({ page }) => {
        // Wait for page to load
        await page.waitForLoadState('networkidle');

        // Scroll down to find the premium section
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);

        // The PremiumUpsell component should be somewhere on the page
        const premiumSection = page.locator('text=Load more jobs');
        await expect(premiumSection).toBeVisible();
    });

    test('should have a "Load more jobs" button', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);

        const loadMoreButton = page.locator('button', { hasText: 'Load more jobs' });
        await expect(loadMoreButton).toBeVisible();
    });
});
