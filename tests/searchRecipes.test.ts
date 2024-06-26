import { test } from '../app/fixtures/fixture';
import { expect } from '@playwright/test';

const moreThan10Results = 'pasta';
const lessThan10ResultsQuery = 'soy';
const resultsPerPage = 10;

test.describe('Search recipes by query', () => {
  test('Display 10 first results and pagination', async ({ app }) => {
    app.searchForm.search(moreThan10Results);
    const apiResponse = await app.API.searchRecipes(moreThan10Results);
    const { recipes } = apiResponse;
    expect(recipes.length).toBeGreaterThan(10);
    const results = await app.resultsView.previewResults();
    expect(results.previews).toHaveLength(10);
    await app.paginationBlock.toBeVisible();
  });

  test('Display less than 10 results, without pagination', async ({ app }) => {
    app.searchForm.search(lessThan10ResultsQuery);
    const apiResponse = await app.API.searchRecipes(lessThan10ResultsQuery);
    const { recipes } = apiResponse;
    expect(recipes.length).toBeLessThan(10);
    const results = await app.resultsView.previewResults();
    expect(results.previews.length).toBeLessThan(10);
    await app.paginationBlock.toBeNotVisible();
  });

  test('Navigate through pagination', async ({ app }) => {
    app.searchForm.search(moreThan10Results);
    app.resultsView.waitForSpinnerDissapper();

    const apiResponse = await app.API.searchRecipes(moreThan10Results);
    const { recipes } = apiResponse;
    const pageCount = Math.ceil(recipes.length / resultsPerPage);

    await app.paginationBlock.toBeVisible();
    await app.paginationBlock.previousPageToBeHidden();
    await app.paginationBlock.nextPageToHaveNumber(2);

    // navigation from 1 to last page
    for (let i = 2; i <= pageCount; i++) {
      // navigate to next page
      await app.paginationBlock.navigateToNextPage();
      await app.resultsView.waitForSpinnerDissapper();
      if (i !== pageCount) {
        await app.paginationBlock.previousPageToHaveNumber(i - 1);
        await app.paginationBlock.nextPageToHaveNumber(i + 1);
      } else {
        await app.paginationBlock.nextPageToBeHidden();
        await app.paginationBlock.previousPageToHaveNumber(i - 1);
      }
    }

    // navigation from last page to first
    for (let page = pageCount; page >= 2; page--) {
      // navigate to next page
      await app.paginationBlock.navigateToPreviousPage();
      await app.resultsView.waitForSpinnerDissapper();
      if (page !== 2) {
        await app.paginationBlock.previousPageToHaveNumber(page - 2);
        await app.paginationBlock.nextPageToHaveNumber(page);
      } else {
        await app.paginationBlock.previousPageToBeHidden();
        await app.paginationBlock.nextPageToHaveNumber(page);
      }
    }
  });
});
