<script lang="ts">
  import { fly } from "svelte/transition";
  import { Backpack } from "$components/svg/icons/hud";
  import { hudApi, inventoryApi, objectivesApi } from "$apis";

  let { buttonClass }: { buttonClass?: string } = $props();

  function openInventory() {
    $objectivesApi.completeTask("task_open-inventory");
    $hudApi.openInventory = true;
  }
</script>

<button
  transition:fly={{ y: -222 }}
  onclick={() => {
    if (!$inventoryApi.isItemUnlocked("radio")) {
      $hudApi.startItemUnlock({
        itemId: "radio",
        onFinished: () => {
          openInventory();
        },
      });
      return;
    }

    openInventory();
  }}
  class="button-toggle {buttonClass}"
>
  <Backpack class="w-[55px] h-[55px]" />
</button>

<style>
  .button-toggle {
    pointer-events: auto;
    position: absolute;
    top: 0;
    margin: 0.22em;
    opacity: 0.88;
  }
</style>
