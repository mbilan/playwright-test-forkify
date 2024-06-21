import { Locator, Page, ViewportSize } from '@playwright/test';

export abstract class PageHolder {
  constructor(protected page: Page) {}
}

export abstract class AppPage extends PageHolder {
  waitUntilHidden(locator: Locator) {
    locator.waitFor({ state: 'hidden' });
  }

  extractIdFromUrl(): string {
    return this.page.url().split('#')[1];
  }
}
