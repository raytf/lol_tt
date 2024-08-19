<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { spring } from "svelte/motion";
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

  let direction = $state(1);
  let coords = spring(
    { x: targetPosition.x, y: targetPosition.y },
    { stiffness: 0.01, damping: 0.8 },
  );

  $effect(() => {
    coords.set(targetPosition);

    const dx = targetPosition.x - untrack(() => $coords.x);
    direction = dx <= 0 ? -1 : 1;
  });
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
    style="transform: translate(-55px, -55px) scale({direction}, 1)"
  />
  {#if children}
    {@render children()}
  {/if}
</div>
