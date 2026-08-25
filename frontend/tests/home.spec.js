import { test, expect } from '@playwright/test';

test('navigation and tests page loads', async ({ page }) => {
  await page.goto('/');
  // Nav link exists
  await expect(page.locator('#nav-home')).toBeVisible();
  // Navigate to Tests page
  await page.click('#nav-tests');
  await expect(page).toHaveURL(/\/tests/);
  // Tests page title
  await expect(page.locator('h1')).toHaveText(/Project Test & Debug/);
});
