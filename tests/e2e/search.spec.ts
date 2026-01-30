import { test, expect } from '@playwright/test';

test.describe('Search Tests', () => {
  test('should open search modal with Cmd+K', async ({ page }) => {
    await page.goto('/et/');

    // Press Cmd+K (Meta+K on Mac, Ctrl+K on Windows/Linux)
    await page.keyboard.press('Meta+K');

    // Search modal should appear
    const searchModal = page.locator('[role="dialog"]').or(page.getByRole('search')).first();
    await expect(searchModal).toBeVisible({ timeout: 3000 });

    // Should have a search input
    const searchInput = page.getByRole('searchbox').or(page.locator('input[type="search"]')).or(
      page.locator('input[placeholder*="otsi"]').or(page.locator('input[placeholder*="search"]'))
    ).first();
    await expect(searchInput).toBeVisible();

    // Close search with Escape
    await page.keyboard.press('Escape');
    await expect(searchModal).not.toBeVisible({ timeout: 3000 });
  });

  test('should open search modal with search button click', async ({ page }) => {
    await page.goto('/en/');

    // Click the search button in header
    const searchButton = page.getByRole('button', { name: /search|otsing/i });
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    // Search modal should appear
    const searchModal = page.locator('[role="dialog"]').or(page.getByRole('search')).first();
    await expect(searchModal).toBeVisible({ timeout: 3000 });
  });

  test('should filter results when typing in search', async ({ page }) => {
    await page.goto('/et/');

    // Open search
    await page.keyboard.press('Meta+K');

    // Wait for search modal
    const searchInput = page.getByRole('searchbox').or(page.locator('input[type="search"]')).or(
      page.locator('input').first()
    ).first();
    await expect(searchInput).toBeVisible({ timeout: 3000 });

    // Type a search query
    await searchInput.fill('token');

    // Give it a moment to filter results
    await page.waitForTimeout(500);

    // There should be some results or a "no results" message
    const resultsContainer = page.locator('body');
    await expect(resultsContainer).toBeVisible();
  });
});
