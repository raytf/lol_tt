import { writable, get } from "svelte/store";

interface Notepad {
  [key: string]: PageData;
}

class NotepadApi {
  pages = $state<Notepad>({
    cover: { type: "custom", lines: [] },
  });
  currentPageKey = $state("cover");
  notepadClass = $state("");

  get currentPage(): PageData {
    return this.pages[this.currentPageKey];
  }

  get currentPageIndex() {
    const keys = Object.keys(this.pages);
    return keys.indexOf(this.currentPageKey);
  }

  get numPages() {
    return Object.keys(this.pages).length;
  }

  onCustomPage() {
    return this.currentPage.type === "custom";
  }

  onTextPage() {
    return this.currentPage.type === "text";
  }

  onTablePage() {
    return this.currentPage.type === "table";
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

  updateRowClass(index: number, rowClass: string) {
    if (this.currentPage.type === "table") {
      this.currentPage.rows[index].class = rowClass;
    }
  }

  addTableRow(...keys: string[]) {
    if (this.currentPage.type === "table") {
      this.currentPage.rows.push({
        data: keys,
      });
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
