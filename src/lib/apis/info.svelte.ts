import { writable, get } from "svelte/store";
import { steps } from "$components/scientificMethod";
import { hudApi, lolApi } from "$apis";

interface InfoModalParams {
  infoType?: SM;
  descKey?: string;
  textKeys?: string[];
}

class InfoApi {
  smStep = $state<SMStep>();
  descKey = $state<string>("");
  textKeys = $state<string[]>([]);

  openModal(params: InfoModalParams) {
    const { descKey, textKeys, infoType } = params;
    this.smStep = steps.find((s) => s.label === infoType);
    if (textKeys) {
      this.textKeys = textKeys;
      get(lolApi).speakText(textKeys[0]);
    }

    if (descKey) {
      this.descKey = descKey;
    }

    get(hudApi).showInfoModal = true;
  }

  closeModal() {
    this.descKey = "";
    get(hudApi).showInfoModal = false;
  }
}

export const infoApi = writable<InfoApi>(new InfoApi());
