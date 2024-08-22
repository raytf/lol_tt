import { onDestroy, setContext, getContext } from "svelte";

interface LanguageData {
  [key: string]: string;
}

function lol_send(messageName: string, payload: Object) {
  const payloadString: string = JSON.stringify(payload);
  parent.postMessage(
    {
      message: messageName,
      payload: payloadString,
    },
    "*",
  );
  console.log("lol_send:", messageName, payload);
}

export class LolApi {
  languageLoaded = $state(false);
  languageData = $state<LanguageData>({});

  constructor() {
    window.addEventListener("message", this.handleMessage);
    onDestroy(() => {
      window.removeEventListener("message", this.handleMessage);
    });
  }

  handleMessage = (event: MessageEvent) => {
    const { messageName, payload } = event.data;

    switch (messageName) {
      case "start":
        console.log("start:", payload);
        break;
      case "language":
        const languageData = JSON.parse(payload);
        this.languageData = languageData;
        this.languageLoaded = true;
        console.log(this.languageData);
        break;
      case "loadState":
        const savedData = JSON.parse(payload);
        console.log("loadState:", savedData);
    }
  };

  init = () => {
    this.gameIsReady();
    this.requestLoadState();
    // Public only - load backup language
    fetch("/language.json")
      .then((response) => response.json())
      .then((payload) => {
        this.languageData = payload["en"];
        this.languageLoaded = true;
      });
  };

  gameIsReady = () => {
    lol_send("gameIsReady", {
      aspectRatio: "16:9",
      resolution: "1024x576",
    });
  };

  requestLoadState = () => {
    lol_send("loadState", {});
  };

  saveState = () => {
    let data = {
      message: "hey",
    };

    lol_send("saveState", { data });
  };

  getText = (key: string) => {
    if (key in this.languageData) {
      return this.languageData[key];
    }
    return "key doesn't exist";
  };

  speakText = (key: string) => {
    lol_send("speakText", { key: key });
  };
}

const CONTEXT_KEY = Symbol("LolApi");

export function createLolApi() {
  return setContext(CONTEXT_KEY, new LolApi());
}

export function getLolApi() {
  return getContext<ReturnType<typeof createLolApi>>(CONTEXT_KEY);
}
