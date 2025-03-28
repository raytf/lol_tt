import { writable, get } from "svelte/store";

class ForestState {
  monsterActivated = $state(false);
  encounteredMonster = $state(false);
  questionKey = $state<string>("");
  hypothesisKey = $state<string>("");
  abyssUnlocked = $state(false);
}

export default writable(new ForestState());
