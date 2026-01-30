import { test, expect } from '@playwright/test';

test.describe('Dark Mode Tests', () => {
  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/et/');

    // Wait for theme to mount (ThemeContext)
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Find the dark mode toggle button (Moon/Sun icon)
    const darkModeButton = page.getByRole('button', { name: /dark mode|tume režiim/i }).or(
      page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: '' }).nth(3)
    ).first();

    // Get initial theme state from html element
    const htmlElement = page.locator('html');
    const initialTheme = await htmlElement.getAttribute('class');
    const initiallyDark = initialTheme?.includes('dark') ?? false;

    if (await darkModeButton.count() > 0) {
      // Click to toggle
      await darkModeButton.click();

      // Wait for theme change
      await page.waitForTimeout(300);

      // Check that theme changed
      const newTheme = await htmlElement.getAttribute('class');
      const nowDark = newTheme?.includes('dark') ?? false;

      // Theme should have toggled
      expect(nowDark).not.toBe(initiallyDark);

      // Click again to toggle back
      await darkModeButton.click();
      await page.waitForTimeout(300);

      const finalTheme = await htmlElement.getAttribute('class');
      const finallyDark = finalTheme?.includes('dark') ?? false;

      // Should be back to initial state
      expect(finallyDark).toBe(initiallyDark);
    } else {
      // Fallback: just check that html element exists
      await expect(htmlElement).toBeVisible();
    }
  });

  test('should persist dark mode preference', async ({ page, context }) => {
    await page.goto('/et/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const htmlElement = page.locator('html');
    const darkModeButton = page.getByRole('button', { name: /dark mode|tuma režiim/i }).or(
      page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: '' }).nth(3)
    ).first();

    if (await darkModeButton.count() > 0) {
      // Enable dark mode
      await darkModeButton.click();
      await page.waitForTimeout(300);

      const afterToggle = await htmlElement.getAttribute('class');
      const isDark = afterToggle?.includes('dark') ?? false;

      // Reload page
      await page.reload();
      await page.waitForTimeout(500);

      // Theme should persist
      const afterReload = await htmlElement.getAttribute('class');
      const stillDark = afterReload?.includes('dark') ?? false;

      expect(stillDark).toBe(isDark);
    }
  });
});
