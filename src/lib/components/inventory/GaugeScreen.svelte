<script lang="ts">
  import { coords, depthOffset } from "$lib/stores/sub";
  import { getInventoryApi } from "$apis/inventory.svelte";
  const inventoryApi = getInventoryApi();

  let currentDepth = $state(0);
  let pressure = $state(1);

  coords.subscribe((value) => {
    currentDepth =
      $depthOffset + Math.round((value.y / window.innerHeight) * 100);
    pressure = 1 + currentDepth / 10;
  });
</script>

{#if inventoryApi.showGaugeScreen}
  <div
    class="fixed size-full pointer-events-none select-none flex flex-col justify-end z-[30]"
  >
    {#if inventoryApi.isItemUnlocked("dg")}
      <p class="mx-2 text-4xl font-bold">{currentDepth}m</p>
    {/if}
    <p class="m-2 text-4xl font-bold">{pressure}atm</p>
  </div>
{/if}
