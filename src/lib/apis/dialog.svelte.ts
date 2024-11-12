import { writable } from "svelte/store";

export type DialogKey = {
  imgSrc?: string;
  name?: string;
  text: string;
  options?: DialogOption[];
  alreadyRead?: boolean;
  italic?: boolean;
  onProceed?: () => void;
};

export type DialogOption = {
  text: string;
  nextDialog: DialogKey[];
  imgSrc?: string;
  repeat?: boolean;
  onProceed?: () => void;
};

export class DialogApi {
  blockInput = $state(false);
  currentDialog = $state<DialogKey[]>([]);
  positionTop = $state(true);
  aboveModal = $state(false);

  onDialogFinished = () => {};
}

export const dialogApi = writable<DialogApi>(new DialogApi());
