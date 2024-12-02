import { writable, get } from "svelte/store";
import { lolApi } from "$apis";

class Page {
  type = "";
  title = $state("");
  lines = $state<string[]>([]);

  constructor(titleKey: string) {
    this.title = this.getLolText(titleKey);
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
}

class ObservationsNotepadPage extends TextPage {
  observationKeys = $state<string[]>([]);
  constructor(titleKey: string) {
    super(titleKey);
  }

  addLine(key: string): void {
    if (this.observationKeys.includes(key)) return;
    super.addBulletLine(key);

    this.observationKeys.push(key);
  }

  additionalMethod() {
    // Add any additional methods or properties here
  }
}

class NotepadApi {
  pages = $state<Page[]>([]);
  currentPageIndex = 0;
  currentPage = $state<Page>(new CoverPage("notepad-title_mission"));

  constructor() {
    this.currentPage.addBulletLine("notepad-line_explore-depths");
    this.currentPage.addBulletLine("notepad-line_look-clues");
    this.currentPage.addBulletLine("notepad-line_find-treasure");
    this.pages = [this.currentPage];
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

  startObservationsPage(titleKey: string) {
    this.currentPage = new ObservationsNotepadPage(titleKey);
    this.pages.push(this.currentPage);
    this.currentPageIndex++;
  }
}

export const notepadApi = writable<NotepadApi>(new NotepadApi());
