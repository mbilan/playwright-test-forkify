import { step } from '../../decorators/step';
import { PageHolder } from './abstractClasses';

export class Headers extends PageHolder {
  private addRecipeEl = this.page.locator('.nav__btn--add-recipe');
  private bookmarks = this.page.locator('.nav__btn--bookmarks');

  @step
  async navigateToAddRecipe() {
    await this.addRecipeEl.click();
  }

  @step
  async openBookmarksList() {
    await this.bookmarks.click();
  }
}
