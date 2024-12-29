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
import { moveSub } from "$stores/exploration";

const audio = get(audioApi);
const objectives = get(objectivesApi);

class SurfaceEvents {
  surfaceSub = $state(false);
  readyToDive = $state(false);

  onEnter(fromStart: boolean) {
    audio.playTrack({
      src: "sound/ocean-loop.mp3",
      volume: 0.08,
      loop: true,
    });

    setTimeout(() => {
      this.surfaceSub = true;

      if (fromStart) {
        setTimeout(() => {
          if (!objectives.hasCompleted("obj_mission")) {
            this.startTutorial();
          } else {
            if (!objectives.hasCompleted("obj_prepare")) {
              this.unlockItems();
              //this.prepareChapter1();
            } else {
              //this.startChapter1();
              this.readyToDive = true;
            }
          }
        }, 1111);
      } else {
        this.readyToDive = true;
      }
    }, 1111);
  }

  onClickArea(e: MouseEvent) {
    if (get(objectivesApi).currentIs("obj_learn-controls")) {
      get(objectivesApi).completeTask("task_move-sub");
    }

    moveSub(e);
  }

  onClickDive() {
    const objectives = get(objectivesApi);
    if (objectives.currentIs("obj_make-observations")) {
      get(hudApi).showNotepad = false;
      objectives.completeTask("task_dive");
    }

    this.readyToDive = false;
    this.surfaceSub = false;

    setTimeout(() => {
      get(gameApi).fadeScene("/wrecks?from=surface");
      get(audioApi).stopTrack({
        src: "sound/ocean-loop.mp3",
      });
    }, 1000);
  }

  startTutorial() {
    const objectives = get(objectivesApi);

    objectives.startChapter("tutorial", () => {});
    objectives.attachStartCallback("obj_mission", () => {
      this.startMissionBrief();
    });
  }

  startMissionBrief() {
    const hud = get(hudApi);
    hud.startDialog({
      keys: [...missionBrief],
      onFinished: () => {
        get(objectivesApi).completeTask("task_start-mission");
        this.unlockItems();
      },
    });
  }

  unlockItems() {
    const hud = get(hudApi);

    hud.startItemUnlock({
      itemId: "sm",
      onFinished: () => {
        hud.startItemUnlock({
          itemId: "notepad",
          onFinished: () => {
            objectives.attachStartCallback("obj_make-observations", () => {
              this.readyToDive = true;
            });
            // this.startChapter1();
          },
        });
      },
    });
  }

  startChapter1() {
    const objectives = get(objectivesApi);
    objectives.startChapter("chapter1", () => {});
    objectives.attachStartCallback("obj_make-observations", () => {
      this.readyToDive = true;
    });
  }
}

export default writable<SurfaceEvents>(new SurfaceEvents());
