<script lang="ts">
  let {
    src,
    minFrequency = [0.02, 0.06],
    maxFrequency = [0.04, 0.08],
    duration = 11,
    class: extraClass,
  }: {
    src: string;
    duration?: number;
    minFrequency?: number[];
    maxFrequency?: number[];
    class: string;
  } = $props();
</script>

<img {src} alt="" class="image-turbulent {extraClass}" />
<svg>
  <filter id="turbulence" x="0" y="0" width="100%" height="100%">
    <feTurbulence
      id="ocean-filter"
      numOctaves="3"
      seed="2"
      baseFrequency="0.02 0.05"
    />
    <feDisplacementMap scale="20" in="SourceGraphic" />
    <animate
      xlink:href="#ocean-filter"
      attributeName="baseFrequency"
      dur="{duration}s"
      keyTimes="0;1"
      values="{minFrequency[0]} {minFrequency[1]};{maxFrequency[0]} {maxFrequency[1]}"
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
    filter: url(#turbulence);
    pointer-events: none;
  }
  svg {
    position: absolute;
    pointer-events: none;
  }
</style>
