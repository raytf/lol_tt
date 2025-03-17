import { writable, get } from "svelte/store";

class WrecksState {
  observed = $state<string[]>([]);
  hypothesisKey = $state<string>("");
  forestUnlocked = $state(false);
  conchEncountered = $state(false);

  get numObserved() {
    return this.observed.length;
  }

  get hypothesisCorrect() {
    return this.hypothesisKey === "ch1_color-h3";
  }
}

export default writable(new WrecksState());
