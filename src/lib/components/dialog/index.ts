export type DialogKey = {
  imgSrc?: string;
  name?: string;
  text: string;
  options?: DialogOption[];
  alreadyRead?: boolean;
};

export type DialogOption = {
  text: string;
  nextDialog: DialogKey[];
  repeat?: boolean;
};

import Dialog from "./Dialog.svelte";
import HintDialog from "./HintDialog.svelte";
import QuestionDialog from "./QuestionDialog.svelte";
import Options from "./Options.svelte";
import Box from "./Box.svelte";
export { Dialog, HintDialog, QuestionDialog, Options, Box as DialogBox };
