import { writable, derived, get } from "svelte/store";
import { Spring } from "svelte/motion";
import { coords, setTarget as setSubTarget } from "$stores/sub";
import { pressureCreak } from "$dialog/common";
import { gameApi, hudApi, interfaceApi } from "$apis";

export const creakThreshold = 1450;
const pressureTimerId = writable<NodeJS.Timeout>();
const underPressure = writable(false);

export const gridOffset = new Spring(
  { x: 0, y: 0 },
  { stiffness: 0.01, damping: 0.8 },
);
export const minOffset = writable({ x: 0, y: 0 });

export const moveSub = (e: MouseEvent) => {
  const gApi = get(gameApi);

  const halfWidth = gApi.windowWidth / 2;
  const halfHeight = gApi.windowHeight / 2;
  const halfWidthDiff = e.clientX - halfWidth;
  const halfHeightDiff = e.clientY - halfHeight;
  let newXOffset = gridOffset.current.x - halfWidthDiff;
  let newYOffset = gridOffset.current.y - halfHeightDiff;
  if (newXOffset > 0) newXOffset = 0;
  if (newYOffset > 0) newYOffset = 0;
  if (newXOffset < get(minOffset).x) newXOffset = get(minOffset).x;
  if (newYOffset < get(minOffset).y) newYOffset = get(minOffset).y;
  const newOffset = { x: newXOffset, y: newYOffset };

  gridOffset.set(newOffset);
  const x = e.clientX - gridOffset.current.x;
  const y = e.clientY - gridOffset.current.y;
  setSubTarget({ x, y });
  checkPressure({ x, y });
  //console.log({ x, y });
  //console.log(gridOffset.current);
  return { x, y };
};

export const checkPressure = ({ x, y }: { x: number; y: number }) => {
  if (y > creakThreshold) {
    get(interfaceApi).showWarning({
      level: "warning",
      text: "warning-pressure",
    });
    if (!get(underPressure)) {
      underPressure.set(true);
      // pressureTimerId.set(
      //   setTimeout(() => {
      //     get(hudApi).startDialog({
      //       keys: pressureCreak,
      //       onFinished: () => {
      //         underPressure.set(false);
      //       },
      //     });
      //   }, 3000),
      // );
    }
  } else {
    clearTimeout(get(pressureTimerId));
    underPressure.set(false);
    get(interfaceApi).hideWarning("warning-pressure");
  }
};
