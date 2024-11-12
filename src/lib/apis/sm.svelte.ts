import { writable, get } from "svelte/store";

class SmApi {
  currentIndex = $state(-1);
  isInteractable = $state(true);
  modalClass = $state("");

  reset() {
    this.currentIndex = -1;
    this.isInteractable = true;
    this.modalClass = "";
  }
}

export const smApi = writable<SmApi>(new SmApi());
