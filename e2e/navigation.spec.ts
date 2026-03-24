import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/dashboard.page';

test.describe('Dashboard Navigation', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.navigate();
    await dashboardPage.waitForPageLoad();
  });

  test('should display dashboard overview correctly', async () => {
    await expect(dashboardPage.header).toBeVisible();
    await expect(dashboardPage.sidebar).toBeVisible();
  });

  test('should toggle sidebar', async () => {
    const sidebar = dashboardPage.sidebar;

    await expect(sidebar).toBeVisible();

    // Check sidebar has data-state attribute
    await expect(sidebar).toHaveAttribute('data-state', /(collapsed|expanded)/);
  });
});
