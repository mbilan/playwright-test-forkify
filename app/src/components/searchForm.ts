import { PageHolder } from './abstractClasses';

export class SearchForm extends PageHolder {
  private searchButton = this.page.locator('.search__btn');
  private input = this.page.locator('.search__field');

  async search(query: string) {
    await this.input.fill(query);
    await this.searchButton.click();
  }
}
