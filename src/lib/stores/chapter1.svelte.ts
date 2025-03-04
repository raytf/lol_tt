import { writable, get } from "svelte/store";

class Chapter1State {
  startedObservationTask = $state(false);
  completedObservationTask = $state(false);
  forestUnlocked = $state(false);
  wrecksObserved = $state<string[]>([]);
  depthsObserved = $state<string[]>([]);
  visitedTop = $state(false);
  visitedMiddle = $state(false);
  visitedBottom = $state(false);

  get numWrecksObserved() {
    return this.wrecksObserved.length;
  }

  get numDepthsObserved() {
    return this.depthsObserved.length;
  }
}

export default writable(new Chapter1State());
