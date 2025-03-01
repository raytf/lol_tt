import { writable, get } from "svelte/store";

class Chapter1State {
  startedObservationTask = $state(false);
  completedObservationTask = $state(false);
  forestUnlocked = $state(false);
  observedList = $state<string[]>([]);

  get numObserved() {
    return this.observedList.length;
  }
}

export default writable(new Chapter1State());
