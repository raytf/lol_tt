import { writable, get } from "svelte/store";
import { objectivesApi, hudApi, lolApi } from "$apis";
import {
  incomingCall,
  noSignal,
  observationTask,
  observationReview,
  response,
} from "$dialog/radio";
import { missionBrief } from "$dialog/tutorial";

type HintMap = {
  [key: string]: DialogKey[];
};

const radioDialogMap: HintMap = {
  "": [],
  tutorial: observationTask,
};

class RadioApi {
  onCall = () => {};

  attachCallback(onCall: () => void) {
    this.onCall = onCall;
  }

  clearCallback() {
    this.onCall = () => {};
  }

  call(location: string) {
    const hud = get(hudApi);
    if (!location.includes("surface")) {
      hud.startDialog({
        keys: noSignal,
      });
      return;
    }

    this.onCall?.();
    return;

    // const objectives = get(objectivesApi);
    // if (objectives.currentObjectiveIs("obj_mission")) {
    //   hud.startDialog({
    //     keys: missionBrief,
    //     // disabledOptions: ["tut_brief2_o2", "tut_brief2_o3"],
    //     onFinished: () => {
    //       //objectives.completeTask("task_start-mission");
    //     },
    //   });
    //   objectives.completeTask("task_call-radio");
    //   return;
    // }

    // if (objectives.currentObjectiveIs("obj_review-observations")) {
    //   objectives.completeTask("task_contact-mc2");
    //   hud.startDialog({
    //     keys: observationReview,
    //     onFinished: () => {
    //       //get(lolApi).complete();
    //     },
    //   });
    //   return;
    // }

    // const dialog = [response(radioDialogMap[objectives.currentChapter])];
    // hud.startDialog({
    //   keys: dialog,
    // });
  }

  incomingCall() {
    const hud = get(hudApi);
    hud.startDialog({
      keys: incomingCall,
    });
  }
}

export const radioApi = writable<RadioApi>(new RadioApi());
