import { PageHolder } from './abstractClasses';

type Preview = {
  title: string;
  publisher: string;
};

type PreviewList = {
  previews: Preview[];
};

export class ResultsView extends PageHolder {
  private resultsList = this.page.locator('.results .preview');
  private spinner = this.page.locator('.results .spinner');

  async waitForSpinnerDissapper() {
    await this.page.locator('.results .spinner').waitFor({ state: 'hidden' });
  }

  async previewResults(): Promise<PreviewList> {
    let previewList: PreviewList = { previews: [] };
    await this.waitForSpinnerDissapper();
    for (const li of await this.resultsList.all()) {
      previewList.previews.push({
        title: (await li.locator('.preview__title').textContent())!,
        publisher: (await li.locator('.preview__publisher').textContent())!,
      });
    }
    return previewList;
  }
}
