import { writable, get } from "svelte/store";
import { lolApi } from "$apis";

class Page {
  type = "";
  title = $state("");
  lines = $state<string[]>([]);

  constructor() {
    this.lines = [];
  }

  addLine(key: string) {
    this.lines.push(this.getLolText(key));
  }

  addBulletLine(key: string) {
    this.lines.push("- " + this.getLolText(key));
  }

  getLolText(key: string) {
    return get(lolApi).getText(key);
  }
}

class CoverPage extends Page {
  type = "cover";
}

class TextPage extends Page {
  type = "text";

  constructor(titleKey: string) {
    super();
    this.title = this.getLolText(titleKey);
    this.lines = [];
  }
}

class ObservationsPage extends TextPage {
  observationKeys = $state<string[]>([]);
  constructor(titleKey: string) {
    super(titleKey);
  }

  addLine(key: string): void {
    if (this.observationKeys.includes(key)) return;
    super.addBulletLine(key);

    this.observationKeys.push(key);
  }
}

class NotepadApi {
  pages = $state<Page[]>([]);
  currentPageIndex = $state(0);
  currentPage = $state<Page>(new CoverPage());
  observationPage = $state<ObservationsPage>();

  constructor() {
    this.pages = [this.currentPage];
  }

  openPage(index: number) {
    this.currentPageIndex = index;
    this.currentPage = this.pages[index];
  }

  prevPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.currentPage = this.pages[this.currentPageIndex];
    }
  }

  nextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex++;
      this.currentPage = this.pages[this.currentPageIndex];
    }
  }

  startObservationPage(titleKey: string) {
    this.observationPage = new ObservationsPage(titleKey);
    this.currentPage = this.observationPage;
    this.pages.push(this.currentPage);
    this.currentPageIndex++;
  }

  fillObservationPage() {
    if (this.observationPage && this.observationPage.lines.length === 0) {
      for (let i = 1; i <= 3; i++) {
        const observationKey = `tut_observations${i}`;
        if (this.observationPage) this.observationPage.addLine(observationKey);
      }
    }
  }

  newPage(titleKey: string) {
    const page = new TextPage(titleKey);
    this.currentPage = page;
    this.pages.push(page);
    this.currentPageIndex++;
  }
}

export const notepadApi = writable<NotepadApi>(new NotepadApi());
