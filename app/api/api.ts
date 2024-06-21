import { Page } from '@playwright/test';
import { Recipe } from './recipe';

export class API {
  constructor(private page: Page) {}

  async getRecipe(id: string): Promise<Recipe> {
    const response = await this.page.request.get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await response.json();
    const { recipe } = data.data;
    return recipe;
  }
}
