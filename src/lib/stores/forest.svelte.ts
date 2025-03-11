import { writable, get } from "svelte/store";

class ForestState {
  monsterActivated = $state(false);
  encounteredMonster = $state(false);
  abyssUnlocked = $state(false);
}

export default writable(new ForestState());
