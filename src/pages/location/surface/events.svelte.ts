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
  surfaceSub = $state(false);
  readyToDive = $state(false);

  onStart(fromStart: boolean) {
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

      if (fromStart) {
        setTimeout(() => {
          if (!objectives.hasCompleted("obj_mission")) {
            this.startTutorial();
          } else {
            if (!objectives.hasCompleted("obj_prepare")) {
              this.prepareChapter1();
            } else {
              this.startChapter1();
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

    setSubTarget({ x: e.clientX, y: e.clientY });
  }

  onClickDive() {
    const objectives = get(objectivesApi);
    if (objectives.currentIs("obj_wrecks-observation")) {
      get(hudApi).showNotepad = false;
      objectives.completeTask("task_dive");
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

    objectives.startChapter("tutorial", () => {});
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
        this.prepareChapter1();
      },
    });
  }

  prepareChapter1() {
    const hud = get(hudApi);

    hud.startItemUnlock({
      itemId: "sm",
      onFinished: () => {
        hud.startItemUnlock({
          itemId: "notepad",
          onFinished: () => {
            this.startChapter1();
          },
        });
      },
    });
  }

  startChapter1() {
    const objectives = get(objectivesApi);
    objectives.startChapter("chapter1", () => {});
    objectives.attachStartCallback("obj_wrecks-observation", () => {
      this.readyToDive = true;
    });
  }
}

export const events = writable<SurfaceEvents>(new SurfaceEvents());
