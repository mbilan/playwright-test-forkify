import { PageHolder } from './pageHolder';

export class RecipeView extends PageHolder {
  private title = this.page.locator('.recipe__title');
  private timeInMinutes = this.page.locator('.recipe__info-data--minutes');
  private servingsNum = this.page.locator('.recipe__info-data--people');
  private ingridientListEl = this.page.locator('.recipe__ingredient-list');
}
