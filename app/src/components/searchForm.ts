import { step } from '../../decorators/step';
import { PageHolder } from './abstractClasses';

export class SearchForm extends PageHolder {
  private searchButton = this.page.locator('.search__btn');
  private input = this.page.locator('.search__field');

  @step
  async searchRecipes(query: string) {
    await this.input.fill(query);
    await this.searchButton.click();
  }
}
