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
}
