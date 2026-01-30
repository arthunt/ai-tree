import { test, expect } from '@playwright/test';

test.describe('Homepage Smoke Tests', () => {
  test('should load homepage for Estonian locale', async ({ page }) => {
    await page.goto('/et/');

    // Check that the page loads
    await expect(page).toHaveURL(/\/et\/?/);

    // Check for main heading (dendrix.ai)
    await expect(page.getByRole('heading', { name: /dendrix\.ai/i })).toBeVisible();

    // Check that some content is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should load homepage for English locale', async ({ page }) => {
    await page.goto('/en/');

    // Check that the page loads
    await expect(page).toHaveURL(/\/en\/?/);

    // Check for main heading
    await expect(page.getByRole('heading', { name: /dendrix\.ai/i })).toBeVisible();

    // Check that some content is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should display navigation elements', async ({ page }) => {
    await page.goto('/et/');

    // Check for search button
    await expect(page.getByRole('button', { name: /otsing|search/i })).toBeVisible();

    // Check that language switcher is visible (look for ET/EN buttons)
    await expect(page.getByRole('button', { name: /ET/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /EN/i })).toBeVisible();
  });
});
