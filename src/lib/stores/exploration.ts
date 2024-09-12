import { get } from "svelte/store";
import { tweened } from "svelte/motion";
import { setTarget as setSubTarget } from "./sub";
export const xOffset = tweened(0, {
    duration: 500,
});
export const yOffset = tweened(0, {
    duration: 500,
});
export const moveScreen = (xDirection: number, yDirection: number) => {
    const newXOffset = get(xOffset) + window.innerWidth * xDirection;
    const newYOffset = get(yOffset) + window.innerHeight * yDirection;
    xOffset.set(newXOffset);
    yOffset.set(newYOffset);

    setSubTarget({
        x: window.innerWidth / 2 - newXOffset,
        y: window.innerHeight / 2 - newYOffset,
    });
}
export const moveSub = (event: MouseEvent) => {
    const x = event.clientX - get(xOffset);
    const y = event.clientY - get(yOffset);
    setSubTarget({ x, y });
}