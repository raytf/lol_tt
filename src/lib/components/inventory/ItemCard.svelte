<script lang="ts">
  import { Card } from "flowbite-svelte";
  import { HandClick } from "$components/svg/icons";
  import { itemMap } from "$apis/inventory.svelte";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    onclick,
    id,
    class: extraClass,
  }: {
    onclick?: (e: MouseEvent) => void;
    id: string;
    class?: string;
  } = $props();
</script>

<Card {onclick} size="lg" class="text-left py-2">
  <div class="flex flex-row items-center">
    <img src={itemMap[id].imgSrc} alt="icon" class="mr-4 w-[111px] h-[111px]" />
    <div class="flex flex-col">
      <h2 class="mb-2 text-4xl font-bold tracking-tight text-gray-900">
        {lolApi.getText(itemMap[id].nameKey)}
      </h2>
      <p class="mb-3 text-2xl font-normal text-gray-700 leading-tight">
        {@html lolApi.getText(itemMap[id].descKey)}
      </p>
      {#if itemMap[id].actionKey}
        <div class="flex flex-row items-center text-lg">
          <HandClick />
          <p class="ml-2">{lolApi.getText(itemMap[id].actionKey)}</p>
        </div>
      {/if}
    </div>
  </div>
</Card>
