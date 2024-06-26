import { PageHolder } from './abstractClasses';
import { expect, Locator } from '@playwright/test';

export class Pagination extends PageHolder {
  private paginationBlock = this.page.locator('.pagination');
  private previousPage = this.page.locator('.pagination__btn--prev');
  private nextPage = this.page.locator('.pagination__btn--next');

  async toBeVisible() {
    await expect(this.paginationBlock).toBeVisible();
  }

  async toBeNotVisible() {
    await expect(this.paginationBlock).not.toBeVisible();
  }

  async nextPageToBeVisible() {
    await expect(this.nextPage).toBeVisible();
  }

  async previousPageToBeVisible() {
    await expect(this.previousPage).toBeVisible();
  }

  async pageButtonToBeHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  async nextPageToBeHidden() {
    await this.pageButtonToBeHidden(this.nextPage);
  }

  async previousPageToBeHidden() {
    await this.pageButtonToBeHidden(this.previousPage);
  }

  async nextPageToHaveNumber(id: number) {
    await this.toHavePageNumber(this.nextPage, id);
  }

  async previousPageToHaveNumber(id: number) {
    await this.toHavePageNumber(this.previousPage, id);
  }

  private async toHavePageNumber(locator: Locator, id: number) {
    await expect(locator.locator('span')).toHaveText(`Page ${id}`);
  }

  async navigateToNextPage() {
    await this.nextPage.click();
  }

  async navigateToPreviousPage() {
    await this.previousPage.click();
  }
}
