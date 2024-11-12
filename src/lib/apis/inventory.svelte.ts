import { writable } from "svelte/store";
import radio from "$assets/icons/radio.svg";
import shell from "$assets/avatars/shell.png";
import notepad from "$assets/icons/notepad.svg";
import smDiagram from "$assets/icons/sm-diagram.png";
import pressureGauge from "$assets/sprites/pressure-gauge.png";
import depthGauge from "$assets/sprites/depth-gauge.png";
import thermistor from "$assets/sprites/thermistor.png";

interface ItemDetails {
  imgSrc: string;
  id: string;
  nameKey: string;
  descKey: string;
  actionKey?: string;
}

type ItemMap = {
  [key: string]: ItemDetails;
};

export const itemMap: ItemMap = {
  sm: {
    imgSrc: smDiagram,
    id: "sm",
    nameKey: "item_name_sm",
    descKey: "item_desc_sm",
    actionKey: "item_action_sm",
  },
  radio: {
    imgSrc: radio,
    id: "radio",
    nameKey: "item_name_radio",
    descKey: "item_desc_radio",
    actionKey: "item_action_radio",
  },
  notepad: {
    imgSrc: notepad,
    id: "notepad",
    nameKey: "item_name_notepad",
    descKey: "item_desc_notepad",
    actionKey: "item_action_notepad",
  },
  // pg: {
  //   imgSrc: pressureGauge,
  //   id: "pg",
  //   nameKey: "item_name_pg",
  //   descKey: "item_desc_pg",
  // },
  // dg: {
  //   imgSrc: depthGauge,
  //   id: "dg",
  //   nameKey: "item_name_dg",
  //   descKey: "item_desc_dg",
  // },
  // th: {
  //   imgSrc: thermistor,
  //   id: "th",
  //   nameKey: "item_name_th",
  //   descKey: "item_desc_th",
  // },
};

export class InventoryApi {
  unlockedItems = $state<string[]>([]);
  currentHintKey = $state("hint_1");
  showHintDialog = $state(false);
  showGaugeScreen = $state(false);
  // Item Unlock Screen
  newItemUnlock = $state("");
  onItemUnlockFinished = () => {};

  constructor() {}

  getItem(key: string) {
    return itemMap[key];
  }

  unlockEverything() {
    this.unlockedItems = [...Object.keys(itemMap)];
  }

  unlockItem(item: string) {
    if (this.isItemUnlocked(item)) return;

    this.unlockedItems.push(item);
  }

  isItemUnlocked(item: string): boolean {
    return this.unlockedItems.includes(item);
  }
}

export const inventoryApi = writable<InventoryApi>(new InventoryApi());
