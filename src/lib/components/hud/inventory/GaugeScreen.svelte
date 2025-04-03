<script lang="ts">
  import { location } from "svelte-spa-router";
  import {
    coords,
    depthOffset,
    depthMultiplier,
    nearVent,
  } from "$lib/stores/sub";
  import { inventoryApi, lolApi } from "$apis";
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

    let depthOffset = -5;
    let depth =
      depthOffset +
      Math.round(
        (coords.current.y / window.innerHeight) * 100 * $depthMultiplier,
      );
    return depth > 0 ? depth : 0;
  });
  let pressure = $derived.by(() => {
    return (1 + currentDepth / 10) * 101.325;
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
    <p class="mx-1 text-2xl">{$lolApi.getText("pressure")}:</p>
    <p class="mx-2 text-3xl">
      {pressure.toFixed(2)}<span class="text-2xl">kPa</span>
    </p>
  {/if}
  {#if $inventoryApi.isItemUnlocked("dg")}
    <p class="mx-1 text-2xl">{$lolApi.getText("depth")}:</p>
    <p class="mx-2 text-3xl">
      {currentDepth}<span class="text-2xl">m</span>
    </p>
  {/if}
  {#if $inventoryApi.isItemUnlocked("th")}
    <p class="mx-1 text-2xl">{$lolApi.getText("temperature")}:</p>
    <p class="mx-2 text-3xl">
      {temp.toFixed(2)}<span class="text-2xl">°C</span>
    </p>
  {/if}

  <!-- <p class="mx-2 text-4xl font-bold">{currentDepth}m</p> -->
</div>
<!-- {/if} -->
