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
};

import Dialog from "./Dialog.svelte";
import HintDialog from "./HintDialog.svelte";
import QuestionDialog from "./QuestionDialog.svelte";
import Options from "./Options.svelte";
import Box from "./Box.svelte";
export { Dialog, HintDialog, QuestionDialog, Options, Box as DialogBox };
