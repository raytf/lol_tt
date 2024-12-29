import { writable, get } from "svelte/store";
import type { DialogKey } from "$apis/dialog.svelte";
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
import { hideHeading, tlRevealHeading } from "$components/location";

const hud = get(hudApi);
const notepad = get(notepadApi);
const objectives = get(objectivesApi);
const audio = get(audioApi);

class WrecksEvents {
  startObservationTask = $state(false);
  numObserved = $state(0);

  revealConch = $state(false);
  conchLightRadius = $state(0);

  showConchFace = $state(false);

  onEnter() {
    hideHeading();
    const objectives = get(objectivesApi);
    if (!objectives.hasCompleted("obj_make-observations")) {
      this.startObservationTask = true;
    }

    if (objectives.hasCompleted("obj_review-observations")) {
      this.revealConch = true;
      this.conchLightRadius = 11;
    }

    get(audioApi).playTrack({
      src: "music/deep-echoes.mp3",
      volume: 0.44,
      loop: true,
    });
    //if (objectives.hasCompleted(""))
  }

  onClickConch() {
    this.showConchFace = true;

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
  }

  makeObservation(index: number) {
    const observationKey = `ch1_observations-${index}`;
    let dialog: DialogKey[] = [
      {
        imgSrc: hushed,
        name: "you",
        text: observationKey,
        onProceed: () => {
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
      },
    ];

    if (index === 3) {
      const laughDialog = [
        {
          text: "ch1_conch-scare-1",
          onStart: () => {
            hud.showNotepad = false;
            audio.playTrack({ src: "sound/spooky-laugh.mp3", volume: 0.5 });
            this.showConchFace = true;
            this.conchLightRadius = 4;
          },
        },
        {
          imgSrc: fearful,
          name: "you",
          text: "ch1_conch-scare-2",
        },
        {
          imgSrc: neutral,
          name: "you",
          text: "ch1_conch-scare-3",
          onProceed: () => {
            this.showConchFace = false;
            this.conchLightRadius = 0;
          },
        },
      ];
      dialog.push(...laughDialog);
    }

    hud.startDialog({
      keys: dialog,
      onFinished: () => {},
    });
  }
}

export default writable(new WrecksEvents());
