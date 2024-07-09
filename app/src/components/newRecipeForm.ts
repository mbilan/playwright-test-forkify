import { Locator } from '@playwright/test';
import { AppPage } from './abstractClasses';
import { Ingredient, Recipe } from './../../api/recipe';
import { step } from '../../decorators/step';

export class NewRecipeForm extends AppPage {
  private inputEl = (nameArg: string) => this.page.locator(`[name="${nameArg}"]`);
  public validationErrorInput = (nameArg: string) => this.page.locator(`[name="${nameArg}"]:invalid`);

  private titleInput = this.inputEl('title');
  private sourceUrlInput = this.inputEl('sourceUrl');
  private imageUrlInput = this.inputEl('image');
  private publisherInput = this.inputEl('publisher');
  private cookingTimeInput = this.inputEl('cookingTime');
  private servingsInput = this.inputEl('servings');
  private uploadBtn = this.page.locator('.upload__btn');

  public message = this.page.locator('.add-recipe-window .message');

  private ingredientInput(index: number): Locator {
    return this.page.locator(`[name="ingredient-${index}"]`);
  }

  @step
  async uploadNewRecipe(recipe: Recipe) {
    await this.fillForm(recipe);
    await this.uploadRecipe();
  }

  @step
  async uploadRecipe() {
    await this.uploadBtn.click();
  }

  @step
  async fillForm(recipe: Recipe) {
    await this.fillRecipeData(recipe);
    await this.fillIngredients(recipe);
  }

  @step
  async fillRecipeData(recipe: Recipe) {
    await this.titleInput.fill(recipe.title);
    await this.sourceUrlInput.fill(recipe.source_url);
    await this.imageUrlInput.fill(recipe.image_url);
    await this.publisherInput.fill(recipe.publisher);
    await this.cookingTimeInput.fill(recipe.cooking_time.toString());
    await this.servingsInput.fill(recipe.servings.toString());
  }

  @step
  async fillRecipeDataExcept(recipe: Recipe, exceptName: string) {
    await this.fillRecipeData(recipe);
    await this.page.locator(`[name="${exceptName}"]`).clear();
  }

  @step
  async clearRecipeDataInputs() {
    await this.titleInput.clear();
    await this.sourceUrlInput.clear();
    await this.imageUrlInput.clear();
    await this.publisherInput.clear();
    await this.cookingTimeInput.clear();
    await this.servingsInput.clear();
  }

  @step
  async fillIngredients(recipe: Recipe) {
    let index = 1;
    for (const ing of recipe.ingredients) {
      await this.ingredientInput(index).fill(this.formatIngredient(ing));
      index++;
    }
  }

  @step
  async closeModal() {
    await this.page.locator('.btn--close-modal').click();
  }

  private formatIngredient(ing: Ingredient): string {
    return `${ing.quantity ? ing.quantity : ''},${ing.unit},${ing.description}`;
  }
}
