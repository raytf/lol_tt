import { writable } from "svelte/store";

export class Dialog {
  keys: DialogKey[];
  blockInput: boolean;
  position: "top" | "bottom";
  disabledOptions: string[];
  onFinished: () => void;

  constructor(params: StartDialogParams) {
    this.keys = params.keys;
    this.blockInput = params.blockInput || false;
    this.position = "top";
    this.disabledOptions = params.disabledOptions || [];
    this.onFinished = params.onFinished || (() => {});
  }
}

export class DialogApi {
  currentDialog = $state<Dialog | null>(null);

  enableOption(key: string) {
    if (!this.currentDialog) return;
    this.currentDialog.disabledOptions =
      this.currentDialog.disabledOptions.filter((k) => k !== key);
  }
}

export const dialogApi = writable<DialogApi>(new DialogApi());
