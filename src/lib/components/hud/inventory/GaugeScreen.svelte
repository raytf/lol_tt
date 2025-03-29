<script lang="ts">
  import { location } from "svelte-spa-router";
  import {
    coords,
    depthOffset,
    depthMultiplier,
    nearVent,
  } from "$lib/stores/sub";
  import { inventoryApi } from "$apis";
  import { cn } from "$lib/utils";

  let {
    class: extraClass,
  }: {
    class?: string;
  } = $props();

  let currentDepth = $derived.by(() => {
    if ($location === "/surface") {
      return 0;
    }
    return (
      $depthOffset +
      Math.round(
        (coords.current.y / window.innerHeight) * 100 * $depthMultiplier,
      )
    );
  });
  let pressure = $derived.by(() => {
    return 1 + currentDepth / 10;
  });
  let temp = $derived.by(() => {
    let val = 18 - Math.log(currentDepth) * 2;
    if ($nearVent) {
      val += Math.exp(currentDepth / 1000) / 5;
    }
    return val;
  });
</script>

<!-- {#if $inventoryApi.showGaugeScreen} -->
<div
  class={cn(
    "absolute size-full pointer-events-none select-none flex flex-col justify-end",
    extraClass,
  )}
>
  {#if $inventoryApi.isItemUnlocked("pg")}
    <p class="m-2 text-4xl font-bold">{pressure}atm</p>
  {/if}
  {#if $inventoryApi.isItemUnlocked("th")}
    <p class="m-2 text-4xl font-bold">{temp.toFixed(2)}°C</p>
  {/if}
  {#if $inventoryApi.isItemUnlocked("dg")}
    <p class="mx-2 text-4xl font-bold">{currentDepth}m</p>
  {/if}
  <p class="mx-2 text-4xl font-bold">{currentDepth}m</p>
</div>
<!-- {/if} -->
