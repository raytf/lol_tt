import { gsap } from "gsap";

export function hideHeading() {
  gsap.set(".heading-location", { opacity: 0 });
}

export function tlRevealHeading(vars?: gsap.TimelineVars) {
  const tl = gsap.timeline(vars);
  tl.to(".heading-location", { opacity: 1, duration: 1 });
  return tl;
}
