<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { Drawer } from "flowbite-svelte";
  import Backpack from "$components/svg/icons/Backpack.svelte";
  import ItemCard from "./ItemCard.svelte";
  import close from "$assets/icons/close.svg";
  import info from "$assets/icons/info.svg";
  import { getInventoryApi, itemMap } from "$apis/inventory.svelte";
  const inventoryApi = getInventoryApi();

  let drawerHidden = $state(true);
  let selectedItem = $state("");

  function onItemClicked(itemId: string) {
    drawerHidden = true;
    if (itemId === "conch") {
      console.log("conch");
    }
  }
</script>

{#if inventoryApi.unlocked}
  <div transition:fade class="container-inventory">
    {#if drawerHidden}
      <button
        transition:fly={{ y: -222 }}
        onclick={() => (drawerHidden = false)}
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
          <img src={close} alt="close" class="w-[55px] h-[55px]" />
        </button>
        <p class="font-bold text-4xl p-4">Inventory</p>
        <div class="grid grid-cols-4 gap-2">
          {#each inventoryApi.unlockedItems as item}
            <div
              class="relative pointer-events-auto border-2 border-gray-900 rounded p-2"
            >
              <button onclick={() => onItemClicked(item)}>
                <img
                  src={itemMap[item].imgSrc}
                  alt={item}
                  class="w-[55px] h-[55px]"
                />
              </button>
              <button onclick={() => (selectedItem = item)}>
                <img
                  src={info}
                  alt="info"
                  class="absolute top-[-1%] right-[-1%] w-[22px] h-[22px]"
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
            imgSrc={itemMap[selectedItem].imgSrc}
            nameKey={itemMap[selectedItem].nameKey}
            descKey={itemMap[selectedItem].descKey}
            actionKey={itemMap[selectedItem].actionKey}
            onclick={() => onItemClicked(selectedItem)}
          />
        {/if}
      </div>
    </Drawer>
  </div>
{/if}

<style>
  .container-inventory {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;

    z-index: 100;
  }

  .button-toggle {
    position: absolute;
    top: 0;
    right: 0;

    padding: 0.44em;

    pointer-events: auto;
  }
</style>
