import { writable } from "svelte/store";
import { push } from "svelte-spa-router";
import { gsap } from "gsap";

export class GameApi {
  sceneReady = $state(true);
  constructor() {}

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
