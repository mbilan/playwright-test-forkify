import { PageHolder } from './pageHolder';

export class SearchForm extends PageHolder {
  private searchButton = this.page.locator('.btn search__btn');
  private input = this.page.locator('.search__field');
}
