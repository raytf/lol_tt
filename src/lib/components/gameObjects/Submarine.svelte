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
    children,
    ...props
  }: {
    targetPosition?: { x: number; y: number };
    size?: number;
    offset?: { x: number; y: number };
    class?: string;
    bob?: boolean;
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
  <img
    in:fly|global={{ y: 111, duration: 1111, easing: backOut }}
    out:fly|global={{ y: 111, duration: 1111, easing: backIn }}
    src={sub}
    alt="sub"
    height={size}
    width={size}
    class="absolute select-none {imgClass} {bob && 'anim-bob'}"
    style="scale: {$direction.x} 1"
  />
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .container-sub {
    position: absolute;
    pointer-events: none;
  }
  .image-sub {
    position: absolute;
    user-select: none;
  }
  .anim-bob {
    animation: bob 11s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
  }
  @keyframes -global-bob {
    0% {
      rotate: 0deg;
    }
    25% {
      rotate: 4deg;
    }
    50% {
      rotate: 0deg;
    }
    75% {
      rotate: -4deg;
    }
  }
</style>
