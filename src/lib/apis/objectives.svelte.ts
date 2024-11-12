import { writable, get } from "svelte/store";
import type { DialogKey, DialogOption } from "$apis/dialog.svelte";
import { toast } from "@zerodevx/svelte-toast";
import { lolApi } from "$apis";
// Assets
import radio from "$assets/icons/radio.svg";
import neutral from "$assets/emoji/neutral.svg";
import hushed from "$assets/emoji/hushed.svg";
import thinking from "$assets/emoji/thinking.svg";
import wink from "$assets/emoji/wink.svg";

const defaultHint: DialogKey = {
  imgSrc: radio,
  name: "mission-control",
  text: "hint-1",
  options: [
    {
      text: "hint-1_o1-default",
      imgSrc: wink,
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

interface Todo {
  key: string;
  numTimes?: number;
}

type ObjectiveMap = {
  [key: string]: Todo[];
};

interface Task {
  key: string;
  currentNum?: number;
  numTimes?: number;
  completed?: boolean;
}

export type Objective = {
  key: string;
  completed: boolean;
  onFinished?: () => void;
};

const objectiveMap: ObjectiveMap = {
  "obj_check-equipment": [
    { key: "task_open-inventory" },
    { key: "task_review-SM" },
  ],
  "obj_learn-controls": [{ key: "task_move-sub" }, { key: "task_dive" }],
  "obj_wrecks-observation": [
    { key: "task_tool-record" },
    { key: "task_record-observation" },
  ],
};

type HintMap = {
  [key: string]: DialogOption[];
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

class ObjectivesApi {
  currentChapter = $state<string>("");
  currentObjectives = $state<Objective[]>([]);
  currentObjectiveIndex = $state(0);
  currentObjective = $state<Objective>();
  currentTasks = $state<Task[]>([]);
  chapterFinished = $state(false);
  onChapterFinished = () => {};

  getNumRemainingTasks = () => {
    return this.currentTasks.filter((task) => !task.completed).length;
  };

  getCurrentHintDialog = () => {
    if (this.currentObjective) {
      const key = this.currentObjective.key;
      if (key in hintOptionsMap) {
        const hintOptions = hintOptionsMap[key];
        let hint = { ...defaultHint };
        if (hint.options) hint.options.push(...hintOptions);
        return [hint];
      }
    }
    return [defaultHint];
  };

  startObjective = () => {
    this.currentObjective = this.currentObjectives[this.currentObjectiveIndex];
    if (this.currentObjective) {
      this.currentTasks = objectiveMap[this.currentObjective.key].map(
        (todo) => ({
          key: todo.key,
          completed: false,
        }),
      );
    }
  };

  completeTask = (taskKey: string) => {
    const task = this.currentTasks.find(
      (task) => task.key === taskKey && !task.completed,
    );
    if (task) {
      task.completed = true;
      if (this.getNumRemainingTasks() === 0) {
        this.completeObjective();
      }
    }
  };

  completeObjective = () => {
    if (this.currentObjective) {
      const lApi = get(lolApi);
      let message = `<strong>${lApi.getText("completed-obj")}:</strong><br>`;
      message += lApi.getText(this.currentObjective.key);
      toast.push(message, {
        initial: 0,
        next: 1,
        duration: 2222,
        theme: {
          "--toastColor": "mintcream",
          "--toastBackground": "rgba(72,187,120,0.9)",
          "--toastBarBackground": "#2F855A",
        },
      });
      this.currentObjective.completed = true;
      this.currentObjective.onFinished?.();
    }

    this.currentObjectiveIndex += 1;
    this.startObjective();

    if (this.currentObjectiveIndex >= this.currentObjectives.length) {
      this.chapterFinished = true;
      setTimeout(() => {
        this.onChapterFinished();
      }, 4444);
    }
  };
}

export const objectivesApi = writable<ObjectivesApi>(new ObjectivesApi());
