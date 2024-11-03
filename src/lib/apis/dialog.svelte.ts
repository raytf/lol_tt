import { writable } from "svelte/store";
import type { DialogKey } from "$components/hud/dialog";

export class DialogApi {
  currentDialog = $state<DialogKey[]>([]);
  onFinished = () => {};

  resetDialog() {
    this.currentDialog = [];
    this.onFinished();
    this.onFinished = () => {};
  }
}

export const dialogApi = writable<DialogApi>(new DialogApi());
