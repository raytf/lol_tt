<script>
  import { fade, fly } from "svelte/transition";
  import { Drawer } from "flowbite-svelte";
  import Backpack from "$components/svg/icons/Backpack.svelte";
  import close from "$assets/icons/close.svg";
  import { getInventoryApi, itemMap } from "$apis/inventory.svelte";
  const inventoryApi = getInventoryApi();

  let drawerHidden = $state(true);
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
      divClass="bg-white bg-opacity-90"
    >
      <div class="flex flex-col items-center text-black p-8">
        <button onclick={() => (drawerHidden = true)} class="button-toggle">
          <img src={close} alt="close" class="w-[55px] h-[55px]" />
        </button>
        <p class="font-bold text-4xl p-2">Inventory</p>
        <div class="grid grid-cols-4 gap-2">
          {#each inventoryApi.unlockedItems as item}
            <button
              onclick={() => console.log(item)}
              class="pointer-events-auto border-2 border-slate-500 rounded p-2"
            >
              <img
                src={itemMap[item].imgSrc}
                alt={item}
                class="w-[55px] h-[55px]"
              />
            </button>
          {/each}
        </div>
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
