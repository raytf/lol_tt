export type DialogKey = {
  imgSrc?: string;
  name?: string;
  text: string;
};

import Dialog from "./Dialog.svelte";
import HintDialog from "./HintDialog.svelte";
import QuestionDialog from "./QuestionDialog.svelte";
import Box from "./Box.svelte";
export { Dialog, HintDialog, QuestionDialog, Box as DialogBox };
