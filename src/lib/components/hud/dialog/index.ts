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
  repeat?: boolean;
};

import HudDialog from "./HudDialog.svelte";
import Dialog from "./Dialog.svelte";
import HintDialog from "./HintDialog.svelte";
import QuestionDialog from "./QuestionDialog.svelte";
import Options from "./Options.svelte";
import Box from "./Box.svelte";
export {
  HudDialog,
  Dialog,
  HintDialog,
  QuestionDialog,
  Options,
  Box as DialogBox,
};
