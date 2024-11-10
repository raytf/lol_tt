import { writable, get } from "svelte/store";
import type { Spring } from "svelte/motion";
import { spring } from "svelte/motion";
import { coords, setTarget as setSubTarget } from "$stores/sub";
import { gameApi } from "$apis";

export const gridOffset = spring(
  { x: 0, y: 0 },
  { stiffness: 0.01, damping: 0.8 },
);
export const minOffset = writable({ x: 0, y: 0 });
export const moveSub = (e: MouseEvent) => {
  const gApi = get(gameApi);
  const currentOffset = get(gridOffset);

  const halfWidth = gApi.windowWidth / 2;
  const halfHeight = gApi.windowHeight / 2;
  const halfWidthDiff = e.clientX - halfWidth;
  const halfHeightDiff = e.clientY - halfHeight;
  let newXOffset = currentOffset.x - halfWidthDiff;
  let newYOffset = currentOffset.y - halfHeightDiff;
  if (newXOffset > 0) newXOffset = 0;
  if (newYOffset > 0) newYOffset = 0;
  if (newXOffset < get(minOffset).x) newXOffset = get(minOffset).x;
  if (newYOffset < get(minOffset).y) newYOffset = get(minOffset).y;
  const newOffset = { x: newXOffset, y: newYOffset };

  gridOffset.set(newOffset);
  const x = e.clientX - currentOffset.x;
  const y = e.clientY - currentOffset.y;
  setSubTarget({ x, y });
};
