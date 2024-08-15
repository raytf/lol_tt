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

<Card img={imgSrc} {onclick} horizontal size="lg" class="text-left px-4 py-2">
  <h2 class="mb-2 text-5xl font-bold tracking-tight text-gray-900">
    {lolApi.getText(nameKey)}
  </h2>
  <p class="mb-3 text-2xl font-normal text-gray-700 leading-tight">
    {lolApi.getText(descKey)}
  </p>
  {#if actionKey}
    <div class="flex flex-row items-center text-lg">
      <HandClick />
      <p class="ml-2">{lolApi.getText(actionKey)}</p>
    </div>
  {/if}
</Card>
