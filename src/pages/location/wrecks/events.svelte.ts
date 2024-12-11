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

const hud = get(hudApi);
const notepad = get(notepadApi);

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

    hud.startDialog({
      keys: dialog,
      onFinished: () => {
        if (notepad.observationPage) {
          hud.showNotepad = true;
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
