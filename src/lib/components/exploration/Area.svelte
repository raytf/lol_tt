<script lang="ts">
  import type { Snippet } from "svelte";
  import { CursorClick } from "$components/svg/icons";

  let {
    showInstruction = false,
    class: extraClass = "",
    children,
    onmousedown,
    ...props
  }: {
    showInstruction?: boolean;
    onmousedown?: (event: MouseEvent) => void;
    onmouseenter?: (event: MouseEvent) => void;
    class?: string;
    children?: Snippet;
  } = $props();

  let clicked = $state(!showInstruction);
</script>

<div
  class="relative size-full {extraClass}"
  role="button"
  tabindex="0"
  onmousedown={(e) => {
    clicked = true;
    onmousedown?.(e);
  }}
  {...props}
>
  <div class="absolute top-0 w-full flex justify-center pointer-events-none">
    <div class="text-instruction text-4xl pt-8 {clicked ? 'opacity-0' : ''}">
      <CursorClick />
      <p class="ml-2">Explore</p>
    </div>
  </div>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .text-instruction {
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: opacity 2s;
  }
</style>
