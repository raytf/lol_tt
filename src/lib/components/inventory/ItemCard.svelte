<script lang="ts">
  import { Card } from "flowbite-svelte";
  import { HandClick } from "$components/svg/icons";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    onclick,
    imgSrc,
    nameKey,
    descKey,
    actionKey,
    class: extraClass,
  }: {
    onclick?: (e: MouseEvent) => void;
    imgSrc: string;
    nameKey: string;
    descKey: string;
    actionKey?: string;
    class?: string;
  } = $props();
</script>

<Card {onclick} size="lg" class="text-left py-2">
  <div class="flex flex-row items-center">
    <img src={imgSrc} alt="icon" class="mr-4 w-[111px] h-[111px]" />
    <div class="flex flex-col">
      <h2 class="mb-2 text-4xl font-bold tracking-tight text-gray-900">
        {lolApi.getText(nameKey)}
      </h2>
      <p class="mb-3 text-2xl font-normal text-gray-700 leading-tight">
        {@html lolApi.getText(descKey)}
      </p>
      {#if actionKey}
        <div class="flex flex-row items-center text-lg">
          <HandClick />
          <p class="ml-2">{lolApi.getText(actionKey)}</p>
        </div>
      {/if}
    </div>
  </div>
</Card>
