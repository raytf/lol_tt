<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    size = [1024, 576],
    class: extraClass = "",
    onmousedown,
    children,
  }: {
    size?: [number, number];
    class?: string;
    onmousedown?: (event: MouseEvent) => void;
    children?: Snippet;
  } = $props();
</script>

<div
  role="button"
  tabindex="0"
  class="relative {extraClass}"
  style="width: {size[0]}px; height: {size[1]}px;"
  {onmousedown}
>
  {#if children}
    {@render children()}
  {/if}
</div>
