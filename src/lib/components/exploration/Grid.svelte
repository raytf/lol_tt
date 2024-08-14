<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    xOffset = 0,
    yOffset = 0,
    class: extraClass,
    characters,
    areas,
  }: {
    xOffset?: number;
    yOffset?: number;
    class?: string;
    characters: Snippet;
    areas: Snippet;
  } = $props();
</script>

<div
  class="grid {extraClass}"
  style="transform: translate({xOffset}px, {yOffset}px)"
>
  {@render characters()}
  {@render areas()}
</div>

<style>
</style>
