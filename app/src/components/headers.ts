import { PageHolder } from './abstractClasses';

export class Headers extends PageHolder {
  private addRecipeEl = this.page.locator('.nav__btn--add-recipe');
  private bookmarks = this.page.locator('.nav__btn--bookmarks');

  async navigateToAddRecipe() {
    await this.addRecipeEl.click();
  }

  async openBookmarksList() {
    await this.bookmarks.click();
  }
}
