<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  let {
    onclick,
    class: extraClass,
    children,
  }: { onclick?: () => void; class?: string; children?: Snippet } = $props();
</script>

<button
  {onclick}
  class={cn(
    "border border-black rounded pl-1 pr-2",
    "hover:bg-black hover:text-white",
    extraClass,
  )}
>
  {#if children}
    {@render children()}
  {/if}
</button>
