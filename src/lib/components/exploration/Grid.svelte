<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    xOffset = 0,
    yOffset = 0,
    class: extraClass,
    children,
    areas,
  }: {
    xOffset?: number;
    yOffset?: number;
    class?: string;
    children: Snippet;
    areas: Snippet;
  } = $props();
</script>

<div
  class="grid {extraClass}"
  style="transform: translate({xOffset}px, {yOffset}px)"
>
  {@render children()}
  {@render areas()}
</div>

<style>
</style>
