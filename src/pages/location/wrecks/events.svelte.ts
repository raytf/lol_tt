import { writable, get } from "svelte/store";
import {
  audioApi,
  gameApi,
  hudApi,
  objectivesApi,
  notepadApi,
  inventoryApi,
} from "$apis";
import { gridOffset, minOffset, moveSub } from "$stores/exploration";
import {
  coords,
  setTarget as setSubTarget,
  direction as subDirection,
} from "$stores/sub";
import {
  conchEncounter1,
  conchEncounter2,
  observationTask,
  conchReview1,
} from "$dialog/conch";
import { hushed, fearful, neutral } from "$assets/emoji";

class WrecksEvents {
  startObservationTask = $state(false);
  numObserved = $state(0);

  showConchFace = $state(false);

  onStart() {
    const objectives = get(objectivesApi);
    if (!objectives.hasCompleted("obj_make-observations")) {
      this.startObservationTask = true;
    }
  }

  onClickConch() {
    const hud = get(hudApi);
    const objectives = get(objectivesApi);
    this.showConchFace = true;
    if (!objectives.hasCompleted("obj_make-observations")) {
      get(audioApi).playTrack({ src: "sound/spooky-laugh.mp3", volume: 0.5 });
      hud.startDialog({
        keys: [
          {
            text: "ch1_conch-scare-1",
          },
          {
            imgSrc: fearful,
            name: "you",
            text: "ch1_conch-scare-2",
          },
        ],
        onFinished: () => {
          this.showConchFace = false;
        },
      });
      return;
    }
  }

  makeObservation(index: number) {
    const hud = get(hudApi);
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
        imgSrc: neutral,
        name: "you",
        text: "ch1_observations_hint-notepad",
      });
    }

    hud.startDialog({
      keys: dialog,
      onFinished: () => {
        if (hud.showNotepad && notepad.observationPage) {
          notepad.openPage(1);
          notepad.observationPage.addLine(observationKey);
          this.numObserved++;
          if (notepad.observationPage.lines.length >= 3) {
            objectives.completeTask("task_record-observations");
          }
        }
      },
    });
  }
}

export const events = writable(new WrecksEvents());

export const subNearSurface = writable(false);
export const revealConchFace = writable(false);
export const conchEncountered = writable(false);
export const startedObservationTask = writable(false);
export const finishedObservationTask = writable(false);
export const observationDone = writable(false);
const hud = get(hudApi);
const notepad = get(notepadApi);
const objectives = get(objectivesApi);

export const onTopAreaClick = (e: MouseEvent) => {
  const targetCoords = moveSub(e);
  if (targetCoords.y < 111) {
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

  // Before character intro
  if (!get(conchEncountered)) {
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
    return;
  }

  // Before start chapter 1
  if (!get(startedObservationTask)) {
    startConchDialog2();
    return;
  }

  // Before observation task finished
  if (!get(finishedObservationTask)) {
    get(hudApi).startDialog({
      keys: [observationTask()],
      blockInput: true,
      onFinished: () => {
        revealConchFace.set(false);
      },
    });
    return;
  }

  // Review observations
  get(hudApi).showNotepad = true;
  get(objectivesApi).completeTask("task_review-observations");
  get(hudApi).startDialog({
    keys: conchReview1,
    blockInput: true,
    onFinished: () => {
      revealConchFace.set(false);
    },
  });
};

const startConchDialog2 = () => {
  const dialog = conchEncounter2(() => {
    setTimeout(() => {
      // startChapterOne();
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

export const dbAddObservations = () => {
  for (let i = 1; i <= 3; i++) {
    const observationKey = `ch1_observations-${i}`;
    if (notepad.currentPage) notepad.currentPage.addLine(observationKey);
  }
};
