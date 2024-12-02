import { writable, get } from "svelte/store";
import type { DialogKey, DialogOption } from "$apis/dialog.svelte";
import { objectivesApi, dialogApi, inventoryApi, smApi } from "$apis";

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
  showDebug = $state(true);
  showObjectives = $state(false);
  showDialog = $state(false);
  showInventory = $state(false);
  showItemUnlock = $state(false);
  showSmModal = $state(false);
  showSmPuzzle = $state(false);
  showNotepad = $state(false);

  debugActivate() {
    //get(inventoryApi).unlockEverything();
    this.showInventory = true;
  }

  openSmModalWithDialog() {
    const sm = get(smApi);
    sm.modalClass = "pt-[111px]";
    sm.isInteractable = false;
    this.showSmModal = true;
  }
  closeSmModalWithDialog() {
    this.showSmModal = false;
    const sm = get(smApi);
    sm.reset();
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
