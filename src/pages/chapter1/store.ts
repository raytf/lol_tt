import { writable } from "svelte/store";
import { spring } from "svelte/motion";

export const shellEncountered = writable(false);

export const sharkEncountered = writable(false);
export const explorationOffset = writable({ x: 0, y: 0 });
export let sharkCoords = spring(
  { x: window.innerWidth * 3, y: window.innerHeight / 2 },
  {
    stiffness: 0.005,
    damping: 0.8,
  },
);
