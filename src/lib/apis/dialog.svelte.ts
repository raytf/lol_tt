import { writable, get } from "svelte/store";
import { lolApi } from "$apis/lol.svelte";

export class Dialog {
  keys = $state<DialogKey[]>([]);
  currentIdx = $state(0);
  currentKey = $derived.by(() => {
    if (this.currentIdx >= this.keys.length) {
      return null;
    }

    return this.keys[this.currentIdx];
  });
  blockInput: boolean;
  position: "top" | "bottom";
  disabledOptions: string[];
  onFinished: () => void;

  constructor(params: StartDialogParams) {
    this.keys = [...params.keys];
    this.blockInput = params.blockInput || false;
    this.position = "top";
    this.disabledOptions = params.disabledOptions || [];
    this.onFinished = params.onFinished || (() => {});
  }

  insertDialog(newKeys: DialogKey[] = []) {
    this.keys.splice(this.currentIdx + 1, 0, ...newKeys);
  }

  nextLine() {
    if (!this.currentKey) return;
    this.currentIdx++;

    if (this.currentKey) {
      get(lolApi).speakText(this.currentKey.text);
      this.currentKey?.onStart?.();
    } else {
      this.onFinished();
      console.log(this.onFinished());
    }
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
