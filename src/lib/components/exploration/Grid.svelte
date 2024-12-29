<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    size = [1024, 576],
    xOffset = 0,
    yOffset = 0,
    class: extraClass,
    children,
    areas,
  }: {
    size?: [number, number];
    xOffset?: number;
    yOffset?: number;
    class?: string;
    children?: Snippet;
    areas?: Snippet;
  } = $props();
</script>

<div
  class="grid {extraClass}"
  style="width: {size[0]}px; height: {size[1]}px; transform: translate({xOffset}px, {yOffset}px)"
>
  {@render children?.()}
  {@render areas?.()}
</div>

<style>
</style>
