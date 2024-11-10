import { get } from "svelte/store";
import { audioApi, gameApi, hudApi, objectivesApi } from "$apis";
import { conchEncounter } from "$dialog/chapter1";

export const startConchEncounterDialog = (onFinished?: () => void) => {
  get(hudApi).startDialog({
    keys: conchEncounter,
    onFinished: onFinished,
    blockInput: true,
  });
};
