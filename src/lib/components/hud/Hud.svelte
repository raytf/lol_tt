<script lang="ts">
  import { fade } from "svelte/transition";
  import Objectives from "$components/hud/objectives";
  import { Dialog } from "$components/hud/dialog";
  import { SmModal, SmPuzzle } from "$components/hud/sm";
  import Inventory, { ItemUnlockScreen } from "$components/hud/inventory";
  import { hudApi, dialogApi, objectivesApi, inventoryApi } from "$apis";

  const disableHideClass = "disabled opacity-50";
</script>

{#if $hudApi.activated}
  <div transition:fade class="container-hud">
    {#if $hudApi.showObjectives}
      <Objectives
        class="z-100 left-0 {($hudApi.showDialog ||
          $hudApi.showSmModal ||
          $hudApi.showSmPuzzle) &&
          disableHideClass}"
      />
    {/if}
    {#if $hudApi.showDialog}
      <Dialog
        top={true}
        keys={$dialogApi.currentDialog}
        onFinished={() => {
          $hudApi.endDialog();
        }}
        class="z-[101]"
      />
    {/if}
    {#if $hudApi.showInventory}
      <Inventory
        class="z-[101] {($hudApi.showDialog ||
          $hudApi.showSmModal ||
          $hudApi.showSmPuzzle) &&
          disableHideClass}"
      />
    {/if}
    {#if $hudApi.showItemUnlock}
      <ItemUnlockScreen
        itemId={$inventoryApi.newItemUnlock}
        onFinish={() => {
          $hudApi.endItemUnlock();
        }}
        class="z-[102] pointer-events-auto"
      />
    {/if}
    {#if $hudApi.showSmModal}
      <SmModal class="z-[102] pointer-events-auto" />
    {/if}
    {#if $hudApi.showSmPuzzle}
      <SmPuzzle
        onClose={() => {
          $hudApi.showSmPuzzle = false;
        }}
        onCorrect={() => {
          setTimeout(() => {
            $hudApi.showSmPuzzle = false;
            $objectivesApi.completeTask("task_call-radio");
          }, 555);
        }}
        class="z-[102] pointer-events-auto"
      />
    {/if}
  </div>
{/if}

<style>
  :global(.disabled *) {
    pointer-events: none !important;
  }

  .container-hud {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;

    z-index: 100;
  }
</style>
