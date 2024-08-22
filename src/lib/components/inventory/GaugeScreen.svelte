<script lang="ts">
  import {
    coords,
    depthOffset,
    depthMultiplier,
    nearVent,
  } from "$lib/stores/sub";
  import { getInventoryApi } from "$apis/inventory.svelte";
  const inventoryApi = getInventoryApi();

  let currentDepth = $state(0);
  let pressure = $state(1);
  let temp = $state(0);

  coords.subscribe((value) => {
    currentDepth =
      $depthOffset +
      Math.round((value.y / window.innerHeight) * 100 * $depthMultiplier);
    pressure = 1 + currentDepth / 10;
    temp = 18 - Math.log(currentDepth) * 2;
    if ($nearVent) {
      temp += Math.exp(currentDepth / 1000) / 5;
    }
  });
</script>

{#if inventoryApi.showGaugeScreen}
  <div
    class="absolute size-full pointer-events-none select-none flex flex-col justify-end z-[30]"
  >
    {#if inventoryApi.isItemUnlocked("th")}
      <p class="m-2 text-4xl font-bold">{temp.toFixed(2)}°C</p>
    {/if}
    {#if inventoryApi.isItemUnlocked("dg")}
      <p class="mx-2 text-4xl font-bold">{currentDepth}m</p>
    {/if}
    <p class="m-2 text-4xl font-bold">{pressure}atm</p>
  </div>
{/if}
