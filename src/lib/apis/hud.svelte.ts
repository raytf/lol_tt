import { writable, get } from "svelte/store";
import { Dialog } from "$apis/dialog.svelte";
import { objectivesApi, dialogApi, inventoryApi, smApi } from "$apis";

interface StartItemUnlockParams {
  itemId: string;
  onFinished?: () => void;
}

class HudApi {
  enabled = $state(true);
  showDebug = $state(true);
  showObjectives = $state(false);
  showDialog = $state(false);
  showInventory = $state(false);
  showItemUnlock = $state(false);
  showSmModal = $state(false);
  showSmPuzzle = $state(false);
  showNotepad = $state(false);
  showMap = $state(false);

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
    const dApi = get(dialogApi);
    const newParams = {
      ...params,
      onFinished: () => {
        params?.onFinished?.();
        this.endDialog();
      },
    };
    dApi.currentDialog = new Dialog(newParams);
    // dApi.blockInput = blockInput || false;
    // dApi.currentDialog = [...keys];
    // if (onFinished) dApi.onDialogFinished = onFinished;

    this.showDialog = true;
  }
  // startHintDialog() {
  //   const dApi = get(dialogApi);
  //   const oApi = get(objectivesApi);
  //   dApi.currentDialog = oApi.getCurrentHintDialog();

  //   this.showDialog = true;
  // }
  endDialog() {
    this.showDialog = false;

    const dApi = get(dialogApi);
    dApi.currentDialog = null;
    // dApi.currentDialog = [];
    // dApi.onDialogFinished();
    // dApi.onDialogFinished = () => {};
  }

  startItemUnlock(params: StartItemUnlockParams) {
    const { itemId, onFinished } = params;

    const iApi = get(inventoryApi);
    if (iApi.isItemUnlocked(itemId)) {
      onFinished?.();
      return;
    }

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
