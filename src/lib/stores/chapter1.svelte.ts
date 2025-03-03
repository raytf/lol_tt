import { writable, get } from "svelte/store";

class Chapter1State {
  startedObservationTask = $state(false);
  completedObservationTask = $state(false);
  forestUnlocked = $state(false);
  observedList = $state<string[]>([]);
  visitedTop = $state(false);
  visitedMiddle = $state(false);
  visitedBottom = $state(false);

  get numObserved() {
    return this.observedList.length;
  }
}

export default writable(new Chapter1State());
