import { writable, get } from "svelte/store";
import { steps } from "$components/scientificMethod";
import type { Step } from "$components/scientificMethod/steps";
import { hudApi, lolApi } from "$apis";

class InfoApi {
  smStep = $state<Step>();
  textKey = $state("");

  openModal(textKey: string, infoType: SM | "" = "") {
    this.textKey = textKey;
    this.smStep = steps.find((s) => s.label === infoType);
    get(lolApi).speakText(textKey);
    get(hudApi).showInfoModal = true;
  }
}

export const infoApi = writable<InfoApi>(new InfoApi());
