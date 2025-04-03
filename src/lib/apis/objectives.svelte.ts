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
import wrecks from "$stores/wrecks.svelte";
import forest from "$stores/forest.svelte";

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
  "obj_review-inventory": [
    { key: "task_open-notepad" },
    { key: "task_open-sm" },
  ],
  obj_explore: [{ key: "task_move-sub" }, { key: "task_dive" }],

  "obj_explore-wrecks": [
    { key: "task_enter-wrecks" },
    { key: "task_new-page" },
  ],
  "obj_wrecks-start": [
    { key: "task_observation" },
    { key: "task_question" },
    { key: "task_hypothesis" },
  ],
  "obj_wrecks-experiment": [
    {
      key: "task_new-page",
    },
    { key: "task_wrecks-record-data" },
  ],
  "obj_wrecks-review": [
    { key: "task_wrecks-analysis" },
    { key: "task_wrecks-conclusion" },
  ],

  "obj_explore-forest": [
    { key: "task_new-page" },
    { key: "task_enter-forest" },
  ],
  "obj_pressure-start": [
    { key: "task_observation" },
    { key: "task_question" },
    { key: "task_hypothesis" },
  ],
  "obj_pressure-plan": [
    { key: "task_new-page" },
    { key: "task_review-ind" },
    { key: "task_review-dep" },
    { key: "task_pressure-tool" },
    { key: "task_depth-tool" },
  ],
  "obj_pressure-experiment": [{ key: "task_record-pressure", numTimes: 4 }],
  "obj_pressure-review": [
    { key: "task_pressure-analysis" },
    { key: "task_pressure-conclusion" },
  ],
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
        inventory.unlockItem("notepad");
        inventory.unlockItem("sm");
      },
    },
    {
      key: "obj_review-inventory",
      onFinished: () => {},
    },
    {
      key: "obj_explore",
      onFinished: () => {},
    },
  ],
  chapter1: [
    {
      key: "obj_explore-wrecks",
      onFinished: () => {
        get(notepadApi).newPage("wrecks-notes", {
          type: "custom",
          lines: [],
        });
      },
    },
    {
      key: "obj_wrecks-start",
      onFinished: () => {
        const w = get(wrecks);
        if (w.questionKey === "") {
          w.questionKey = "np-wrecks-notes_question";
        }
        if (w.hypothesisKey === "") {
          w.hypothesisKey = "ch1_color-h3";
        }
        get(notepadApi).newPage("wrecks-notes", {
          type: "custom",
          lines: ["o_sunlight-surface"],
        });
      },
    },
    {
      key: "obj_wrecks-experiment",
      onFinished: () => {
        const lol = get(lolApi);
        get(notepadApi).newPage("wrecks-experiment", {
          type: "table",
          rows: [
            {
              data: [
                lol.getText("depth-shallow"),
                lol.getText("o_sunlight-surface"),
              ],
            },
            {
              data: [
                lol.getText("depth-medium"),
                lol.getText("o_color-change"),
              ],
            },
            { data: [lol.getText("depth-deep"), lol.getText("o_darkness")] },
          ],
          lines: [],
        });
      },
    },
    {
      key: "obj_wrecks-review",
      onFinished: () => {
        get(wrecks).forestUnlocked = true;
      },
    },
  ],
  chapter2: [
    {
      key: "obj_explore-forest",
      onFinished: () => {
        get(notepadApi).newPage("forest-notes", {
          type: "sm",
          observations: ["o_kelp-monster"],
        });
      },
    },
    {
      key: "obj_pressure-start",
      onFinished: () => {
        const notepad = get(notepadApi);
        const forestNotes = notepad.getPage("forest-notes") as SMPageData;

        notepad.newPage("forest-notes", {
          type: "sm",
          observations: ["o_kelp-monster", "o_warning-creak", "o_monster-deep"],
          question: forestNotes.question
            ? forestNotes.question
            : "ch2_pressure-q",
          hypothesis: forestNotes.hypothesis
            ? forestNotes.hypothesis
            : "ch2_pressure-h1",
        });
      },
    },
    {
      key: "obj_pressure-plan",
      onFinished: () => {
        get(inventoryApi).unlockItem("pg");
        get(wrecks).measuringUnlocked = true;
        get(notepadApi).newPage("pressure-experiment", {
          type: "experiment",
          rows: [],
        });
      },
    },
    {
      key: "obj_pressure-experiment",
      onFinished: () => {
        get(notepadApi).newPage("pressure-experiment", {
          type: "experiment",
          rows: [
            { data: ["0", "101.33"] },
            { data: ["50", "607.95"] },
            { data: ["100", "1114.58"] },
            { data: ["150", "1621.20"] },
          ],
        });
      },
    },
    {
      key: "obj_pressure-review",
      onFinished: () => {
        get(notepadApi).newPage("pressure-experiment", {
          type: "experiment",
          rows: [
            { data: ["0", "101.33"] },
            { data: ["50", "607.95"] },
            { data: ["100", "1114.58"] },
            { data: ["150", "1621.20"] },
          ],
          showGraph: true,
          showConclusion: true,
        });
      },
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
    this.completedChapters = [...this.completedChapters, this.currentChapter];

    setTimeout(() => {
      get(hudApi).showObjectives = false;
      this.onChapterFinished();
    }, 1111);
  };
}

export const objectivesApi = writable<ObjectivesApi>(new ObjectivesApi());
