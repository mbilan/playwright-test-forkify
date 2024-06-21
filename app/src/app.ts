import { Headers } from './components/headers';
import { AppPage } from './components/abstractClasses';
import { Page } from '@playwright/test';
import { SearchForm } from './components/searchForm';
import { RecipeView } from './components/recipeView';
import { NewRecipeForm } from './components/newRecipeForm';
import { API } from '../api/api';

export class Application extends AppPage {
  public API = new API(this.page);

  public headers = new Headers(this.page);
  public searchForm = new SearchForm(this.page);
  public recipeView = new RecipeView(this.page);
  public newRecipeForm = new NewRecipeForm(this.page);

  async openAddNewRecipe() {
    await this.headers.navigateToAddRecipe();
    await this.page.waitForLoadState();
  }

  async goToPage() {
    await this.page.goto('/', { waitUntil: 'load' });
  }
}
