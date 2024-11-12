<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    onclick,
    class: extraClass,
    children,
  }: { onclick?: () => void; class?: string; children?: Snippet } = $props();
</script>

<button {onclick} class="button {extraClass}">
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

    transition: all 1s;
  }
  .button:hover {
    background: rgba(0, 0, 0, 0.88);
    box-shadow: 0 0 22px rgba(222, 222, 222, 0.22);
  }
</style>
