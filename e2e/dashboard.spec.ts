import { test, expect } from '@playwright/test';

test.describe('Dashboard Pages', () => {
  test('should load product listing page', async ({ page }) => {
    await page.goto('/dashboard/product');

    await expect(page.getByText('Products')).toBeVisible();
  });

  test('should load kanban board page', async ({ page }) => {
    await page.goto('/dashboard/kanban');

    await expect(page.getByText('Kanban')).toBeVisible();
  });

  test('should load profile page', async ({ page }) => {
    await page.goto('/dashboard/profile');

    await expect(page.getByText('Profile')).toBeVisible();
  });

  test('should load billing page', async ({ page }) => {
    await page.goto('/dashboard/billing');

    await expect(page.getByText('Billing')).toBeVisible();
  });

  test('should load workspaces page', async ({ page }) => {
    await page.goto('/dashboard/workspaces');

    await expect(page.getByText('Workspaces')).toBeVisible();
  });
});
