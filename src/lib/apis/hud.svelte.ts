import { writable } from "svelte/store";

interface Todo {
  key: string;
  counterTarget?: number;
}

type ObjectiveMap = {
  [key: string]: Todo[];
};

export interface Task {
  key: string;
  counter?: number;
  counterTarget?: number;
  completed?: boolean;
}

type Objective = {
  key: string;
  completed: boolean;
};

export const objectiveMap: ObjectiveMap = {
  objective_prepare: [{ key: "task_openInventory" }, { key: "task_reviewSM" }],
};

class HudApi {
  activated = $state(false);
  currentObjective = $state<Objective>();
  currentTasks = $state<Task[]>([]);
  onFinishObjective = () => {};

  startObjective = (objectiveKey: string, onFinished: () => void) => {
    if (!objectiveMap[objectiveKey]) return;

    this.currentObjective = { key: objectiveKey, completed: false };
    this.currentTasks = objectiveMap[objectiveKey].map((todo) => ({
      key: todo.key,
      completed: false,
    }));
    this.onFinishObjective = onFinished;
  };

  completeTask = (taskKey: string) => {
    const task = this.currentTasks.find((task) => task.key === taskKey);
    if (task) {
      task.completed = true;
      if (this.getNumRemainingTasks() === 0) {
        if (this.currentObjective) {
          this.currentObjective.completed = true;
        }
        this.onFinishObjective();
      }
    }
  };

  getNumRemainingTasks = () => {
    return this.currentTasks.filter((task) => !task.completed).length;
  };
}

export const hudApi = writable<HudApi>(undefined);

export function initializeHudApi() {
  hudApi.set(new HudApi());
}
