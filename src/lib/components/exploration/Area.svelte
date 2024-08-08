<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    handleMouseDown,
    class: extraClass = "",
    children,
  }: {
    handleMouseDown?: (e: MouseEvent) => void;
    class?: string;
    children: Snippet;
  } = $props();
</script>

<div
  class="relative h-screen w-screen {extraClass}"
  onmousedown={handleMouseDown}
  role="button"
  tabindex="0"
>
  {@render children()}
</div>
