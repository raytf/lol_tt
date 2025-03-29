import { writable, get } from "svelte/store";
import { push } from "svelte-spa-router";
import { gsap } from "gsap";
import { objectivesApi, hudApi } from "$apis";

export class GameApi {
  startedGame = $state(false);
  debugMode = $state(true);

  windowWidth = $state(1024);
  windowHeight = $state(576);
  // Fading
  sceneReady = $state(true);

  init = () => {
    console.log("GameApi.init");
  };

  changeScene = (sceneName: string) => {
    push(sceneName);
    this.sceneReady = true;
  };

  fadeScene = (
    sceneName: string,
    outDuration: number = 0.8,
    inDuration: number = 0.8,
  ) => {
    get(hudApi).enabled = false;
    this.sceneReady = false;
    gsap.to(".fader", {
      opacity: 1,
      duration: outDuration,
      ease: "none",
      onComplete: () => {
        push(sceneName);
        gsap.to(".fader", {
          opacity: 0,
          duration: inDuration,
          ease: "none",
          onComplete: () => {
            this.sceneReady = true;
          },
        });
      },
    });
  };
}

export const gameApi = writable<GameApi>(new GameApi());
