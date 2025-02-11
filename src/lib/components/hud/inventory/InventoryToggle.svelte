<script lang="ts">
  import { fly } from "svelte/transition";
  import { Backpack } from "$components/svg/icons/hud";
  import { hudApi, inventoryApi, objectivesApi } from "$apis";

  let { buttonClass }: { buttonClass?: string } = $props();
</script>

<button
  transition:fly={{ y: -222 }}
  onclick={() => {
    $hudApi.openInventory = true;
    $objectivesApi.completeTask("task_open-inventory");
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
    margin: 0.44em;
    opacity: 0.88;
  }
</style>
