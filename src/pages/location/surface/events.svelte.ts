import { writable, get } from "svelte/store";
import {
  hudApi,
  gameApi,
  audioApi,
  objectivesApi,
  inventoryApi,
  radioApi,
} from "$apis";
import { checkIn, missionBrief } from "$dialog/radio";
import { setTarget as setSubTarget } from "$stores/sub";
import { hideHeading, tlRevealHeading } from "./animations";

class SurfaceEvents {
  tutorialComplete = false;
  surfaceSub = $state(false);
  readyToDive = $state(false);

  onStart() {
    get(audioApi).playTrack({
      src: "sound/ocean-loop.mp3",
      volume: 0.08,
      loop: true,
    });

    let tlHeading = tlRevealHeading();
    const objectives = get(objectivesApi);
    setTimeout(() => {
      this.surfaceSub = true;
      tlHeading.reverse();

      setTimeout(() => {
        if (objectives.currentObjective) {
          this.readyToDive = true;
        } else {
          if (objectives.hasCompleted("obj_mission")) {
            this.startChapter1();
          } else {
            this.startTutorial();
          }
        }
      }, 1111);
    }, 1111);
  }

  onClickArea(e: MouseEvent) {
    if (!this.tutorialComplete) {
      get(objectivesApi).completeTask("task_move-sub");
    }

    setSubTarget({ x: e.clientX, y: e.clientY });
  }

  onClickDive() {
    if (!this.tutorialComplete) {
      //console.log("click dive");
      get(objectivesApi).completeTask("task_dive");
    }

    this.readyToDive = false;
    this.surfaceSub = false;

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

  startTutorial() {
    const objectives = get(objectivesApi);

    objectives.startChapter("tutorial", () => {
      this.tutorialComplete = true;
    });

    objectives.attachStartCallback("obj_mission", () => {
      this.startMissionBrief();
    });
  }

  startMissionBrief() {
    const hud = get(hudApi);
    hud.startDialog({
      keys: [...checkIn, ...missionBrief],
      onFinished: () => {
        get(objectivesApi).completeTask("task_start-mission");
        this.startChapter1();
      },
    });
  }

  startChapter1() {
    const hud = get(hudApi);
    const objectives = get(objectivesApi);

    hud.startItemUnlock({
      itemId: "sm",
      onFinished: () => {
        hud.startItemUnlock({
          itemId: "notepad",
          onFinished: () => {
            objectives.startChapter("chapter1", () => {});
          },
        });
      },
    });

    //objectives.attachFinishedCallback();
  }
}

export const events = writable<SurfaceEvents>(new SurfaceEvents());
