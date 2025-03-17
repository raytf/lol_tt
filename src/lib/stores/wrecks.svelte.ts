import { writable, get } from "svelte/store";

class WrecksState {
  observed = $state<string[]>([]);
  hypothesisKey = $state<string>("");
  forestUnlocked = $state(false);

  get numObserved() {
    return this.observed.length;
  }
}

export default writable(new WrecksState());
