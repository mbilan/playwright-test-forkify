import { Headers } from './components/headers';
import { PageHolder } from './components/pageHolder';
import { Page } from '@playwright/test';
import { SearchForm } from './components/searchForm';
import { RecipeView } from './components/recipeView';

class Application extends PageHolder {
  public headers = new Headers(this.page);
  public searchForm = new SearchForm(this.page);
  public recipeView = new RecipeView(this.page);
}
