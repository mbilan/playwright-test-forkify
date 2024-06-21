import { expect, Locator } from '@playwright/test';
import { AppPage } from './abstractClasses';
import { Ingredient, Recipe } from './../../api/recipe';

export class NewRecipeForm extends AppPage {
  private titleInput = this.page.locator('[name="title"]');
  private sourceUrlInput = this.page.locator('[name="sourceUrl"]');
  private imageUrlInput = this.page.getByPlaceholder('Recipe image url');
  private publisherInput = this.page.getByPlaceholder('Publisher name');
  private cookingTimeInput = this.page.getByPlaceholder('Cooking time');
  private servingsInput = this.page.getByPlaceholder('Servings number');
  private uploadBtn = this.page.locator('.upload__btn');
  public message = this.page.locator('.add-recipe-window .message');

  public validationErrorIngrInput = this.page.locator(`[name="ingredient-1"]:invalid`);

  private ingredientInput(index: number): Locator {
    return this.page.locator(`[name="ingredient-${index}"]`);
  }

  async uploadNewRecipe(recipe: Recipe) {
    await this.fillForm(recipe);
    await this.uploadRecipe();
  }

  async uploadRecipe() {
    await this.uploadBtn.click();
  }

  async fillForm(recipe: Recipe) {
    await this.fillRecipeData(recipe);
    await this.fillIngredients(recipe);
  }

  async fillRecipeData(recipe: Recipe) {
    await this.titleInput.fill(recipe.title);
    await this.sourceUrlInput.fill(recipe.source_url);
    await this.imageUrlInput.fill(recipe.image_url);
    await this.publisherInput.fill(recipe.publisher);
    await this.cookingTimeInput.fill(recipe.cooking_time.toString());
    await this.servingsInput.fill(recipe.servings.toString());
  }

  async fillIngredients(recipe: Recipe) {
    let index = 1;
    for (const ing of recipe.ingredients) {
      await this.ingredientInput(index).fill(this.formatIngredient(ing));
      index++;
    }
  }

  private formatIngredient(ing: Ingredient): string {
    return `${ing.quantity ? ing.quantity : ''},${ing.unit},${ing.description}`;
  }
}
