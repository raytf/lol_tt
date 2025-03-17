import { writable, get } from "svelte/store";

interface Notepad {
  [key: string]: PageData;
}

class NotepadApi {
  pages = $state<Notepad>({
    cover: { type: "custom", lines: [] },
  });
  currentPageKey = $state("cover");

  get currentPage() {
    return this.pages[this.currentPageKey];
  }

  get currentPageIndex() {
    const keys = Object.keys(this.pages);
    return keys.indexOf(this.currentPageKey);
  }

  get numPages() {
    return Object.keys(this.pages).length;
  }

  restorePages(pages: Notepad) {
    this.pages = pages;
  }

  openPage(key: string) {
    if (key in this.pages) {
      this.currentPageKey = key;
      console.log("opening", this.currentPage);
    }
  }

  addLine(key: string) {
    if (
      this.currentPage.type === "text" ||
      this.currentPage.type === "custom" ||
      this.currentPage.type === "table"
    ) {
      this.currentPage?.lines?.push(key);
    }
  }

  addTableRow(key1: string, key2: string) {
    if (this.currentPage.type === "table") {
      this.currentPage.rows.push([key1, key2]);
    }
  }

  prevPage() {
    const keys = Object.keys(this.pages);
    const currentIndex = keys.indexOf(this.currentPageKey);
    if (currentIndex > 0) {
      this.currentPageKey = keys[currentIndex - 1];
    }
  }

  nextPage() {
    const keys = Object.keys(this.pages);
    const currentIndex = keys.indexOf(this.currentPageKey);
    if (currentIndex < keys.length - 1) {
      this.currentPageKey = keys[currentIndex + 1];
    }
  }

  newPage(key: string, page: PageData) {
    this.pages[key] = page;
    this.currentPageKey = key;
  }
}

export const notepadApi = writable<NotepadApi>(new NotepadApi());
