import { PageHolder } from './pageHolder';

export class Headers extends PageHolder {
  private addRecipeEl = this.page.locator('.nav__btn--add-recipe');
  private bookmarks = this.page.locator('.nav__btn--bookmarks');

  navToAddRecipe() {
    this.addRecipeEl.click();
  }

  openBookmarksList() {
    this.bookmarks.click();
  }
}
