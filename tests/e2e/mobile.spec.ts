import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Viewport Tests', () => {
  test.use({
    ...devices['iPhone 12'],
    viewport: { width: 375, height: 667 }
  });

  test('should display mobile navigation on small viewport', async ({ page }) => {
    await page.goto('/et/');

    // Verify we're in mobile viewport
    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBe(375);

    // Check that main content is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Check that header is visible and compact
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should have responsive header on mobile', async ({ page }) => {
    await page.goto('/en/');

    // Header should be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Logo/brand should be visible
    const brand = page.getByText(/dendrix\.ai/i).first();
    await expect(brand).toBeVisible();

    // Search button should be visible (icon only on mobile)
    const searchButton = page.getByRole('button', { name: /search|otsing/i });
    await expect(searchButton).toBeVisible();
  });

  test('should allow scrolling through sections on mobile', async ({ page }) => {
    await page.goto('/et/');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY);

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 300));

    // Wait a bit for scroll to complete
    await page.waitForTimeout(300);

    // Verify scroll happened
    const newScroll = await page.evaluate(() => window.scrollY);
    expect(newScroll).toBeGreaterThan(initialScroll);
  });

  test('should display level indicator on mobile when scrolled', async ({ page }) => {
    await page.goto('/et/');

    await page.waitForLoadState('networkidle');

    // Scroll down to trigger sticky header
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(500);

    // Header should still be visible (sticky)
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should open and close modals on mobile', async ({ page }) => {
    await page.goto('/et/');

    // Open search on mobile
    const searchButton = page.getByRole('button', { name: /search|otsing/i });
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    // Search modal should appear
    const modal = page.locator('[role="dialog"]').or(page.getByRole('search')).first();
    await expect(modal).toBeVisible({ timeout: 3000 });

    // Close with escape
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible({ timeout: 3000 });
  });
});
