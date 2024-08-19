import { writable } from "svelte/store";
import { spring } from "svelte/motion";

export const depthOffset = writable(0);
export const depthMultiplier = writable(1);
export const coords = spring({ x: 0, y: 0 }, { stiffness: 0.01, damping: 0.8 });
