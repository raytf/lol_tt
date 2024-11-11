import { gsap } from "gsap";

export function hideHeading() {
  gsap.set("#surface-heading", { opacity: 0 });
}

export function tlRevealHeading(vars?: gsap.TimelineVars) {
  const tl = gsap.timeline(vars);
  tl.to("#surface-heading", { opacity: 1, duration: 1 });
  return tl;
}
