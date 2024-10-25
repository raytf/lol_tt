import { writable } from "svelte/store";

interface Todo {
  key: string;
  counterTarget?: number;
}

export interface Task {
  key: string;
  counter?: number;
  counterTarget?: number;
  completed?: boolean;
}

type Objective = {
  [key: string]: Todo[];
};

export const objectiveMap: Objective = {
  objective_prepare: [{ key: "task_openInventory" }, { key: "task_reviewSM" }],
};

class HudApi {
  activated = $state(false);
  showObjectives = $state(false);
  currentObjective = $state<string>("");
  currentTasks = $state<Task[]>([]);

  startObjective = (objectiveKey: string) => {
    if (!objectiveMap[objectiveKey]) return;

    this.currentObjective = objectiveKey;
    this.currentTasks = objectiveMap[objectiveKey].map((todo) => ({
      key: todo.key,
      completed: false,
    }));
    this.showObjectives = true;
  };

  completeTask = (taskKey: string) => {
    const task = this.currentTasks.find((task) => task.key === taskKey);
    if (task) {
      task.completed = true;
    }
  };
}

export const hudApi = writable<HudApi>(undefined);

export function initializeHudApi() {
  hudApi.set(new HudApi());
}
