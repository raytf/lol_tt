import { writable, get } from "svelte/store";
import { lolApi } from "$apis";

class NotepadPage {
  title = $state("");
  lines = $state<string[]>([]);
  constructor(titleKey: string) {
    this.title = this.getLolText(titleKey);
    this.lines = [];
  }

  addLine(key: string) {
    this.lines.push(this.getLolText(key));
  }
  getLolText(key: string) {
    return get(lolApi).getText(key);
  }
}

class ObservationsNotepadPage extends NotepadPage {
  observationKeys = $state<string[]>([]);
  constructor(titleKey: string) {
    super(titleKey);
  }

  addLine(key: string): void {
    if (this.observationKeys.includes(key)) return;

    this.lines.push("- " + this.getLolText(key));
    this.observationKeys.push(key);
  }

  additionalMethod() {
    // Add any additional methods or properties here
  }
}

class NotepadApi {
  currentPage = $state<NotepadPage | null>(null);

  startObservationsPage(titleKey: string) {
    this.currentPage = new ObservationsNotepadPage(titleKey);
  }
}

export const notepadApi = writable<NotepadApi>(new NotepadApi());
