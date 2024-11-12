import { writable, get } from "svelte/store";
import { audioApi, gameApi, hudApi, objectivesApi, notepadApi } from "$apis";
import { gridOffset, minOffset, moveSub } from "$stores/exploration";
import {
  coords,
  setTarget as setSubTarget,
  direction as subDirection,
} from "$stores/sub";
import { tutorialComplete } from "../surface/events";
import { conchEncounter1, conchEncounter2 } from "$dialog/conch";
import hushed from "$assets/emoji/hushed.svg";
import thinking from "$assets/emoji/thinking.svg";

export const subNearSurface = writable(false);
export const revealConchFace = writable(false);
export const conchEncountered = writable(false);
export const startedObservationTask = writable(false);
export const finishedObservationTask = writable(false);
export const observationDone = writable(false);
const hud = get(hudApi);
const notepad = get(notepadApi);

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
    if (!get(finishedObservationTask)) {
      startConchDialog2();
    } else {
      // Finished observation task
    }
  }
};

const startConchDialog2 = () => {
  const dialog = conchEncounter2(() => {
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
  startedObservationTask.set(true);
  notepad.startObservationsPage("notepad_title-observations");
  get(hudApi).startChapter({
    chapterKey: "chapter-1",
    objectives: [
      {
        key: "obj_wrecks-observation",
        completed: false,
        onFinished: () => {},
      },
    ],
    onFinished: () => {},
  });
};

export const makeObservation = (index: number) => {
  const hud = get(hudApi);
  const notepad = get(notepadApi);
  const objectives = get(objectivesApi);

  const observationKey = `ch1_observations-${index}`;
  let dialog = [
    {
      imgSrc: hushed,
      name: "you",
      text: observationKey,
    },
  ];
  if (!hud.showNotepad) {
    dialog.push({
      imgSrc: thinking,
      name: "you",
      text: "ch1_observations-record",
    });
  }

  hud.startDialog({
    keys: dialog,
    onFinished: () => {
      if (hud.showNotepad && notepad.currentPage) {
        notepad.currentPage.addLine(observationKey);
        if (notepad.currentPage.lines.length >= 3) {
          objectives.completeTask("task_record-observation");
          finishedObservationTask.set(true);
        }
      }
    },
  });
};
