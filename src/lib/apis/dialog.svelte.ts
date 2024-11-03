import { writable } from "svelte/store";
import type { DialogKey } from "$components/hud/dialog";
import radio from "$assets/icons/radio.svg";
import tongue from "$assets/emoji/tongue.svg";

export const defaultHint: DialogKey = {
  imgSrc: radio,
  name: "mission-control",
  text: "hint-1",
  options: [
    {
      text: "hint-1_o1-default",
      imgSrc: tongue,
      nextDialog: [
        {
          imgSrc: radio,
          name: "mission-control",
          text: "hint-1_o1-default-1",
        },
      ],
    },
  ],
};

export class DialogApi {
  blockInput = $state(false);
  currentDialog = $state<DialogKey[]>([]);
  onDialogFinished = () => {};
}

export const dialogApi = writable<DialogApi>(new DialogApi());
