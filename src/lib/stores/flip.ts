import { writable, get } from "svelte/store";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

export const flipElement = writable<HTMLElement | null>(null);
export const doFlip = (transform: () => void, vars?: Flip.FromToVars) => {
  const elem = get(flipElement);
  if (elem) {
    const initialState = Flip.getState(elem);
    transform();

    Flip.from(initialState, vars);
  }
};
