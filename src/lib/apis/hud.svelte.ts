import { writable, get } from "svelte/store";
import { Dialog } from "$apis/dialog.svelte";
import { objectivesApi, dialogApi, inventoryApi, smApi } from "$apis";

interface StartItemUnlockParams {
  itemId: string;
  unlockType?: "unlock" | "activate" | "upgrade";
  onFinished?: () => void;
}

class HudApi {
  enabled = $state(false);
  showDebug = $state(true);
  showObjectives = $state(false);
  showDialog = $state(false);

  enableSettings = $state(true);
  openSettings = $state(false);

  enableInventory = $state(false);
  openInventory = $state(false);

  showItemUnlock = $state(false);
  showSmModal = $state(false);
  showSmPuzzle = $state(false);
  showNotepad = $state(false);
  showMap = $state(false);
  showInfoModal = $state(false);

  showGaugeScreen = $state(false);
  showInterface = $state(true);

  debugActivate() {
    //get(inventoryApi).unlockEverything();
    this.enableInventory = true;
  }

  openSmModalWithDialog() {
    const sm = get(smApi);
    sm.modalClass = "pt-[222px] z-[103]";
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
    const { itemId, unlockType, onFinished } = params;
    const iApi = get(inventoryApi);

    if (unlockType === "activate") {
      iApi.unlockTitleKey = "item-activated";
      onFinished?.();
      return;
    } else if (unlockType === "upgrade") {
      iApi.unlockTitleKey = "item-upgraded";
      iApi.upgradeItem(itemId);
    } else {
      iApi.unlockTitleKey = "item-unlocked";
      if (iApi.isItemUnlocked(itemId)) {
        onFinished?.();
        return;
      }
      iApi.unlockItem(itemId);
    }

    iApi.onItemUnlockFinished = () => { };
    if (onFinished) iApi.onItemUnlockFinished = onFinished;

    this.showItemUnlock = true;
  }
  endItemUnlock() {
    this.showItemUnlock = false;

    const iApi = get(inventoryApi);
    iApi.onItemUnlockFinished();
  }
}

export const hudApi = writable<HudApi>(new HudApi());
