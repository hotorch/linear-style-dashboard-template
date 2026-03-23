import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly path = '/dashboard/overview';

  constructor(page: Page) {
    super(page);
  }

  get statsCards(): Locator {
    return this.page.locator('[data-slot="card"]');
  }

  get sidebarTrigger(): Locator {
    return this.page.getByRole('button', { name: /toggle sidebar/i });
  }

  async navigateToProduct(): Promise<void> {
    await this.page.getByRole('link', { name: 'Product' }).click();
    await this.page.waitForURL('**/dashboard/product');
  }

  async navigateToKanban(): Promise<void> {
    await this.page.getByRole('link', { name: 'Kanban' }).click();
    await this.page.waitForURL('**/dashboard/kanban');
  }
}
