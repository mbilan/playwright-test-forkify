import { Page } from '@playwright/test';
import { Recipe } from './recipe';

export class API {
  constructor(private page: Page) {}

  async getRecipe(id: string): Promise<Recipe> {
    const response = await this.page.request.get(`${process.env.API_URL}${id}`);
    const data = await response.json();
    const { recipe } = data.data;
    return recipe;
  }
}
