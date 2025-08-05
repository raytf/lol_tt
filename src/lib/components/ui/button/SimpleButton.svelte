<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  let {
    onclick,
    class: extraClass,
    anim = () => ({ duration: 0 }),
    inAnim = anim,
    outAnim = anim,
    children,
  }: {
    onclick?: () => void;
    class?: string;
    anim?: TransitionFunction;
    inAnim?: TransitionFunction;
    outAnim?: TransitionFunction;
    children?: Snippet;
  } = $props();
</script>

<button
  in:inAnim
  out:outAnim
  {onclick}
  class={cn(
    "flex items-center gap-1 transition-colors",
    "hover:text-yellow-200",
    extraClass,
  )}
>
  {#if children}
    {@render children()}
  {/if}
</button>

<style>
  button {
    text-shadow: black 1px 2px 5px;
  }
</style>
