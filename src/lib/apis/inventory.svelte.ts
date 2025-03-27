import { writable } from "svelte/store";
import radio from "$assets/icons/radio.svg";
import shell from "$assets/avatars/shell.png";
import { conch_smile } from "$assets/conch";
import notepad from "$assets/icons/notepad.svg";
import smDiagram from "$assets/icons/sm-diagram.png";
import pressureGauge from "$assets/sprites/pressure-gauge.png";
import depthGauge from "$assets/sprites/depth-gauge.png";
import thermistor from "$assets/sprites/thermistor.png";
import map from "$assets/icons/map.svg";

type ItemMap = {
  [key: string]: ItemDetails;
};

export const itemMap: ItemMap = {
  sm: {
    imgSrc: smDiagram,
    id: "sm",
    nameKey: "item_name_sm",
    descKey: "item_desc_sm",
    // actionKey: "item_action_sm",
  },
  radio: {
    imgSrc: radio,
    id: "radio",
    nameKey: "item_name_radio",
    descKey: "item_desc_radio",
    // actionKey: "item_action_radio",
  },
  notepad: {
    imgSrc: notepad,
    id: "notepad",
    nameKey: "item_name_notepad",
    descKey: "item_desc_notepad",
    // actionKey: "item_action_notepad",
  },
  conch: {
    imgSrc: conch_smile,
    id: "conch",
    nameKey: "item_name_conch",
    descKey: "item_desc_conch",
  },
  map: {
    imgSrc: map,
    id: "map",
    nameKey: "item_name_map",
    descKey: "item_desc_map",
  },
  pg: {
    imgSrc: pressureGauge,
    id: "pg",
    nameKey: "item_name_pg",
    descKey: "item_desc_pg",
    measuring: true,
  },
  th: {
    imgSrc: thermistor,
    id: "th",
    nameKey: "item_name_th",
    descKey: "item_desc_th",
    measuring: true,
  },
  dg: {
    imgSrc: depthGauge,
    id: "dg",
    nameKey: "item_name_dg",
    descKey: "item_desc_dg",
    measuring: true,
  },
};

export class InventoryApi {
  unlockedItems = $state<ItemDetails[]>([]);
  currentHintKey = $state("hint_1");
  showHintDialog = $state(false);
  showGaugeScreen = $state(false);
  // Item Unlock Screen
  newItemUnlock = $state<ItemDetails>();
  onItemUnlockFinished = () => {};

  constructor() {}

  get normalItems() {
    return this.unlockedItems.filter((i) => !i.measuring);
  }

  get measuringItems() {
    return this.unlockedItems.filter((i) => i.measuring);
  }

  // getItem(key: string) {
  //   return itemMap[key];
  // }

  unlockEverything() {
    this.unlockedItems = [...Object.values(itemMap)];
  }

  unlockItem(itemId: string) {
    if (this.isItemUnlocked(itemId)) return;

    const item = itemMap[itemId];
    this.newItemUnlock = item;
    this.unlockedItems.push(item);
  }

  isItemUnlocked(item: string): boolean {
    return !!this.unlockedItems.find((i) => i.id === item);
  }
}

export const inventoryApi = writable<InventoryApi>(new InventoryApi());
