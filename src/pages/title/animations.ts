import { gsap } from "gsap";

export function tlSlowRevealBackground(duration: number = 11) {
  const tl = gsap.timeline();
  tl.to(".title_bg", { scale: 1.22, duration: duration }, 0);
  tl.to("#title_blackdrop", { opacity: 0.55, duration: duration }, 0);
  return tl;
}
