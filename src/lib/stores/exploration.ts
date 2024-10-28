import { get } from "svelte/store";
import { tweened } from "svelte/motion";
import { windowWidth, windowHeight } from "./game";
import { setTarget as setSubTarget } from "./sub";
export const xOffset = tweened(0, {
  duration: 888,
});
export const yOffset = tweened(0, {
  duration: 888,
});
export const moveScreen = (xDirection: number, yDirection: number) => {
  const newXOffset = get(xOffset) + get(windowWidth) * xDirection;
  const newYOffset = get(yOffset) + get(windowHeight) * yDirection;
  xOffset.set(newXOffset);
  yOffset.set(newYOffset);

  setSubTarget({
    x: get(windowWidth) / 2 - newXOffset,
    y: get(windowHeight) / 2 - newYOffset,
  });
};
export const moveSub = (event: MouseEvent) => {
  const x = event.clientX - get(xOffset);
  const y = event.clientY - get(yOffset);
  setSubTarget({ x, y });
};
