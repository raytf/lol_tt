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
    flashlight = true,
    lightLevel = 1,
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
    lightLevel?: number;
    imgClass?: string;
    children?: Snippet;
  } = $props();
</script>

<div
  class="flashlight"
  style="transform: translate({$coords.x - 2 * offset.x}px, {$coords.y -
    2 * offset.y}px); width: {size * 2}px; height: {size *
    2}px; box-shadow: 0 0 0 9999px rgba(0, 0, 0, {1 - lightLevel});"
></div>
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
  .flashlight {
    position: fixed;
    border-radius: 50%;
    filter: blur(22px);
    z-index: 50;
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
