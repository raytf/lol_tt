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
  seethrough = $state(true);
  opacity = $state(80);

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

  hasPage(key: string) {
    return key in this.pages;
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

  onSMPage() {
    return this.currentPage.type === "sm";
  }

  onExperimentPage() {
    return this.currentPage.type === "experiment";
  }

  restorePages(pages: Notepad) {
    this.pages = pages;
  }

  getPage(key: string) {
    if (this.hasPage(key)) {
      return this.pages[key];
    }
    return null;
  }

  openPage(key: string) {
    if (this.hasPage(key)) {
      this.currentPageKey = key;
      //console.log("opening", this.currentPage);
    }
  }

  addLine(key: string) {
    if (
      this.currentPage.type === "text" ||
      this.currentPage.type === "custom" ||
      this.currentPage.type === "table"
    ) {
      this.currentPage.lines = [...this.currentPage.lines, key];
    }
  }

  updateRowClass(index: number, rowClass: string) {
    if (this.currentPage.type === "table") {
      this.currentPage.rows[index].class = rowClass;
    }
  }

  addTableRow(...cols: string[]) {
    if (
      this.currentPage.type === "table" ||
      this.currentPage.type === "experiment"
    ) {
      this.currentPage.rows.push({
        data: cols,
      });
    }
  }

  updateTableRow(
    index: number,
    ...cols: string[]
  ) {
    if (
      this.currentPage.type === "table" ||
      this.currentPage.type === "experiment"
    ) {
      this.currentPage.rows[index].data = cols;
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

  updatePage(key: string, data: any) {
    const page = $state.snapshot(this.getPage(key));
    // console.log("prev", page);
    // console.log("new", data);
    if (page) {
      this.pages[key] = { ...page, ...data };
      //console.log("updated", this.pages[key]);
    }
  }
}

export const notepadApi = writable<NotepadApi>(new NotepadApi());
