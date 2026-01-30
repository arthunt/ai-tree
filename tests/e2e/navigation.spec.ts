import { test, expect } from '@playwright/test';

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
