<script lang="ts">
  import { location } from "svelte-spa-router";
  import { untrack } from "svelte";
  import {
    coords,
    depthOffset,
    depthMultiplier,
    nearVent,
  } from "$lib/stores/sub";
  import { minOffset, gridOffset } from "$lib/stores/exploration";
  import { inventoryApi, lolApi, gameApi, interfaceApi } from "$apis";
  import { cn } from "$lib/utils";

  let {
    class: extraClass,
  }: {
    class?: string;
  } = $props();

  let highPressure = false;

  let currentDepth = $derived.by(() => {
    if ($location === "/surface") {
      return 0;
    }
    //console.log(coords.current.y);
    const maxDepth = -($minOffset.y - $gameApi.windowHeight);
    const depthRatio = coords.current.y / maxDepth;
    //console.log(depthRatio);
    //console.log(gridOffset.current.y);

    let depthOffset = 0;
    let depthMultiplier = 1;
    if ($location === "/abyss") {
      depthOffset = 250;
      depthMultiplier = 10;
    }
    let depth = depthOffset + Math.round(depthRatio * depthMultiplier * 250);
    return depth > 0 ? depth : 0;
  });
  let pressure = $derived.by(() => {
    return (1 + currentDepth / 10) * 101.325;
  });
  let temp = $derived.by(() => {
    if (currentDepth === 0) {
      return 20;
    }
    let val = 18 - Math.log(currentDepth) * 2;
    if ($nearVent) {
      val += Math.exp(currentDepth / 1000);
    }
    return val;
  });

  $effect(() => {
    if (currentDepth > 210) {
      if (!highPressure) {
        $interfaceApi.showWarning({
          level: "warning",
          text: "warning-pressure",
        });
      }
      highPressure = true;
    } else {
      if (highPressure) {
        $interfaceApi.hideWarning("warning-pressure");
      }
      highPressure = false;
    }
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
    <p class="mx-1 text-xl">{$lolApi.getText("pressure")}:</p>
    <p class="mx-2 text-2xl">
      {pressure.toFixed(2)}<span class="text-xl">kPa</span>
    </p>
  {/if}
  {#if $inventoryApi.isItemUpgraded("pg")}
    <p class="mx-1 text-xl">{$lolApi.getText("depth")}:</p>
    <p class="mx-2 text-2xl">
      {currentDepth}<span class="text-xl">m</span>
    </p>
  {/if}
  {#if $inventoryApi.isItemUnlocked("th")}
    <p class="mx-1 text-xl">{$lolApi.getText("temperature")}:</p>
    <p class="mx-2 text-2xl">
      {temp.toFixed(2)}<span class="text-xl">°C</span>
    </p>
  {/if}
  <!-- 
  <p class="mx-2 text-4xl font-bold">{currentDepth}m</p> -->
</div>
<!-- {/if} -->
