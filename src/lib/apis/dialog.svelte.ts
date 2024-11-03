import { writable } from "svelte/store";
import type { DialogKey } from "$components/hud/dialog";

export class DialogApi {
  blockInput = $state(false);
  currentDialog = $state<DialogKey[]>([]);
  onDialogFinished = () => {};
}

export const dialogApi = writable<DialogApi>(new DialogApi());
