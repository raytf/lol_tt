import { onDestroy } from "svelte";
import { writable, get } from "svelte/store";
import backupLanguageData from "$assets/language.json";
import { objectivesApi, notepadApi } from "$apis";

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
  ttsEnabled = $state(true);
  // State

  constructor() {
    this.init();
    window.addEventListener("message", this.handleMessage);
    // onDestroy(() => {
    //   window.removeEventListener("message", this.handleMessage);
    // });
  }

  handleMessage = (event: MessageEvent) => {
    const { messageName, payload } = event.data;

    switch (messageName) {
      case "start":
        console.log("start:", payload);
        break;
      case "language":
        // const languageData = JSON.parse(payload);
        // this.languageData = languageData;
        // this.languageLoaded = true;
        console.log(this.languageData);
        break;
      case "loadState":
        const savedData = JSON.parse(payload);
        this.restoreSavedData(savedData);
    }
  };

  init = () => {
    // load backup first
    this.languageData = backupLanguageData["en"];
    this.gameIsReady();
    this.requestLoadState();
    // Public only - load backup language
    // fetch("/language.json")
    //   .then((response) => response.json())
    //   .then((payload) => {
    //     this.languageData = payload["en"];
    //     this.languageLoaded = true;
    //   });
  };

  gameIsReady = () => {
    lol_send("gameIsReady", {
      aspectRatio: "16:9",
      resolution: "1024x576",
    });
  };

  restoreSavedData = (savedData: {
    currentProgress: number;
    maximumProgress: number;
    data: any;
  }) => {
    console.log("loadState:", savedData);

    const data = savedData.data;
    if (data) {
      const objectives = get(objectivesApi);
      objectives.completedObjectives = data.completedObjectives;
      objectives.completedChapters = data.completedChapters;
      objectives.currentChapter = data.currentChapter;
      objectives.recallCompletedChapters();
      const notepad = get(notepadApi);
      notepad.restorePages(data.pages);
    }
  };

  requestLoadState = () => {
    lol_send("loadState", {});
  };

  saveState = () => {
    const objectives = get(objectivesApi);
    const notepad = get(notepadApi);
    let data = {
      completedObjectives: objectives.completedObjectives,
      completedChapters: objectives.completedChapters,
      currentChapter: objectives.currentChapter,
      pages: notepad.pages,
    };

    lol_send("saveState", {
      currentProgress: objectives.completedObjectives.length,
      maximumProgress: objectives.numTotalObjectives,
      data,
    });
  };

  clearState = () => {
    lol_send("saveState", {});
  };

  getText = (key: string = "") => {
    if (key in this.languageData) {
      return this.languageData[key];
    }
    return "key doesn't exist";
  };

  speakText = (key: string) => {
    if (!this.ttsEnabled) return;

    lol_send("speakText", { key: key });
  };

  complete = () => {
    lol_send("complete", {});
  };
}

export const lolApi = writable<LolApi>(new LolApi());
