<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import { Up, Down, Left, Right } from "$components/svg/icons/caret";
  import { HandClick, CursorClick } from "$components/svg/icons";
  import { getLolApi } from "$apis/lol.svelte";

  let {
    active = true,
    onUp,
    onDown,
    onLeft,
    onRight,
    showInstruction = false,
    class: extraClass = "",
    children,
    onmousedown,
    ...props
  }: {
    active?: boolean;
    onUp?: () => void;
    onDown?: () => void;
    onLeft?: () => void;
    onRight?: () => void;
    showInstruction?: boolean;
    onmousedown?: (event: MouseEvent) => void;
    class?: string;
    children?: Snippet;
  } = $props();

  let revealInstruction = $state(showInstruction);
</script>

<div
  class="relative size-full {extraClass}"
  role="button"
  tabindex="0"
  onmousedown={(e) => {
    revealInstruction = false;
    onmousedown?.(e);
  }}
  {...props}
>
  {#if children}
    {@render children()}
  {/if}

  {#if revealInstruction}
    <div
      transition:fade={{ duration: 2000 }}
      class="container-instruction text-4xl pt-14"
    >
      <HandClick />
      <p class="ml-2">{getLolApi().getText("explore")}</p>
    </div>
  {/if}

  {#if active}
    <div in:fade={{ duration: 2000 }} class="container-nav">
      <div class="relative size-full">
        {#if onUp}
          <button
            onclick={onUp}
            class="button-nav left-1/2 -translate-x-1/2 top-4"
          >
            <Up class="h-[44px] w-[44px]" />
          </button>
        {/if}
        {#if onDown}
          <button
            onclick={onDown}
            class="button-nav left-1/2 -translate-x-1/2 bottom-4"
          >
            <Down class="h-[44px] w-[44px]" />
          </button>
        {/if}
        {#if onLeft}
          <button
            onclick={onLeft}
            class="button-nav left-4 top-1/2 -translate-y-1/2"
          >
            <Left class="h-[44px] w-[44px]" />
          </button>
        {/if}
        {#if onRight}
          <button
            onclick={onRight}
            class="button-nav right-4 top-1/2 -translate-y-1/2"
          >
            <Right class="h-[44px] w-[44px]" />
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .container-instruction {
    position: absolute;
    top: 0;
    height: 11%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .container-nav {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
    z-index: 20;
  }
  .button-nav {
    position: absolute;
    pointer-events: auto;
    z-index: 10;
  }
</style>
