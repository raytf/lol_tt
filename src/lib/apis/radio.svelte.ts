import { writable, get } from "svelte/store";
import { objectivesApi, hudApi, lolApi } from "$apis";
import {
  incomingCall,
  noSignal,
  observationTask,
  observationReview,
  response,
} from "$dialog/radio";

type HintMap = {
  [key: string]: DialogKey[];
};

const radioDialogMap: HintMap = {
  "": [],
  tutorial: observationTask,
};

class RadioApi {
  // onCall = () => {};
  call(location: string) {
    const hud = get(hudApi);
    if (!location.includes("surface")) {
      hud.startDialog({
        keys: noSignal,
      });
      return;
    }

    const objectives = get(objectivesApi);
    if (objectives.currentObjectiveIs("obj_answer-radio")) {
      objectives.completeTask("task_open-radio");
      return;
    }

    if (objectives.currentObjectiveIs("obj_review-observations")) {
      objectives.completeTask("task_contact-mc2");
      hud.startDialog({
        keys: observationReview,
        onFinished: () => {
          //get(lolApi).complete();
        },
      });
      return;
    }

    const dialog = [response(radioDialogMap[objectives.currentChapter])];
    hud.startDialog({
      keys: dialog,
    });
  }

  incomingCall() {
    const hud = get(hudApi);
    hud.startDialog({
      keys: incomingCall,
    });
  }
}

export const radioApi = writable<RadioApi>(new RadioApi());
