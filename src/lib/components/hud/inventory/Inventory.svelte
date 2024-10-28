<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { Drawer } from "flowbite-svelte";
  import { ItemCard } from "$components/inventory";
  import { Close } from "$components/svg/icons";
  import info from "$assets/icons/info.svg";
  import { Backpack } from "$components/svg/icons/hud";
  import { hudApi, inventoryApi } from "$apis";

  let { class: extraClass }: { class?: string } = $props();

  let drawerHidden = $state(true);
  let selectedItem = $state("");

  function onItemClicked(itemId: string) {
    selectedItem = "";
    drawerHidden = true;
    if (itemId === "sm") {
      $hudApi.completeTask("task_reviewSM");
      $inventoryApi.showSmModal = true;
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
        $hudApi.completeTask("task_openInventory");
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
    divClass="bg-white bg-opacity-70"
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
      <p class="font-bold text-4xl p-4">Inventory</p>
      <div class="grid grid-cols-5 gap-2">
        {#each $inventoryApi.unlockedItems as item}
          <div
            class="relative pointer-events-auto flex justify-center items-center border-2 border-gray-900 rounded p-5"
          >
            <button onclick={() => onItemClicked(item)}>
              <img
                src={$inventoryApi.getItem(item).imgSrc}
                alt={item}
                class="w-[55px] h-[55px]"
              />
            </button>
            <button onclick={() => (selectedItem = item)}>
              <img
                src={info}
                alt="info"
                class="absolute top-[-1%] right-[-1%] w-[33px] h-[33px]"
              />
            </button>
          </div>
        {/each}
      </div>
    </div>
    <div
      class="pointer-events-auto cursor-pointer w-full flex justify-center pb-8"
    >
      {#if selectedItem !== ""}
        <ItemCard
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

    z-index: 100;
  }
  .button-toggle {
    pointer-events: auto;
    position: absolute;
    right: 0;
    opacity: 0.88;
  }
  .button-backpack:hover {
    opacity: 1;
  }
</style>
