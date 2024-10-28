<script lang="ts">
  import type { Snippet } from "svelte";
  import { coords, direction } from "$lib/stores/sub";
  import sub from "$assets/sprites/sub.png";

  let {
    targetPosition = { x: 0, y: 0 },
    size = 111,
    class: extraClass = "",
    children,
    ...props
  }: {
    targetPosition?: { x: number; y: number };
    size?: number;
    class: string;
    children?: Snippet;
  } = $props();
</script>

<div
  class="absolute {extraClass} pointer-events-none"
  style="transform: translate({$coords.x}px, {$coords.y}px)"
  {...props}
>
  <img
    src={sub}
    alt="sub"
    height={size}
    width={size}
    class="select-none"
    style="transform: translate(-55px, -55px) scale({$direction}, 1)"
  />
  {#if children}
    {@render children()}
  {/if}
</div>
