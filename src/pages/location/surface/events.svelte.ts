import { writable, get } from "svelte/store";
import {
  hudApi,
  gameApi,
  audioApi,
  objectivesApi,
  inventoryApi,
  radioApi,
} from "$apis";
import { missionBrief } from "$dialog/tutorial";
import { setTarget as setSubTarget } from "$stores/sub";
import { moveSub } from "$stores/exploration";

const audio = get(audioApi);
const objectives = get(objectivesApi);
const inventory = get(inventoryApi);

class SurfaceEvents {
  surfaceSub = $state(true);
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
        }, 2222);
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
  }

  startChapter1() {
    const objectives = get(objectivesApi);
    objectives.startChapter("chapter1", () => {});
  }
}

export default writable<SurfaceEvents>(new SurfaceEvents());
