import { get } from "svelte/store";
import type { Spring } from "svelte/motion";
import { windowWidth, windowHeight } from "./game";
import { setTarget as setSubTarget } from "./sub";

export const moveSub = (
  e: MouseEvent,
  gridOffset: Spring<{ x: number; y: number }>,
  minOffsets: { x: number; y: number },
) => {
  const currentOffset = get(gridOffset);

  const halfWidth = get(windowWidth) / 2;
  const halfHeight = get(windowHeight) / 2;
  const halfWidthDiff = e.clientX - halfWidth;
  const halfHeightDiff = e.clientY - halfHeight;
  let newXOffset = currentOffset.x - halfWidthDiff;
  let newYOffset = currentOffset.y - halfHeightDiff;
  if (newXOffset > 0) newXOffset = 0;
  if (newYOffset > 0) newYOffset = 0;
  if (newXOffset < minOffsets.x) newXOffset = minOffsets.x;
  if (newYOffset < minOffsets.y) newYOffset = minOffsets.y;
  const newOffset = { x: newXOffset, y: newYOffset };

  gridOffset.set(newOffset);
  const x = e.clientX - currentOffset.x;
  const y = e.clientY - currentOffset.y;
  setSubTarget({ x, y });
};
