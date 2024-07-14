import { buildRecipe } from '../app/api/recipe';
import { test } from '../app/fixtures/fixture';
import { expect } from '@playwright/test';

const successMessage = 'Recipe was successfully uploaded !';
const dataArgs = ['title', 'sourceUrl', 'image', 'publisher', 'cookingTime', 'servings'];

test.describe(
  'Adding new recipe',
  {
    tag: '@add_new_recipe',
    annotation: {
      type: 'story',
      description: 'FORKIFY-100',
    },
  },
  () => {
    test('Successsfully add new recipe and validate api', async ({ app }) => {
      await app.clickOnAddNewRecipe();

      const recipe = buildRecipe();
      await app.newRecipeForm.uploadNewRecipe(recipe);

      await expect(app.newRecipeForm.message).toHaveText(successMessage);
      await expect(app.recipeView.title).toHaveText(recipe.title);

      const id = app.extractIdFromUrl();
      await test.step('Expect API response has the same body as we post', async () => {
        const recipeFromAPI = await app.API.getRecipe(id);
        expect(recipeFromAPI).toEqual(expect.objectContaining({ ...recipe }));
      });
    });

    test('At least one ingredient is required', async ({ app }) => {
      await app.clickOnAddNewRecipe();
      const recipe = buildRecipe();

      await app.newRecipeForm.fillRecipeData(recipe);
      await app.newRecipeForm.uploadRecipe();

      await expect(app.newRecipeForm.validationErrorInput('ingredient-1')).toBeVisible();
    });

    for (const nameArg of dataArgs) {
      test(`Input with name=${nameArg} is required`, async ({ app }) => {
        await app.clickOnAddNewRecipe();
        const recipe = buildRecipe();

        await app.newRecipeForm.fillRecipeDataExcept(recipe, nameArg);
        await app.newRecipeForm.uploadRecipe();
        await expect(app.newRecipeForm.validationErrorInput(nameArg)).toBeVisible();
        await app.newRecipeForm.clearRecipeDataInputs();
        await app.newRecipeForm.closeModal();
      });
    }
  },
);
