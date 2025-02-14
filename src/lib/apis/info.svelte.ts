import { writable, get } from "svelte/store";
import { steps } from "$components/scientificMethod";
import { hudApi, lolApi } from "$apis";

interface InfoModalParams {
  textKey?: string;
  infoType?: SM;
}

class InfoApi {
  smStep = $state<SMStep>();
  textKey = $state("");

  openModal(params: InfoModalParams) {
    const { textKey, infoType } = params;
    this.smStep = steps.find((s) => s.label === infoType);
    if (textKey) {
      this.textKey = textKey;
      get(lolApi).speakText(textKey);
    }

    get(hudApi).showInfoModal = true;
  }
}

export const infoApi = writable<InfoApi>(new InfoApi());
