import { Headers } from './components/headers';
import { AppPage } from './components/abstractClasses';
import { SearchForm } from './components/searchForm';
import { RecipeView } from './components/recipeView';
import { NewRecipeForm } from './components/newRecipeForm';
import { ResultsView } from './components/resultsView';
import { API } from '../api/api';
import { Pagination } from './components/pagination';
import { step } from '../decorators/step';

export class Application extends AppPage {
  public API = new API(this.page);

  public headers = new Headers(this.page);
  public searchForm = new SearchForm(this.page);
  public recipeView = new RecipeView(this.page);
  public newRecipeForm = new NewRecipeForm(this.page);
  public resultsView = new ResultsView(this.page);
  public paginationBlock = new Pagination(this.page);

  @step
  async clickOnAddNewRecipe() {
    await this.headers.navigateToAddRecipe();
    await this.page.waitForLoadState();
  }

  async goToPage() {
    await this.page.goto('/', { waitUntil: 'load' });
  }
}
