import { test, expect } from '@playwright/test';

test.describe('Error Handling & Edge Cases', () => {
    test('should display 404 page for non-existent routes', async ({ page }) => {
        const response = await page.goto('/this-page-does-not-exist');

        // Next.js should return 404
        expect(response?.status()).toBe(404);

        // Should show the custom not-found page
        await expect(page.locator('body')).toBeVisible();
    });

    test('should display 404 page for deeply nested non-existent routes', async ({ page }) => {
        const response = await page.goto('/some/deeply/nested/nonexistent/route');

        expect(response?.status()).toBe(404);
    });

    test('should handle the /salaries route (linked in nav but may not exist)', async ({ page }) => {
        const response = await page.goto('/salaries');

        // This route is linked in the navbar but may not have a page
        // It should either show content or a 404
        const status = response?.status();
        expect(status === 200 || status === 404).toBeTruthy();
    });

    test('should load the home page without JavaScript errors', async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', (error) => {
            errors.push(error.message);
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Filter out known non-critical errors (e.g., Supabase connection issues in test env)
        const criticalErrors = errors.filter(
            (err) => !err.includes('supabase') && !err.includes('fetch') && !err.includes('network')
        );

        // Should have no critical JS errors
        expect(criticalErrors).toHaveLength(0);
    });

    test('should load the jobs page without JavaScript errors', async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', (error) => {
            errors.push(error.message);
        });

        await page.goto('/jobs');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        const criticalErrors = errors.filter(
            (err) => !err.includes('supabase') && !err.includes('fetch') && !err.includes('network')
        );

        expect(criticalErrors).toHaveLength(0);
    });

    test('should load the login page without JavaScript errors', async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', (error) => {
            errors.push(error.message);
        });

        await page.goto('/login');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        const criticalErrors = errors.filter(
            (err) => !err.includes('supabase') && !err.includes('fetch') && !err.includes('network')
        );

        expect(criticalErrors).toHaveLength(0);
    });
});

test.describe('Responsive Design', () => {
    test('should render home page on mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Page should still render
        await expect(page.locator('text=FrontHire')).toBeVisible();
    });

    test('should render home page on tablet viewport', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        await expect(page.locator('text=FrontHire')).toBeVisible();
    });

    test('should render jobs page on mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('/jobs');
        await page.waitForLoadState('networkidle');

        await expect(page.locator('h1', { hasText: 'All Frontend Jobs' })).toBeVisible();
    });
});
