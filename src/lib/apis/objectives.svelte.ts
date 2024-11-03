import { writable } from "svelte/store";

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
    { key: "task_call-radio" },
  ],
  "obj_learn-controls": [{ key: "task_move-sub" }],
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
      this.currentObjective.completed = true;
      this.currentObjective.onFinished?.();
    }

    const nextIndex = this.currentObjectiveIndex + 1;

    if (nextIndex >= this.currentObjectives.length) {
      this.chapterFinished = true;
      setTimeout(() => {
        this.onChapterFinished();
      }, 4444);
      return;
    }

    setTimeout(() => {
      this.currentObjectiveIndex = nextIndex;
      this.startObjective();
    }, 2222);
  };
}

export const objectivesApi = writable<ObjectivesApi>(new ObjectivesApi());
