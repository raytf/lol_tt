import { writable, get } from "svelte/store";
import { toast } from "@zerodevx/svelte-toast";
import {
  lolApi,
  hudApi,
  notepadApi,
  inventoryApi,
  radioApi,
  smApi,
} from "$apis";

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
  obj_mission: [
    { key: "task_open-inventory" },
    { key: "task_call-radio" },
    { key: "task_start-mission" },
  ],
  "obj_prepare-notepad": [
    { key: "task_open-notepad" },
    { key: "task_new-page" },
  ],
  obj_explore: [{ key: "task_move-sub" }, { key: "task_dive" }],

  "obj_start-sm": [{ key: "task_open-sm" }, { key: "task_review-o" }],
  "obj_explore-wrecks": [{ key: "task_enter-wrecks" }, { key: "task_make-o" }],
  "obj_depth-o": [
    { key: "task_visit-depths", numTimes: 3 },
    {
      key: "task_record-depth-o",
    },
  ],
  "obj_explore-forest": [
    { key: "task_enter-forest" },
    { key: "task_record-o" },
  ],

  "obj_review-observations": [
    { key: "task_contact-mc2" },
    { key: "task_show-observations" },
  ],
  obj_question: [{ key: "task_ask-question" }],
};

const chapterMap: ChapterMap = {
  tutorial: [
    {
      key: "obj_mission",
      onStart: () => {
        get(hudApi).enableInventory = true;
      },
      onFinished: () => {
        const inventory = get(inventoryApi);
        inventory.unlockItem("radio");
        inventory.unlockItem("pg");
        inventory.unlockItem("th");
        inventory.unlockItem("notepad");
        inventory.unlockItem("sm");
      },
    },
    {
      key: "obj_prepare-notepad",
      onFinished: () => {
        get(notepadApi).newPage("observations-wrecks", {
          type: "text",
          titleKey: "notepad-title_o",
          lines: [],
          delimiter: "- ",
        });
      },
    },
    {
      key: "obj_explore",
      onFinished: () => {},
    },
  ],
  chapter1: [
    {
      key: "obj_start-sm",
    },
    {
      key: "obj_explore-wrecks",
    },
    {
      key: "obj_prepare-notepad",
      onFinished: () => {
        get(notepadApi).newPage("observations-depth", {
          type: "table",
          titleKey: "notepad-title_depth-o",
          header: ["th_depth-level", "th_observation"],
          rows: [],
        });
      },
    },
    {
      key: "obj_depth-o",
    },
    {
      key: "obj_explore-forest",
    },
  ],
};

class ObjectivesApi {
  currentChapter = $state<string>("");
  currentObjectives = $state<Objective[]>([]);
  currentObjectiveIndex = $state(0);
  currentObjective = $state<Objective>();
  currentTasks = $state<Task[]>([]);
  chapterStarted = $state(false);
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

  currentChapterIs = (chapterKey: string) => {
    return this.currentChapter === chapterKey;
  };

  currentObjectiveIs = (objectiveKey: string) => {
    return this.currentObjective?.key === objectiveKey;
  };

  hasCompleted = (objectiveKey: string) => {
    return this.completedObjectives.includes(objectiveKey);
  };

  getNumRemainingTasks = () => {
    return this.currentTasks.filter((task) => !task.completed).length;
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
    console.log("Started chapter:", chapterKey);
    this.chapterStarted = true;
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

    if (this.currentObjectiveIndex < this.currentObjectives.length) {
      this.startObjective();

      get(hudApi).showObjectives = true;
    } else {
      this.chapterStarted = false;
    }
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
        (todo) => {
          if (todo.numTimes) {
            return {
              key: todo.key,
              completed: false,
              currentNum: 0,
              numTimes: todo.numTimes,
            };
          }

          return {
            key: todo.key,
            completed: false,
          };
        },
      );
      this.currentObjective.onStart?.();
    }
  };

  incrementTask = (taskKey: string, onSuccess?: () => void) => {
    const task = this.currentTasks.find(
      (task) => task.key === taskKey && !task.completed,
    );

    if (task && task.currentNum != undefined && task.numTimes) {
      task.currentNum++;
      if (task.currentNum >= task.numTimes) {
        task.completed = true;
        onSuccess?.();
        if (this.getNumRemainingTasks() === 0) {
          this.completeObjective();
        }
      }
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
    if (!this.hasCompleted(this.currentObjective.key)) {
      this.completedObjectives.push(this.currentObjective.key);
    }
    this.currentObjectiveIndex += 1;

    this.startObjective();

    if (this.currentObjectiveIndex >= this.currentObjectives.length) {
      this.completeChapter();
    }
    lApi.saveState();
  };

  completeChapter = () => {
    this.chapterStarted = false;
    this.chapterFinished = true;
    this.completedChapters.push(this.currentChapter);

    setTimeout(() => {
      get(hudApi).showObjectives = false;
      this.onChapterFinished();
    }, 1111);
  };
}

export const objectivesApi = writable<ObjectivesApi>(new ObjectivesApi());
