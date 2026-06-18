import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display the navbar with logo and links', async ({ page }) => {
        // Logo / brand name
        await expect(page.locator('text=FrontHire')).toBeVisible();

        // Desktop nav links
        const findJobsLink = page.locator('nav a[href="/jobs"]');
        await expect(findJobsLink).toBeVisible();

        const companiesLink = page.locator('nav a[href="/companies"]');
        await expect(companiesLink).toBeVisible();
    });

    test('should navigate to Find Jobs page', async ({ page }) => {
        await page.locator('nav a[href="/jobs"]').click();
        await page.waitForURL('**/jobs**');
        await expect(page).toHaveURL(/\/jobs/);
        await expect(page.locator('h1', { hasText: 'All Frontend Jobs' })).toBeVisible();
    });

    test('should navigate to Companies page', async ({ page }) => {
        await page.locator('nav a[href="/companies"]').click();
        await page.waitForURL('**/companies**');
        await expect(page).toHaveURL(/\/companies/);
        await expect(page.locator('h1', { hasText: 'Top Companies Hiring' })).toBeVisible();
    });

    test('should show Log In link when not authenticated', async ({ page }) => {
        const loginLink = page.locator('nav a[href="/login"]');
        await expect(loginLink).toBeVisible();
    });

    test('should show Post a Job link in navbar', async ({ page }) => {
        const postJobLink = page.locator('nav a[href="/post-job"]');
        await expect(postJobLink).toBeVisible();
    });

    test('should navigate to Login page', async ({ page }) => {
        await page.locator('nav a[href="/login"]').click();
        await page.waitForURL('**/login**');
        await expect(page).toHaveURL(/\/login/);
        await expect(page.locator('h1', { hasText: 'Join the community.' })).toBeVisible();
    });

    test('should navigate back to home via logo', async ({ page }) => {
        // Navigate away first
        await page.goto('/jobs');
        await page.waitForLoadState('networkidle');

        // Click logo to go home
        await page.locator('nav a[href="/"]').click();
        await page.waitForURL('/');
        await expect(page).toHaveURL('/');
    });
});

test.describe('Navigation - Mobile', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('should show mobile menu toggle on small screens', async ({ page }) => {
        await page.goto('/');

        // Mobile menu button should be visible
        const menuButton = page.locator('button.md\\:hidden');
        await expect(menuButton).toBeVisible();
    });

    test('should open and close mobile menu', async ({ page }) => {
        await page.goto('/');

        // Open mobile menu
        const menuButton = page.locator('button.md\\:hidden');
        await menuButton.click();

        // Mobile menu links should be visible
        await expect(page.locator('text=Find Jobs').first()).toBeVisible();
        await expect(page.locator('text=Companies').first()).toBeVisible();

        // Close mobile menu
        await menuButton.click();
    });
});
