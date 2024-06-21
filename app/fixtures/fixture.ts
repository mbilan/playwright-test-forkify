import { test as base } from '@playwright/test';
import { Application } from './../src/app';

export const test = base.extend<{ app: Application }>({
  app: async ({ page }, use) => {
    const app = new Application(page);
    await app.goToPage();
    await page.waitForLoadState();
    use(app);
  },
});
