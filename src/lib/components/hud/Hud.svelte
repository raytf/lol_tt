<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import Objectives from "./objectives";
  import Inventory from "./inventory";
  let { children }: { children?: Snippet } = $props();
</script>

<div transition:fade class="container-hud">
  <Objectives class="left-0" />
  <Inventory />
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .container-hud {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;

    z-index: 100;
  }
</style>
