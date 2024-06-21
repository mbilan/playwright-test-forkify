import { PageHolder } from './pageHolder';

export class Pagination extends PageHolder {
  private previousPage = this.page.locator('.pagination__btn--prev');
  private nextPage = this.page.locator('.pagination__btn--next');
}
