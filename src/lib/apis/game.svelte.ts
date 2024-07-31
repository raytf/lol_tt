import { onDestroy, setContext, getContext } from "svelte";

export class GameApi {
  constructor() {}

  init = () => {
    console.log("GameApi.init");
  };
}

const CONTEXT_KEY = Symbol("GameApi");

export function createGameApi() {
  return setContext(CONTEXT_KEY, new GameApi());
}

export function getGameApi() {
  return getContext<ReturnType<typeof createGameApi>>(CONTEXT_KEY);
}
