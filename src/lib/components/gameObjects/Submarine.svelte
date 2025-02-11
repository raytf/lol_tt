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
    addCoating = false,
    children,
    ...props
  }: {
    targetPosition?: { x: number; y: number };
    size?: number;
    offset?: { x: number; y: number };
    class?: string;
    bob?: boolean;
    reveal?: boolean;
    addCoating?: boolean;
    imgClass?: string;
    children?: Snippet;
  } = $props();
</script>

<div
  class="container-sub {addCoating && 'coating'} {extraClass}"
  style="transform: translate({$coords.x - offset.x}px, {$coords.y -
    offset.y}px); width: {size}px; height: {size}px"
  {...props}
>
  {#if reveal}
    <img
      in:fly={{ y: 111, duration: 1111, easing: backOut }}
      out:fly={{ y: 111, duration: 1111, easing: backIn }}
      src={sub}
      alt="sub"
      height={size}
      width={size}
      class="absolute select-none {imgClass} {bob && 'anim-bob'}"
      style="scale: {$direction.x} 1"
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
  .coating {
    filter: brightness(1.3) contrast(1.5) saturate(0.8)
      drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
  }
  .image-sub {
    position: absolute;
    user-select: none;
  }
  .anim-bob {
    animation: bob 11s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
  }
  @keyframes bob {
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
