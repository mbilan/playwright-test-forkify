import { Page } from '@playwright/test';
import { Recipe, RecipeList } from './recipe';

export class API {
  constructor(private page: Page) {}

  async getRecipe(id: string): Promise<Recipe> {
    const response = await this.page.request.get(`${process.env.API_URL}${id}`);
    const data = await response.json();
    const { recipe } = data.data;
    return recipe;
  }

  async searchRecipes(query: string): Promise<RecipeList> {
    const response = await this.page.request.get(`${process.env.API_URL}?search=${query}`);
    const data = await response.json();
    return data.data;
  }
}
