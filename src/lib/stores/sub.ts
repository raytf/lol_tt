import { writable, get } from "svelte/store";
import { spring } from "svelte/motion";

export const nearVent = writable(false);
export const depthOffset = writable(0);
export const depthMultiplier = writable(1);
export const coords = spring({ x: 0, y: 0 }, { stiffness: 0.01, damping: 0.8 });
export const direction = writable(1);
export const setTarget = (target: { x: number; y: number }) => {
  const currentCoords = get(coords);
  coords.set(target);

  const dx = target.x - currentCoords.x;
  direction.set(dx < 0 ? -1 : 1);
};
export const setPosition = (position: { x: number; y: number }) => {
  coords.set(position, { hard: true });
};
