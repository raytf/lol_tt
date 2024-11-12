import { writable, get } from "svelte/store";
import { hudApi, gameApi, audioApi, objectivesApi } from "$apis";
import { missionBrief } from "$dialog/radio";
import { setTarget as setSubTarget } from "$stores/sub";
import { hideHeading, tlRevealHeading } from "./animations";

export const tutorialComplete = writable(false);

export const surfaceSub = writable(false);
export const equipmentChecked = writable(false);
export const readyToDive = writable(false);

let tlHeading: GSAPTimeline;
export function startSurface() {
  hideHeading();
  get(audioApi).playTrack({
    src: "sound/ocean-loop.mp3",
    volume: 0.08,
    loop: true,
  });

  tlHeading = tlRevealHeading();
  setTimeout(() => {
    surfaceSub.set(true);
    tlHeading.reverse();

    setTimeout(() => {
      if (get(tutorialComplete)) {
        readyToDive.set(true);
      } else {
        startMissionBrief();
      }
    }, 1111);
  }, 1111);
}

export function onClickArea(e: MouseEvent) {
  if (get(equipmentChecked)) {
    get(objectivesApi).completeTask("task_move-sub");
  }
  setSubTarget({ x: e.clientX, y: e.clientY });
}

export function onClickDive() {
  if (!get(tutorialComplete)) {
    console.log("click dive");
    get(objectivesApi).completeTask("task_dive");
  }

  readyToDive.set(false);
  surfaceSub.set(false);
  setTimeout(() => {
    get(gameApi).fadeScene("/wrecks/surface");
    get(audioApi).stopTrack({
      src: "sound/ocean-loop.mp3",
    });
    get(audioApi).playTrack({
      src: "music/deep-echoes.mp3",
      volume: 0.44,
      loop: true,
    });
  }, 1000);
}

export function startMissionBrief() {
  startMissionBriefDialog(() => {
    unlockSmItem(() => {
      unlockRadioItem(() => {
        get(hudApi).showInventory = true;
        startTutorial();
      });
    });
  });
}

export function startMissionBriefDialog(onFinished?: () => void) {
  get(hudApi).startDialog({
    keys: missionBrief,
    onFinished: onFinished,
  });
}

export function unlockSmItem(onFinished?: () => void) {
  get(hudApi).startItemUnlock({
    itemId: "sm",
    onFinished: onFinished,
  });
}

export function unlockRadioItem(onFinished?: () => void) {
  get(hudApi).startItemUnlock({
    itemId: "radio",
    onFinished: onFinished,
  });
}

export function startTutorial() {
  get(hudApi).startChapter({
    chapterKey: "tutorial",
    objectives: [
      {
        key: "obj_check-equipment",
        completed: false,
        onFinished: () => {
          equipmentChecked.set(true);
          readyToDive.set(true);
        },
      },
      {
        key: "obj_learn-controls",
        completed: false,
      },
    ],
    onFinished: () => {
      tutorialComplete.set(true);
    },
  });
}
