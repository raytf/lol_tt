import { writable, get } from "svelte/store";
import type { Objective } from "$apis/objectives.svelte";
import type { DialogKey, DialogOption } from "$apis/dialog.svelte";
import { objectivesApi, dialogApi, inventoryApi } from "$apis";

interface StartObjectivesParams {
  chapterKey: string;
  objectives: Objective[];
  onFinished?: () => void;
}

interface StartDialogParams {
  keys: DialogKey[];
  onFinished?: () => void;
  blockInput?: boolean;
}

interface StartItemUnlockParams {
  itemId: string;
  onFinished?: () => void;
}

class HudApi {
  activated = $state(true);
  showObjectives = $state(false);
  showDialog = $state(false);
  showInventory = $state(false);
  showItemUnlock = $state(false);
  showSmModal = $state(false);
  showSmPuzzle = $state(false);
  showNotepad = $state(false);

  flipElement = $state<HTMLElement | null>(null);

  debugActivate() {
    this.activated = true;
    //get(inventoryApi).unlockEverything();
    this.showInventory = true;
  }

  startChapter(params: StartObjectivesParams) {
    const { chapterKey, objectives, onFinished } = params;

    const oApi = get(objectivesApi);
    oApi.chapterFinished = false;
    oApi.currentChapter = chapterKey;
    oApi.currentObjectives = [...objectives];
    oApi.currentObjectiveIndex = 0;
    if (onFinished)
      oApi.onChapterFinished = () => {
        this.showObjectives = false;
        onFinished();
      };
    oApi.startObjective();

    this.showObjectives = true;
  }

  startDialog(params: StartDialogParams) {
    const { keys, onFinished, blockInput } = params;

    const dApi = get(dialogApi);
    dApi.blockInput = blockInput || false;
    dApi.currentDialog = [...keys];
    if (onFinished) dApi.onDialogFinished = onFinished;

    this.showDialog = true;
  }
  startHintDialog() {
    const dApi = get(dialogApi);
    const oApi = get(objectivesApi);
    dApi.currentDialog = oApi.getCurrentHintDialog();

    this.showDialog = true;
  }
  endDialog() {
    this.showDialog = false;

    const dApi = get(dialogApi);
    dApi.currentDialog = [];
    dApi.onDialogFinished();
    dApi.onDialogFinished = () => {};
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
