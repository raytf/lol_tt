import { writable, get } from "svelte/store";
import { hudApi, gameApi, audioApi, objectivesApi, inventoryApi } from "$apis";
import { checkIn, missionBrief } from "$dialog/radio";
import { setTarget as setSubTarget } from "$stores/sub";
import { hideHeading, tlRevealHeading } from "./animations";

class SurfaceEvents {
  tutorialComplete = $state(false);
  surfaceSub = $state(false);
  readyToDive = $state(false);

  onStart() {
    get(audioApi).playTrack({
      src: "sound/ocean-loop.mp3",
      volume: 0.08,
      loop: true,
    });

    let tlHeading = tlRevealHeading();
    setTimeout(() => {
      this.surfaceSub = true;
      tlHeading.reverse();

      setTimeout(() => {
        if (this.tutorialComplete) {
          this.readyToDive = true;
        } else {
          //startMissionBrief();
          this.startTutorial();
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
      this.startMissionBrief();
    });
  }

  startMissionBrief() {
    const hud = get(hudApi);
    hud.startDialog({
      keys: [...checkIn, ...missionBrief],
      onFinished: () => {
        hud.startItemUnlock({
          itemId: "sm",
          onFinished: () => {
            hud.startItemUnlock({
              itemId: "notepad",
              onFinished: () => {
                this.readyToDive = true;
                this.startChapter1();
              },
            });
          },
        });
      },
    });
  }

  startChapter1() {
    const objectives = get(objectivesApi);
    objectives.startChapter("chapter1", () => {});
  }
}

export const events = writable<SurfaceEvents>(new SurfaceEvents());
