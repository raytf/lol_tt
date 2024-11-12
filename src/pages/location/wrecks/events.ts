import { writable, get } from "svelte/store";
import { audioApi, gameApi, hudApi, objectivesApi } from "$apis";
import { gridOffset, minOffset, moveSub } from "$stores/exploration";
import {
  coords,
  setTarget as setSubTarget,
  direction as subDirection,
} from "$stores/sub";
import { tutorialComplete } from "../surface/events";
import { conchEncounter, reConchEncounter } from "$dialog/conch";

export const subNearSurface = writable(false);
export const revealConchFace = writable(false);
export const conchEncountered = writable(false);
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
    const dialog = conchEncounter(() => {
      conchEncountered.set(true);
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
