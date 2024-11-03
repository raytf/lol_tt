<script lang="ts">
  import type { Snippet } from "svelte";
  import { fly } from "svelte/transition";
  import { backOut, backIn } from "svelte/easing";
  import { coords, direction } from "$stores/sub";
  import sub from "$assets/sprites/sub.png";

  let {
    targetPosition = { x: 0, y: 0 },
    size = 111,
    offset = { x: size / 2, y: size / 2 },
    class: extraClass = "",
    imgClass = "",
    bob = false,
    reveal = true,
    children,
    ...props
  }: {
    targetPosition?: { x: number; y: number };
    size?: number;
    offset?: { x: number; y: number };
    class?: string;
    bob?: boolean;
    reveal?: boolean;
    imgClass?: string;
    children?: Snippet;
  } = $props();
</script>

<div
  class="container-sub {extraClass}"
  style="transform: translate({$coords.x - offset.x}px, {$coords.y -
    offset.y}px); width: {size}px; height: {size}px"
  {...props}
>
  {#if reveal}
    <img
      in:fly|global={{ y: 111, duration: 1111, easing: backOut }}
      out:fly|global={{ y: 111, duration: 1111, easing: backIn }}
      src={sub}
      alt="sub"
      height={size}
      width={size}
      class="absolute select-none {imgClass} {bob ? 'anim-bob' : ''}"
      style="scale: {$direction} 1;"
    />
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .container-sub {
    position: absolute;
    pointer-events: none;
  }
  .anim-bob {
    animation: bob 11s linear infinite;
  }
  @keyframes -global-bob {
    0% {
      rotate: 0deg;
    }
    50% {
      rotate: -8deg;
    }
    100% {
      rotate: 0deg;
    }
  }
</style>
