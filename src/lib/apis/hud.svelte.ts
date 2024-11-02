import { writable } from "svelte/store";

class HudApi {
  activated = $state(false);
  showObjectives = $state(false);
  showInventory = $state(false);
  showSmModal = $state(false);
  showSmPuzzle = $state(false);
}

export const hudApi = writable<HudApi>(new HudApi());
