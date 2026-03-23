import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract readonly path: string;

  async navigate(): Promise<void> {
    await this.page.goto(this.path);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  get header(): Locator {
    return this.page.locator('header');
  }

  get sidebar(): Locator {
    return this.page.locator('[data-sidebar]');
  }
}
