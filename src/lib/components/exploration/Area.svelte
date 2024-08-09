<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    class: extraClass = "",
    children,
    ...props
  }: {
    onmousedown?: (event: MouseEvent) => void;
    onmouseenter?: (event: MouseEvent) => void;
    class?: string;
    children: Snippet;
  } = $props();
</script>

<div
  class="relative size-full {extraClass}"
  role="button"
  tabindex="0"
  {...props}
>
  {@render children()}
</div>
