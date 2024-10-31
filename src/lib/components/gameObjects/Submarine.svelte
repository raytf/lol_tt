<script lang="ts">
  import type { Snippet } from "svelte";
  import { fly } from "svelte/transition";
  import { backOut, backIn } from "svelte/easing";
  import { coords, direction } from "$lib/stores/sub";
  import sub from "$assets/sprites/sub.png";

  let {
    targetPosition = { x: 0, y: 0 },
    size = 111,
    offset = { x: size / 2, y: size / 2 },
    class: extraClass = "",
    imgClass = "",
    bob = false,
    reveal = true,
    flashlight = false,
    children,
    ...props
  }: {
    targetPosition?: { x: number; y: number };
    size?: number;
    offset?: { x: number; y: number };
    class?: string;
    bob?: boolean;
    reveal?: boolean;
    flashlight?: boolean;
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
  {#if flashlight}
    <div
      class="flashlight"
      style="transform: translate({-offset.x}px, {-offset.y}px); width: {size *
        2}px; height: {size * 2}px"
    ></div>
  {/if}
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
  .flashlight {
    position: absolute;
    border-radius: 50%;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.4);
    filter: blur(22px);
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
