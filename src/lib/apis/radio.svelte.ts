import { writable, get } from "svelte/store";
import type { DialogKey, DialogOption } from "$apis/dialog.svelte";
import { objectivesApi, hudApi } from "$apis";
import { noSignal, observationReview } from "$dialog/radio";
import radio from "$assets/icons/radio.svg";
import { neutral, hushed, thinking, grin } from "$assets/emoji";

type HintMap = {
  [key: string]: DialogOption[];
};

const defaultHint: DialogKey = {
  imgSrc: radio,
  name: "mission-control",
  text: "hint-1",
  options: [
    {
      text: "hint-1_o1-default",
      imgSrc: grin,
      nextDialog: [
        {
          imgSrc: radio,
          name: "mission-control",
          text: "hint-1_o1-default-1",
        },
      ],
    },
  ],
};

const hintOptionsMap: HintMap = {
  "obj_check-equipment": [
    {
      text: "brief-2_o2",
      imgSrc: neutral,
      repeat: true,
      nextDialog: [
        {
          imgSrc: radio,
          name: "mission-control",
          text: "brief-2_o2-1",
        },
        {
          imgSrc: radio,
          name: "mission-control",
          text: "brief-2_o2-2",
        },
        {
          imgSrc: radio,
          name: "mission-control",
          text: "brief-2_o2-3",
          options: [
            {
              text: "brief-2_o2-3_o1",
              imgSrc: hushed,
              nextDialog: [
                {
                  imgSrc: radio,
                  name: "mission-control",
                  text: "brief-2_o2-3_o1-1",
                },
                {
                  imgSrc: radio,
                  name: "mission-control",
                  text: "brief-2_o2-3_o1-2",
                },
              ],
            },
            {
              text: "brief-2_o2-3_o2",
              imgSrc: neutral,
              nextDialog: [],
            },
          ],
        },
      ],
    },
    {
      text: "brief-2_o3",
      imgSrc: thinking,
      repeat: true,
      nextDialog: [
        {
          imgSrc: radio,
          name: "mission-control",
          text: "brief-2_o3-1",
        },
        {
          imgSrc: radio,
          name: "mission-control",
          text: "brief-2_o3-2",
        },
        {
          imgSrc: radio,
          name: "mission-control",
          text: "brief-2_o3-3",
        },
      ],
    },
  ],
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
    if (objectives.currentIs("obj_check-equipment")) {
      objectives.completeTask("task_contact-mc");
      return;
    }

    if (objectives.currentIs("obj_review-observations")) {
      objectives.completeTask("task_contact-mc2");
      hud.startDialog({
        keys: observationReview,
      });
    }
  }

  getCurrentHintDialog = () => {
    const objectives = get(objectivesApi);
    if (objectives.currentObjective) {
      const key = objectives.currentObjective.key;
      if (key in hintOptionsMap) {
        const hintOptions = hintOptionsMap[key];
        let hint = { ...defaultHint };
        if (hint.options) hint.options.push(...hintOptions);
        return [hint];
      }
    }
    return [defaultHint];
  };
}

export const radioApi = writable<RadioApi>(new RadioApi());
