import { setContext, getContext } from "svelte";
import shell from "$assets/avatars/shell.png";
import grid from "$assets/icons/grid-square.svg";

interface ItemDetails {
  imgSrc: string;
  id: string;
  nameKey: string;
  descKey: string;
  actionKey: string;
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
  sm: {
    imgSrc: grid,
    id: "sm",
    nameKey: "inventory-item_name_sm",
    descKey: "inventory-item_desc_sm",
    actionKey: "inventory-item_action_sm",
  },
};

export class InventoryApi {
  unlocked = $state(false);
  unlockedItems = $state<string[]>([]);
  showSmModal = $state(false);
  currentHintIndex = $state(1);
  showHintDialog = $state(false);

  constructor() {}

  unlockItem(item: string) {
    if (this.unlockedItems.includes(item)) return;

    this.unlockedItems.push(item);
  }
}

const CONTEXT_KEY = Symbol("InventoryApi");

export function createInventoryApi() {
  return setContext(CONTEXT_KEY, new InventoryApi());
}

export function getInventoryApi() {
  return getContext<ReturnType<typeof createInventoryApi>>(CONTEXT_KEY);
}
