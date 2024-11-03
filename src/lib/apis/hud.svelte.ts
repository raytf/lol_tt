import { writable, get } from "svelte/store";
import type { Objective } from "$apis/objectives.svelte";
import type { DialogKey } from "$components/hud/dialog";
import { objectivesApi, dialogApi, inventoryApi } from "$apis";

interface StartObjectivesParams {
  chapterKey: string;
  objectives: Objective[];
}

interface StartDialogParams {
  keys: DialogKey[];
  onFinished?: () => void;
}

interface StartItemUnlockParams {
  itemId: string;
  onFinished?: () => void;
}

class HudApi {
  activated = $state(false);
  showObjectives = $state(false);
  showDialog = $state(false);
  showInventory = $state(false);
  showItemUnlock = $state(false);
  showSmModal = $state(false);
  showSmPuzzle = $state(false);

  startChapter(params: StartObjectivesParams) {
    const { chapterKey, objectives } = params;

    const oApi = get(objectivesApi);
    oApi.currentChapter = chapterKey;
    oApi.currentObjectives = [...objectives];
    oApi.currentObjectiveIndex = 0;
    oApi.startObjective();

    this.showObjectives = true;
  }
  endChapter() {
    console.log("chapter finished");
  }

  startDialog(params: StartDialogParams) {
    const { keys, onFinished } = params;

    const dApi = get(dialogApi);
    dApi.currentDialog = [...keys];
    dApi.onDialogFinished = () => {};
    if (onFinished) dApi.onDialogFinished = onFinished;

    this.showDialog = true;
  }
  endDialog() {
    this.showDialog = false;

    const dApi = get(dialogApi);
    dApi.currentDialog = [];
    dApi.onDialogFinished();
  }

  startItemUnlock(params: StartItemUnlockParams) {
    const { itemId, onFinished } = params;

    const iApi = get(inventoryApi);
    iApi.newItemUnlock = itemId;
    iApi.unlockItem(itemId);
    iApi.onItemUnlockFinished = () => {};
    if (onFinished) iApi.onItemUnlockFinished = onFinished;

    this.showItemUnlock = true;
  }
  endItemUnlock() {
    this.showItemUnlock = false;

    const iApi = get(inventoryApi);
    iApi.newItemUnlock = "";
    iApi.onItemUnlockFinished();
  }
}

export const hudApi = writable<HudApi>(new HudApi());
