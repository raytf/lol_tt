import { writable, get } from "svelte/store";
import { audioApi, gameApi, hudApi, objectivesApi } from "$apis";
import { gridOffset, minOffset } from "$stores/exploration";
import {
  setTarget as setSubTarget,
  direction as subDirection,
} from "$stores/sub";
import { conchEncounter, reConchEncounter } from "$dialog/conch";

export const revealConchFace = writable(false);
export const conchEncountered = writable(false);
export const notepadUnlocked = writable(false);
export const observationDone = writable(false);

export const onclickConch = () => {
  gridOffset.set({ x: get(minOffset).x, y: get(minOffset).y });
  setSubTarget({ x: 1111, y: 1444 });
  subDirection.set({ x: 1, y: 1 });
  revealConchFace.set(true);
  if (get(conchEncountered)) {
    get(hudApi).startDialog({
      keys: reConchEncounter,
      blockInput: true,
      onFinished: () => {
        revealConchFace.set(false);
      },
    });
  } else {
    get(hudApi).startDialog({
      keys: conchEncounter,
      blockInput: true,
      onFinished: () => {
        revealConchFace.set(false);
        conchEncountered.set(true);
        setTimeout(() => {
          startChapterOne();
        }, 555);
      },
    });
  }
};

export const startChapterOne = () => {
  get(hudApi).startChapter({
    chapterKey: "chapter-1",
    objectives: [
      {
        key: "obj_check-in",
        completed: false,
        onFinished: () => {
          notepadUnlocked.set(true);
        },
      },
      {
        key: "obj_wrecks-observation",
        completed: false,
        onFinished: () => {
          observationDone.set(true);
        },
      },
    ],
    onFinished: () => {},
  });
};
