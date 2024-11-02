import { writable } from "svelte/store";
import radio from "$assets/icons/radio.svg";
import shell from "$assets/avatars/shell.png";
import grid from "$assets/icons/grid-square.svg";
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
  conch: {
    imgSrc: shell,
    id: "conch",
    nameKey: "inventory-item_name_conch",
    descKey: "inventory-item_desc_conch",
    actionKey: "inventory-item_action_conch",
  },
  radio: {
    imgSrc: radio,
    id: "radio",
    nameKey: "inventory-item_name_radio",
    descKey: "inventory-item_desc_radio",
    actionKey: "inventory-item_action_radio",
  },
  sm: {
    imgSrc: grid,
    id: "sm",
    nameKey: "inventory-item_name_sm",
    descKey: "inventory-item_desc_sm",
    actionKey: "inventory-item_action_sm",
  },
  pg: {
    imgSrc: pressureGauge,
    id: "pg",
    nameKey: "inventory-item_name_pg",
    descKey: "inventory-item_desc_pg",
  },
  dg: {
    imgSrc: depthGauge,
    id: "dg",
    nameKey: "inventory-item_name_dg",
    descKey: "inventory-item_desc_dg",
  },
  th: {
    imgSrc: thermistor,
    id: "th",
    nameKey: "inventory-item_name_th",
    descKey: "inventory-item_desc_th",
  },
};

export class InventoryApi {
  unlockedItems = $state<string[]>([]);
  currentHintKey = $state("hint_1");
  showHintDialog = $state(false);
  showGaugeScreen = $state(false);

  constructor() {}

  getItem(key: string) {
    return itemMap[key];
  }

  unlockItem(item: string) {
    if (this.unlockedItems.includes(item)) return;

    this.unlockedItems.push(item);
  }

  isItemUnlocked(item: string): boolean {
    return this.unlockedItems.includes(item);
  }
}

export const inventoryApi = writable<InventoryApi>(new InventoryApi());
