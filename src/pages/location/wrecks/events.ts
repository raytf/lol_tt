import { writable, get } from "svelte/store";
import { audioApi, gameApi, hudApi, objectivesApi } from "$apis";
import { gridOffset, minOffset, moveSub } from "$stores/exploration";
import {
  coords,
  setTarget as setSubTarget,
  direction as subDirection,
} from "$stores/sub";
import { tutorialComplete } from "../surface/events";
import { conchEncounter1, conchEncounter2 } from "$dialog/conch";

export const subNearSurface = writable(false);
export const revealConchFace = writable(false);
export const conchEncountered = writable(false);
export const startedObservationTask = writable(false);
export const notepadUnlocked = writable(false);
export const observationDone = writable(false);

export const onTopAreaClick = (e: MouseEvent) => {
  if (!get(tutorialComplete)) {
    get(objectivesApi).completeTask("task_move-sub");
  }
  const targetCoords = moveSub(e);
  if (targetCoords.y < 222) {
    subNearSurface.set(true);
    return;
  }
  subNearSurface.set(false);
};

export const onclickConch = () => {
  // Position sub
  gridOffset.set({ x: get(minOffset).x, y: get(minOffset).y });
  setSubTarget({ x: 1111, y: 1444 });
  subDirection.set({ x: 1, y: 1 });
  revealConchFace.set(true);

  // Dialog
  if (!get(conchEncountered)) {
    // First encounter
    get(hudApi).startDialog({
      keys: conchEncounter1,
      blockInput: true,
      onFinished: () => {
        conchEncountered.set(true);
        // Replace this with Character intro later
        // temp fix
        setTimeout(() => {
          startConchDialog2();
        }, 555);
      },
    });
  } else {
    // Second encounter
    startConchDialog2();
  }
};

const startConchDialog2 = () => {
  const dialog = conchEncounter2(() => {
    startedObservationTask.set(true);
    setTimeout(() => {
      startChapterOne();
    }, 555);
  });

  get(hudApi).startDialog({
    keys: dialog,
    blockInput: true,
    onFinished: () => {
      revealConchFace.set(false);
    },
  });
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
