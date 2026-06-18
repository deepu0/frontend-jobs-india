import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
    test('should redirect unauthenticated users to login', async ({ page }) => {
        await page.goto('/dashboard');

        // Middleware should redirect to login
        await page.waitForURL('**/login**', { timeout: 10000 });
        await expect(page).toHaveURL(/\/login/);
    });

    test('should include redirect parameter when redirected from dashboard', async ({ page }) => {
        await page.goto('/dashboard');

        await page.waitForURL('**/login**', { timeout: 10000 });
        await expect(page).toHaveURL(/redirect=%2Fdashboard/);
    });

    test('should redirect from /admin to login when not authenticated', async ({ page }) => {
        await page.goto('/admin');

        // /admin is also a protected route
        await page.waitForURL('**/login**', { timeout: 10000 });
        await expect(page).toHaveURL(/\/login/);
    });
});
