import { setContext, getContext } from "svelte";
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

  fadeScene = (sceneName: string) => {
    this.sceneReady = false;
    gsap.to(".fader", {
      opacity: 1,
      duration: 1,
      onComplete: () => {
        push(sceneName);
        gsap.to(".fader", {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            this.sceneReady = true;
          },
        });
      },
    });
  };
}

const CONTEXT_KEY = Symbol("GameApi");

export function createGameApi() {
  return setContext(CONTEXT_KEY, new GameApi());
}

export function getGameApi() {
  return getContext<ReturnType<typeof createGameApi>>(CONTEXT_KEY);
}
