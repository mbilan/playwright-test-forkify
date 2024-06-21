import { PageHolder } from './abstractClasses';

export class ResultsView extends PageHolder {
  private parentEl = this.page.locator('.search-results');
  private resultsList = this.page.locator('.results .preview');
}
