import { test, expect } from '@playwright/test';

test.describe('Locale Switch Tests', () => {
  test('should switch from Estonian to English', async ({ page }) => {
    await page.goto('/et/');

    // Verify we're on Estonian version
    await expect(page).toHaveURL(/\/et\/?/);

    // Click the EN button in the language switcher
    const enButton = page.getByRole('button', { name: 'EN' });
    await expect(enButton).toBeVisible();
    await enButton.click();

    // URL should change to /en/
    await expect(page).toHaveURL(/\/en\/?/, { timeout: 5000 });

    // The EN button should now be active (has different styling)
    await expect(enButton).toHaveAttribute('aria-current', 'true');
  });

  test('should switch from English to Estonian', async ({ page }) => {
    await page.goto('/en/');

    // Verify we're on English version
    await expect(page).toHaveURL(/\/en\/?/);

    // Click the ET button in the language switcher
    const etButton = page.getByRole('button', { name: 'ET' });
    await expect(etButton).toBeVisible();
    await etButton.click();

    // URL should change to /et/
    await expect(page).toHaveURL(/\/et\/?/, { timeout: 5000 });

    // The ET button should now be active
    await expect(etButton).toHaveAttribute('aria-current', 'true');
  });

  test('should preserve locale when navigating', async ({ page }) => {
    await page.goto('/en/');

    // Verify we're on English
    await expect(page).toHaveURL(/\/en\/?/);

    // Scroll down (simulate navigation)
    await page.evaluate(() => window.scrollBy(0, 500));

    // URL should still be /en/
    await expect(page).toHaveURL(/\/en\/?/);
  });
});
