<script lang="ts">
  import { getInventoryApi } from "$apis/inventory.svelte";
  const inventoryApi = getInventoryApi();

  let {
    reveal = true,
    y = 0,
  }: {
    reveal?: boolean;
    y: number;
  } = $props();

  $effect(() => {
    let currentDepth = Math.round((y / window.innerHeight) * 100);
    pressure = 1 + currentDepth / 10;
  });

  let pressure = $state(1);
</script>

{#if reveal}
  <div class="fixed size-full pointer-events-none select-none z-[30]">
    <p class="absolute left-4 bottom-4 text-4xl font-bold">{pressure}atm</p>
  </div>
{/if}
