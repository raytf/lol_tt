import { writable, get } from "svelte/store";
import { steps } from "$components/scientificMethod";
import { hudApi, lolApi } from "$apis";

interface InfoModalParams {
  infoType?: SM;
  descKey?: string;
  textKeys?: string[];
  warning?: boolean;
  outsideClose?: boolean;
}

class InfoApi {
  smStep = $state<SMStep>();
  descKey = $state<string>("");
  textKeys = $state<string[]>([]);
  warning = $state<boolean>(false);
  outsideClose = $state<boolean>(true);

  openModal(params: InfoModalParams) {
    const {
      descKey,
      textKeys,
      infoType,
      warning = false,
      outsideClose = true,
    } = params;
    this.smStep = steps.find((s) => s.label === infoType);
    if (textKeys) {
      this.textKeys = textKeys;
      get(lolApi).speakText(textKeys[0]);
    }

    if (descKey) {
      this.descKey = descKey;
    }

    this.warning = !!warning;
    this.outsideClose = !!outsideClose;

    get(hudApi).showInfoModal = true;
  }

  closeModal() {
    this.descKey = "";
    get(hudApi).showInfoModal = false;
  }
}

export const infoApi = writable<InfoApi>(new InfoApi());
