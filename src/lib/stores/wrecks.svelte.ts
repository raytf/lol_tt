import { writable, get } from "svelte/store";
import type { Spring } from "svelte/motion";

class WrecksState {
  observed = $state<string[]>([]);
  questionKey = $state<string>("");
  hypothesisKey = $state<string>("");
  forestUnlocked = $state(false);
  conchEncountered = $state(false);
  previousGridOffset = $state({ x: 0, y: 0 });

  get numObserved() {
    return this.observed.length;
  }

  get hypothesisCorrect() {
    return this.hypothesisKey === "ch1_color-h3";
  }
}

export default writable(new WrecksState());
