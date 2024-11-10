import { writable, get } from "svelte/store";
import { audioApi, gameApi, hudApi, objectivesApi } from "$apis";
import { gridOffset, minOffset } from "$stores/exploration";
import { setTarget as setSubTarget } from "$stores/sub";
import { conchEncounter } from "$dialog/chapter1";

export const revealConchFace = writable(false);

export const onclickConch = () => {
  gridOffset.set({ x: get(minOffset).x, y: get(minOffset).y });
  setSubTarget({ x: 1111, y: 1444 });
  revealConchFace.set(true);
  startConchEncounterDialog(() => {
    revealConchFace.set(false);
  });
};

const startConchEncounterDialog = (onFinished?: () => void) => {
  get(hudApi).startDialog({
    keys: conchEncounter,
    onFinished: onFinished,
    blockInput: true,
  });
};
