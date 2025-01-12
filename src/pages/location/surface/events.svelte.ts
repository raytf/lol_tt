import { writable, get } from "svelte/store";
import {
  hudApi,
  gameApi,
  audioApi,
  objectivesApi,
  inventoryApi,
  radioApi,
} from "$apis";
import { missionBrief } from "$dialog/radio";
import { setTarget as setSubTarget } from "$stores/sub";
import { moveSub } from "$stores/exploration";

const audio = get(audioApi);
const objectives = get(objectivesApi);
const inventory = get(inventoryApi);

class SurfaceEvents {
  surfaceSub = $state(false);
  readyToDive = $state(false);

  onEnter(searchParams: URLSearchParams) {
    audio.playTrack({
      src: "sound/ocean-loop.mp3",
      volume: 0.08,
      loop: true,
    });

    setTimeout(() => {
      this.surfaceSub = true;

      if (searchParams.has("start")) {
        setTimeout(() => {
          if (!objectives.hasCompleted("obj_review-observations")) {
            this.startTutorial();
          }

          if (objectives.hasCompleted("obj_prepare")) {
            this.readyToDive = true;
          }
        }, 1111);
      } else {
        //this.readyToDive = true;
      }
    }, 1111);
  }

  onClickArea(e: MouseEvent) {
    if (get(objectivesApi).currentObjectiveIs("obj_learn-controls")) {
      get(objectivesApi).completeTask("task_move-sub");
    }

    moveSub(e);
  }

  onClickDive() {
    const objectives = get(objectivesApi);
    if (objectives.currentObjectiveIs("obj_make-observations")) {
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
      keys: missionBrief,
      disabledOptions: ["tut_brief2_o2", "tut_brief2_o3"],
      onFinished: () => {
        get(objectivesApi).completeTask("task_start-mission");
        objectives.attachStartCallback("obj_make-observations", () => {
          this.readyToDive = true;
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
