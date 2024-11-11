<script lang="ts">
  import { fly } from "svelte/transition";
  import { Drawer } from "flowbite-svelte";
  import ItemCard from "./ItemCard.svelte";
  import { Lol } from "$components/text";
  import { Close } from "$components/svg/icons";
  import { InfoButton } from "$components/ui/button";
  import { Backpack } from "$components/svg/icons/hud";
  import { hudApi, inventoryApi, objectivesApi } from "$apis";

  let { class: extraClass }: { class?: string } = $props();

  let drawerHidden = $state(true);
  let selectedItem = $state("");
  let smallIconElements = $state<HTMLElement[]>([]);
  let bigIconElement = $state<HTMLElement>();

  function onItemClicked(itemId: string, index: number = 0) {
    selectedItem = "";
    drawerHidden = true;
    if (itemId === "sm") {
      $hudApi.showSmModal = true;
    }
    if (itemId === "radio") {
      if (smallIconElements[index]) {
        $hudApi.flipElement = smallIconElements[index];
      }
      if (bigIconElement) {
        $hudApi.flipElement = bigIconElement;
      }
      $hudApi.showSmPuzzle = true;
    }
    if (itemId === "conch") {
      $inventoryApi.showHintDialog = true;
    }
  }
</script>

<div class="container-inventory {extraClass}">
  {#if drawerHidden}
    <button
      transition:fly={{ y: -222 }}
      onclick={() => {
        drawerHidden = false;
        $objectivesApi.completeTask("task_open-inventory");
      }}
      class="button-toggle"
    >
      <Backpack class="w-[55px] h-[55px]" />
    </button>
  {/if}
  <Drawer
    bind:hidden={drawerHidden}
    backdrop={false}
    placement="top"
    width="w-full"
    transitionType="fly"
    transitionParams={{ y: -222 }}
    class="absolute"
    divClass="bg-white bg-opacity-90"
  >
    <div class="flex flex-col items-center text-black p-4">
      <button
        onclick={() => {
          drawerHidden = true;
          selectedItem = "";
        }}
        class="button-toggle"
      >
        <Close class="w-[55px] h-[55px]" />
      </button>
      <Lol key="inventory" class="font-bold text-4xl p-4" />
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
  </Drawer>
</div>

<style>
  .container-inventory {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
  }
  .button-toggle {
    pointer-events: auto;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.44em;
    opacity: 0.88;
  }
  .button-backpack:hover {
    opacity: 1;
  }
</style>
