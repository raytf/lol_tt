<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";

  let {
    onclick,
    class: extraClass,
    children,
  }: { onclick?: () => void; class?: string; children?: Snippet } = $props();

  onMount(() => {
    gsap.to(".button", { opacity: 1, duration: 0.44 });
  });
</script>

<button transition:fade|global {onclick} class="button {extraClass}">
  {#if children}
    {@render children()}
  {/if}
</button>

<style>
  .button {
    pointer-events: auto;
    display: flex;
    padding: 1em;
    background: rgba(0, 0, 0, 0.44);
    border-radius: 1.1em;
    opacity: 0;

    transition: all 1s;
  }
  .button:hover {
    background: rgba(0, 0, 0, 0.88);
    box-shadow: 0 0 22px rgba(222, 222, 222, 0.22);
  }
</style>
