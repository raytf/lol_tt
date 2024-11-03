import { writable, get } from "svelte/store";
import type { DialogKey } from "$components/hud/dialog";
import { dialogApi } from "$apis";
import keys from "../../pages/chapter1/dialog/missionBrief";

interface StartDialogOptions {
  keys: DialogKey[];
  onFinished?: () => void;
}

class HudApi {
  activated = $state(false);
  showObjectives = $state(false);
  showDialog = $state(false);
  showInventory = $state(false);
  showSmModal = $state(false);
  showSmPuzzle = $state(false);

  startDialog(options: StartDialogOptions) {
    get(dialogApi).currentDialog = [...options.keys];
    if (options.onFinished) get(dialogApi).onFinished = options.onFinished;
    this.showDialog = true;
  }
}

export const hudApi = writable<HudApi>(new HudApi());
