import { writable, get } from "svelte/store";

class NotepadApi {
  pages = $state<PageData[]>([{ type: "cover" }]);
  currentPageIndex = $state(0);
  //currentPage = $state<PageData>();
  // observationPage = $state<ObservationsPage>();

  get currentPage() {
    return this.pages[this.currentPageIndex];
  }

  restorePages(pages: PageData[]) {
    this.pages = pages;
  }

  openPage(index: number) {
    this.currentPageIndex = index;
  }

  prevPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }

  nextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex++;
    }
  }

  newPage(page: PageData) {
    this.pages.push(page);
    this.currentPageIndex = this.pages.length - 1;
  }
}

export const notepadApi = writable<NotepadApi>(new NotepadApi());
