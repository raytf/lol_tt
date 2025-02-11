<script lang="ts">
  import { location } from "svelte-spa-router";
  import { Modal, Drawer } from "flowbite-svelte";
  import ItemCard from "./ItemCard.svelte";
  import { Lol } from "$components/text";
  import { Close } from "$components/svg/icons";
  import { InfoButton } from "$components/ui/button";

  import { hudApi, lolApi, inventoryApi, objectivesApi, radioApi } from "$apis";
  import { flipElement } from "$stores/flip";

  let {
    dialogClass,
    backdropClass,
  }: {
    dialogClass?: string;
    backdropClass?: string;
  } = $props();

  let selectedItem = $state("");
  let smallIconElements = $state<HTMLElement[]>([]);
  let bigIconElement = $state<HTMLElement>();

  function onItemClicked(itemId: string, index: number = 0) {
    selectedItem = "";
    $hudApi.openInventory = false;
    if (itemId === "sm") {
      $hudApi.showSmModal = true;
    }
    if (itemId === "radio") {
      if (smallIconElements[index]) {
        flipElement.set(smallIconElements[index]);
      }
      if (bigIconElement) {
        flipElement.set(bigIconElement);
      }

      if ($objectivesApi.hasCompleted("obj_answer-radio")) {
        $hudApi.showSmPuzzle = true;
      } else {
        $radioApi.call($location);
      }
    }
    if (itemId === "notepad") {
      $hudApi.showNotepad = true;
    }
    if (itemId === "map") {
      $hudApi.showMap = true;
    }
  }
</script>

<Modal
  bind:open={$hudApi.openInventory}
  title={$lolApi.getText("inventory")}
  classDialog="absolute pointer-events-auto {dialogClass}"
  classBackdrop={backdropClass}
  autoclose
  outsideclose
>
  <div class="flex flex-col items-center text-black p-4">
    <div class="grid grid-cols-5 gap-2">
      {#each $inventoryApi.unlockedItems as item, i}
        <div
          class="relative pointer-events-auto flex justify-center items-center border-2 border-gray-900 rounded p-5"
        >
          <button
            onclick={() => onItemClicked(item, i)}
            class="w-[55px] h-[55px]"
          >
            <img
              bind:this={smallIconElements[i]}
              src={$inventoryApi.getItem(item).imgSrc}
              alt={item}
              class="size-full"
            />
          </button>
          <InfoButton
            onclick={() => (selectedItem = item)}
            buttonClass="absolute top-[-1%] right-[-1%]"
            imgClass="w-[33px] h-[33px]"
          ></InfoButton>
        </div>
      {/each}
    </div>
  </div>
  <div
    class="pointer-events-auto cursor-pointer w-full flex justify-center pb-8"
  >
    {#if selectedItem !== ""}
      <ItemCard
        bind:imgRef={bigIconElement}
        onclick={() => onItemClicked(selectedItem)}
        id={selectedItem}
      />
    {/if}
  </div>
</Modal>
