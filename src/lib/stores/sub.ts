import { writable, get } from "svelte/store";
import { Spring } from "svelte/motion";
import { interfaceApi } from "$apis";

export const nearVent = writable(false);
export const depthOffset = writable(0);
export const depthMultiplier = writable(1);

export const subBroken = writable(false);

export const breakPropellor = () => {
  coords.stiffness = 0.004;
  subBroken.set(true);
};

export const fixPropellor = () => {
  coords.stiffness = 0.022;
  subBroken.set(false);
  get(interfaceApi).hideWarning("warning-propellor");
};

export const coords = new Spring(
  { x: 0, y: 0 },
  { stiffness: 0.022, damping: 1 },
);
export const direction = writable({ x: 1, y: 1 });
export const setTarget = (target: { x: number; y: number }) => {
  coords.set(target);

  const dx = target.x - coords.current.x;
  const dy = target.y - coords.current.y;
  const dirX = dx < 0 ? -1 : 1;
  const dirY = dy < 0 ? -1 : 1;
  direction.set({ x: dirX, y: dirY });
};
export const setPosition = (position: { x: number; y: number }) => {
  coords.set(position, { instant: true });
};
