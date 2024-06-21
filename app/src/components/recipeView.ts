import { PageHolder } from './abstractClasses';

export class RecipeView extends PageHolder {
  public title = this.page.locator('.recipe__title');
  public timeInMinutes = this.page.locator('.recipe__info-data--minutes');
  private servingsNum = this.page.locator('.recipe__info-data--people');
  private ingridientListEl = this.page.locator('.recipe__ingredient-list');
}
