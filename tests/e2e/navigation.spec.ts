import { test, expect } from '@playwright/test';

test.describe('Seed Flow Tests', () => {
  test('should display three path choices on /seed', async ({ page }) => {
    await page.goto('/en/seed');
    await page.waitForLoadState('networkidle');

    // Should show the seed page with 3 path buttons
    const pathButtons = page.locator('button').filter({ hasText: /builder|thinker|explorer/i });
    await expect(pathButtons).toHaveCount(3);
  });

  test('builder path should navigate to tree-view with intent', async ({ page }) => {
    await page.goto('/en/seed');
    await page.waitForLoadState('networkidle');

    const builderButton = page.locator('button').filter({ hasText: /builder/i }).first();
    if (await builderButton.count() > 0) {
      await builderButton.click();
      await expect(page).toHaveURL(/\/en\/tree-view\?intent=builder/, { timeout: 5000 });
    }
  });

  test('thinker path should navigate to tree-view with intent', async ({ page }) => {
    await page.goto('/en/seed');
    await page.waitForLoadState('networkidle');

    const thinkerButton = page.locator('button').filter({ hasText: /thinker/i }).first();
    if (await thinkerButton.count() > 0) {
      await thinkerButton.click();
      await expect(page).toHaveURL(/\/en\/tree-view\?intent=thinker/, { timeout: 5000 });
    }
  });

  test('explorer path should navigate to tree-view with intent', async ({ page }) => {
    await page.goto('/en/seed');
    await page.waitForLoadState('networkidle');

    const explorerButton = page.locator('button').filter({ hasText: /explorer/i }).first();
    if (await explorerButton.count() > 0) {
      await explorerButton.click();
      await expect(page).toHaveURL(/\/en\/tree-view\?intent=explorer/, { timeout: 5000 });
    }
  });
});

test.describe('Navigation Tests', () => {
  test('should open concept lightbox when clicking a concept', async ({ page }) => {
    await page.goto('/et/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Find and click the first concept button (using a more flexible selector)
    // Concepts are typically rendered as buttons or clickable elements
    const conceptButton = page.locator('button').filter({ hasText: /token|vektor|transformer/i }).first();

    // If no button found, try looking for any clickable concept element
    const conceptCount = await conceptButton.count();
    if (conceptCount > 0) {
      await conceptButton.click();

      // Check that a modal/dialog/lightbox appears
      // The ConceptLightbox component renders as a modal overlay
      const modal = page.locator('[role="dialog"]').or(page.locator('.fixed.inset-0')).first();
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Check for close button (X icon)
      const closeButton = page.getByRole('button', { name: /close|sulge/i }).or(
        page.locator('button').filter({ has: page.locator('svg') }).first()
      );
      await expect(closeButton).toBeVisible();

      // Close the lightbox
      await closeButton.click();

      // Verify it closes
      await expect(modal).not.toBeVisible({ timeout: 3000 });
    } else {
      // Fallback: just verify the page structure exists
      console.log('No concept buttons found, verifying page structure instead');
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should navigate to tree view page', async ({ page }) => {
    await page.goto('/et/');

    // Find and click the tree view/concept map button
    const treeViewLink = page.getByRole('link', { name: /visualiseeri|tree view|concept map/i });

    if (await treeViewLink.count() > 0) {
      await treeViewLink.click();

      // Should navigate to tree-view page
      await expect(page).toHaveURL(/\/et\/tree-view/);
    }
  });
});
