<script lang="ts">
  import { Up, Down, Left, Right } from "$components/svg/caret";
  import type { Snippet } from "svelte";

  let {
    xOffset = 0,
    yOffset = 0,
    upEnabled = false,
    downEnabled = false,
    leftEnabled = false,
    rightEnabled = false,
    onUp,
    onDown,
    onLeft,
    onRight,
    class: extraClass,
    characters,
    areas,
  }: {
    xOffset?: number;
    yOffset?: number;
    upEnabled?: boolean;
    downEnabled?: boolean;
    leftEnabled?: boolean;
    rightEnabled?: boolean;
    onUp: () => void;
    onDown: () => void;
    onLeft: () => void;
    onRight: () => void;
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

<div class="absolute top-0 size-full pointer-events-none">
  <div class="relative size-full">
    {#if upEnabled}
      <button onclick={onUp} class="button-nav left-1/2 -translate-x-1/2 top-4">
        <Up class="h-[44px] w-[44px]" />
      </button>
    {/if}
    {#if downEnabled}
      <button
        onclick={onDown}
        class="button-nav left-1/2 -translate-x-1/2 bottom-4"
      >
        <Down class="h-[44px] w-[44px]" />
      </button>
    {/if}
    {#if leftEnabled}
      <button
        onclick={onLeft}
        class="button-nav left-4 top-1/2 -translate-y-1/2"
      >
        <Left class="h-[44px] w-[44px]" />
      </button>
    {/if}
    {#if rightEnabled}
      <button
        onclick={onRight}
        class="button-nav right-4 top-1/2 -translate-y-1/2"
      >
        <Right class="h-[44px] w-[44px]" />
      </button>
    {/if}
  </div>
</div>

<style>
  .button-nav {
    position: absolute;
    pointer-events: auto;
  }
</style>
