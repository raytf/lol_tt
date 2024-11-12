import { gsap } from "gsap";

export function hideHeadings() {
  gsap.set(
    ["#pg-title_header", "#pg-title_subheader", "#pg-title_button-start"],
    {
      opacity: 0,
    },
  );
}

export function tlZoomIn(vars?: gsap.TimelineVars) {
  const zoomTl = gsap.timeline(vars);
  zoomTl.to(".pg-title_bg", { scale: 1.22, duration: 11 });
  return zoomTl;
}

export function tlZoomInMore(vars?: gsap.TimelineVars) {
  const zoomTl = gsap.timeline(vars);
  zoomTl.to(".pg-title_bg", { scale: 1.44, duration: 11 });
  return zoomTl;
}

export function tlRevealText(vars?: gsap.TimelineVars) {
  const textTl = gsap.timeline(vars);
  textTl.to("#pg-title_header", {
    opacity: 1,
    duration: 2,
  });
  textTl.to("#pg-title_subheader", { opacity: 1, duration: 1 });

  textTl.to("#pg-title_button-start", { opacity: 1, duration: 1 });
  return textTl;
}
