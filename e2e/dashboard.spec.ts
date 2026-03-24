import { test, expect } from '@playwright/test';

test.describe('Dashboard Pages', () => {
  test('should load profile page', async ({ page }) => {
    await page.goto('/dashboard/profile');

    await expect(page.getByText('Profile')).toBeVisible();
  });

  test('should load workspaces page', async ({ page }) => {
    await page.goto('/dashboard/workspaces');

    await expect(page.getByText('Workspaces')).toBeVisible();
  });
});
