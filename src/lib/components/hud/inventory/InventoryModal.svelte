<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { location } from "svelte-spa-router";
  import { Modal, Drawer } from "flowbite-svelte";
  import ItemCard from "./ItemCard.svelte";
  import { Lol } from "$components/text";
  import { Close } from "$components/svg/icons";
  import { InfoButton } from "$components/ui/button";

  import { hudApi, lolApi, inventoryApi, objectivesApi, radioApi } from "$apis";
  import { flipElement, doFlip } from "$stores/flip";

  let {
    dialogClass,
    backdropClass,
  }: {
    dialogClass?: string;
    backdropClass?: string;
  } = $props();

  let selectedItem = $state<ItemDetails>();
  let smallIconElements = $state<HTMLElement[]>([]);
  let bigIconElement = $state<HTMLElement>();

  function onItemClicked(item: ItemDetails, index: number = 0) {
    selectedItem = undefined;
    $hudApi.openInventory = false;
    if (item.id === "sm") {
      if ($objectivesApi.currentObjectiveIs("obj_start-sm")) {
        $objectivesApi.completeTask("task_open-sm");
      }
      $hudApi.showSmModal = true;
    }
    if (item.id === "radio") {
      if (smallIconElements[index]) {
        flipElement.set(smallIconElements[index]);
      }
      if (bigIconElement) {
        flipElement.set(bigIconElement);
      }

      $radioApi.call($location);
    }
    if (item.id === "notepad") {
      if (
        $objectivesApi.currentObjectiveIs("obj_prepare-dive") ||
        $objectivesApi.currentObjectiveIs("obj_notepad-o")
      ) {
        $objectivesApi.completeTask("task_open-notepad");
      }
      $hudApi.showNotepad = true;
    }
    if (item.id === "map") {
      $hudApi.showMap = true;
    }
  }

  onMount(() => {});
</script>

<Modal
  bind:open={$hudApi.openInventory}
  title={$lolApi.getText("inventory")}
  placement="top-center"
  classDialog="absolute pointer-events-auto {dialogClass}"
  classBackdrop={backdropClass}
  autoclose
  outsideclose
>
  <div class="flex flex-col text-black">
    {#if $inventoryApi.normalItems.length > 0}
      <Lol key="standard-tools" class="font-bold text-xl py-2" />
      <div class="grid grid-cols-5 gap-2">
        {#each $inventoryApi.normalItems as item, i}
          {@render itemList(item, i)}
        {/each}
      </div>
    {/if}
    {#if $inventoryApi.measuringItems.length > 0}
      <Lol key="measuring-tools" class="font-bold text-xl py-2" />
      <div class="grid grid-cols-5 gap-2">
        {#each $inventoryApi.measuringItems as item, i}
          {@render itemList(item, i)}
        {/each}
      </div>
    {/if}
  </div>
  <div
    class="pointer-events-auto cursor-pointer w-full flex justify-center pb-8"
  >
    {#if selectedItem}
      <ItemCard
        bind:imgRef={bigIconElement}
        onclick={() => {
          if (selectedItem) onItemClicked(selectedItem);
        }}
        item={selectedItem}
      />
    {/if}
  </div>
</Modal>

{#snippet itemList(item: ItemDetails, i: number)}
  <div
    transition:fade
    class="relative pointer-events-auto flex justify-center items-center border-2 border-gray-900 rounded p-5"
  >
    <button onclick={() => onItemClicked(item, i)} class="w-[55px] h-[55px]">
      <img
        bind:this={smallIconElements[i]}
        src={item.imgSrc}
        alt={item.id}
        class="size-full"
      />
    </button>
    <InfoButton
      onclick={() => (selectedItem = item)}
      buttonClass="absolute top-[-1%] right-[-1%]"
      imgClass="w-[33px] h-[33px]"
    ></InfoButton>
  </div>
{/snippet}
