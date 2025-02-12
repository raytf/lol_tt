<script lang="ts">
  import { Card } from "flowbite-svelte";
  import { HandClick } from "$components/svg/icons";
  import { lolApi } from "$apis/lol.svelte";

  let {
    imgRef = $bindable(),
    onclick,
    item,
    class: extraClass,
  }: {
    imgRef?: HTMLElement;
    onclick?: (e: MouseEvent) => void;
    item: ItemDetails;
    class?: string;
  } = $props();
</script>

<Card {onclick} size="lg" class="text-left py-2">
  <div class="flex flex-row items-center">
    <div class="mr-4 w-[111px] h-[111px]">
      <img bind:this={imgRef} src={item.imgSrc} alt="icon" class="size-full" />
    </div>

    <div class="flex flex-col">
      <h2 class="mb-2 text-4xl font-bold tracking-tight text-gray-900">
        {$lolApi.getText(item.nameKey)}
      </h2>
      <p class="mb-3 text-2xl font-normal text-gray-700 leading-tight">
        {@html $lolApi.getText(item.descKey)}
      </p>
      {#if item.actionKey}
        <div class="flex flex-row items-center text-lg">
          <HandClick />
          <p class="ml-2">{$lolApi.getText(item.actionKey)}</p>
        </div>
      {/if}
    </div>
  </div>
</Card>
