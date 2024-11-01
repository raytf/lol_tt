import { writable } from "svelte/store";

interface Todo {
  key: string;
  numTimes?: number;
}

type ChapterMap = {
  [key: string]: string[];
};

type ObjectiveMap = {
  [key: string]: Todo[];
};

export interface Task {
  key: string;
  currentNum?: number;
  numTimes?: number;
  completed?: boolean;
}

type Objective = {
  key: string;
  completed: boolean;
  onFinished?: () => void;
};

const objectiveMap: ObjectiveMap = {
  "obj_check-equipment": [
    { key: "task_open-inventory" },
    { key: "task_review-SM" },
    { key: "task_call-radio" },
  ],
  "obj_learn-controls": [{ key: "task_move-sub" }],
};

class HudApi {
  activated = $state(false);
  // Objectives
  currentChapter = $state<string>("");
  currentObjectives = $state<Objective[]>([]);
  currentObjectiveIndex = $state(0);
  currentTasks = $state<Task[]>([]);

  getCurrentObjective = () =>
    this.currentObjectives[this.currentObjectiveIndex];

  getNumRemainingTasks = () => {
    return this.currentTasks.filter((task) => !task.completed).length;
  };

  startChapter = (chapterKey: string, objectives: Objective[]) => {
    this.currentChapter = chapterKey;
    this.currentObjectives = [...objectives];

    this.currentObjectiveIndex = 0;
    this.startObjective();
  };

  startObjective = () => {
    const currentObjective = this.getCurrentObjective();
    if (currentObjective) {
      this.currentTasks = objectiveMap[currentObjective.key].map((todo) => ({
        key: todo.key,
        completed: false,
      }));
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
    const currentObjective = this.getCurrentObjective();
    if (currentObjective) {
      currentObjective.completed = true;
    }
    currentObjective.onFinished?.();

    setTimeout(() => {
      this.currentObjectiveIndex++;
      this.startObjective();
    }, 2222);
  };
}

export const hudApi = writable<HudApi>(undefined);

export function initializeHudApi() {
  hudApi.set(new HudApi());
}
