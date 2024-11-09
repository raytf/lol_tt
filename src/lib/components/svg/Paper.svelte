<script lang="ts">
  let {
    width = "100%",
    height = "100%",
    class: extraClass,
  }: { width?: string; height?: string; class?: string } = $props();
</script>

<svg {width} {height} class={extraClass}>
  <filter id="roughpaper" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.04"
      result="noise"
      numOctaves="5"
    />

    <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="2">
      <feDistantLight azimuth="45" elevation="60" />
    </feDiffuseLighting>
  </filter>

  <rect
    x="0"
    y="0"
    width="100%"
    height="100%"
    filter="url(#roughpaper)"
    fill="none"
  >
  </rect></svg
>
