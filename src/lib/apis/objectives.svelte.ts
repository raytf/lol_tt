import { writable, get } from "svelte/store";
import type { DialogKey, DialogOption } from "$apis/dialog.svelte";
import { toast } from "@zerodevx/svelte-toast";
import { lolApi, hudApi, notepadApi, inventoryApi } from "$apis";
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

interface BaseTask {
  key: string;
  completed?: boolean;
}

export interface Task extends BaseTask {
  currentNum?: number;
  numTimes?: number;
}

interface Objective extends BaseTask {
  onStart?: () => void;
  onFinished?: () => void;
}

type ObjectiveMap = {
  [key: string]: Todo[];
};

type ChapterMap = {
  [key: string]: Objective[];
};

const objectiveMap: ObjectiveMap = {
  "obj_learn-controls": [{ key: "task_move-sub" }],
  "obj_check-equipment": [
    { key: "task_open-inventory" },
    { key: "task_contact-mc" },
  ],
  obj_mission: [{ key: "task_start-mission" }],
  obj_prepare: [{ key: "task_open-notepad" }, { key: "task_new-page" }],
  "obj_make-observations": [
    { key: "task_dive" },
    { key: "task_record-observations" },
  ],
  "obj_review-observations": [{ key: "task_contact-mc2" }],
  "obj_wrecks-question": [
    { key: "task_review-observations" },
    { key: "task_ask-question" },
  ],
};

const chapterMap: ChapterMap = {
  tutorial: [
    {
      key: "obj_learn-controls",
    },
    {
      key: "obj_check-equipment",
      onStart: () => {
        get(hudApi).showInventory = true;
      },
    },
    {
      key: "obj_mission",
      onFinished: () => {
        get(inventoryApi).unlockItem("sm");
        get(inventoryApi).unlockItem("notepad");
      },
    },
  ],
  chapter1: [
    {
      key: "obj_prepare",
      onFinished: () => {
        get(notepadApi).startObservationPage("notepad-title_observations");
      },
    },
    {
      key: "obj_make-observations",
    },
    {
      key: "obj_review-observations",
    },
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

  numTotalObjectives: number = 0;
  completedObjectives = $state<string[]>([]);
  completedChapters = $state<string[]>([]);

  constructor() {
    let numTotal = 0;
    for (const chapterKey in chapterMap) {
      numTotal += chapterMap[chapterKey].length;
    }
    this.numTotalObjectives = numTotal;
  }

  currentIs = (objectiveKey: string) => {
    return this.currentObjective?.key === objectiveKey;
  };

  hasCompleted = (objectiveKey: string) => {
    return this.completedObjectives.includes(objectiveKey);
  };

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

  recallCompletedChapters = () => {
    this.completedChapters.forEach((chapterKey) => {
      const objectives = chapterMap[chapterKey];
      objectives.forEach((objective) => {
        objective.onStart?.();
        objective.onFinished?.();
      });
    });
  };

  startChapter = (chapterKey: string, onFinished?: () => void) => {
    this.chapterFinished = false;
    this.currentChapter = chapterKey;

    this.currentObjectiveIndex = 0;
    this.currentObjectives = chapterMap[chapterKey].map((objective) => {
      let isCompleted = false;

      if (this.completedObjectives.includes(objective.key)) {
        // If the objective has already been completed
        isCompleted = true;
        objective.onStart?.();
        objective.onFinished?.();
        this.currentObjectiveIndex++;
      }

      return {
        key: objective.key,
        completed: isCompleted,
        onStart: objective.onStart,
        onFinished: objective.onFinished,
      };
    });

    this.onChapterFinished = onFinished || (() => {});

    if (this.currentObjectiveIndex >= this.currentObjectives.length) {
      this.completeChapter();
    } else {
      this.startObjective();
    }

    get(hudApi).showObjectives = true;
  };

  attachStartCallback = (objectiveKey: string, onStart: () => void) => {
    const objective = this.currentObjectives.find(
      (obj) => obj.key === objectiveKey,
    );
    if (objective) {
      objective.onStart = onStart;
    }
    if (this.currentObjective && this.currentObjective.key === objectiveKey) {
      onStart();
    }
  };

  attachFinishedCallback = (objectiveKey: string, onFinished: () => void) => {
    const objective = this.currentObjectives.find(
      (obj) => obj.key === objectiveKey,
    );
    if (objective) {
      objective.onFinished = onFinished;
    }
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
      this.currentObjective.onStart?.();
    }
  };

  completeTask = (taskKey: string, onSuccess?: () => void) => {
    const task = this.currentTasks.find(
      (task) => task.key === taskKey && !task.completed,
    );
    if (task) {
      task.completed = true;
      onSuccess?.();
      if (this.getNumRemainingTasks() === 0) {
        this.completeObjective();
      }
    }
  };

  completeObjective = () => {
    if (!this.currentObjective) return;

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
    this.completedObjectives.push(this.currentObjective.key);
    this.currentObjectiveIndex += 1;

    this.startObjective();

    if (this.currentObjectiveIndex >= this.currentObjectives.length) {
      this.completeChapter();
    }
    lApi.saveState();
  };

  completeChapter = () => {
    this.chapterFinished = true;
    this.completedChapters.push(this.currentChapter);

    setTimeout(() => {
      get(hudApi).showObjectives = false;
      this.onChapterFinished();
    }, 2222);
  };
}

export const objectivesApi = writable<ObjectivesApi>(new ObjectivesApi());
