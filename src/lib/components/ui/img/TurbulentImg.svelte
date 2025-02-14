<script lang="ts">
  import { cn } from "$lib/utils";
  let {
    src,
    minFrequency = [0.02, 0.06],
    maxFrequency = [0.04, 0.08],
    duration = 11,
    scale = 20,
    yoyo = false,
    class: extraClass,
    style: extraStyle,
  }: {
    src: string;
    duration?: number;
    scale?: number;
    minFrequency?: number[];
    maxFrequency?: number[];
    yoyo?: boolean;
    class?: string;
    style?: string;
  } = $props();

  const randId = Math.floor(Math.random() * 100);

  const freqKeyTimes = `0;${yoyo ? "0.5;" : ""}1`;
  const freqValues = `${minFrequency[0]} ${minFrequency[1]};${maxFrequency[0]} ${maxFrequency[1]}${
    yoyo ? `;${minFrequency[0]} ${minFrequency[1]}` : ""
  }`;
</script>

<img
  {src}
  alt=""
  class={cn("image-turbulent", extraClass)}
  style="filter: url(#turbulence-{randId});{extraStyle}"
/>
<svg>
  <filter id="turbulence-{randId}" x="0" y="0" width="100%" height="100%">
    <feTurbulence
      id="ocean-filter-{randId}"
      numOctaves="3"
      seed="2"
      baseFrequency="{minFrequency[0]} {minFrequency[1]}"
    />
    <feDisplacementMap {scale} in="SourceGraphic" />
    <animate
      xlink:href="#ocean-filter-{randId}"
      attributeName="baseFrequency"
      dur="{duration}s"
      keyTimes={freqKeyTimes}
      values={freqValues}
      repeatCount="indefinite"
    />
  </filter>
</svg>

<style>
  .image-turbulent {
    position: absolute;
    top: -1%;
    left: -1%;
    max-width: none;
    width: 102%;
    height: 102%;
    pointer-events: none;
    user-select: none;

    will-change: transform;
  }
  svg {
    position: absolute;
    pointer-events: none;
  }
</style>
