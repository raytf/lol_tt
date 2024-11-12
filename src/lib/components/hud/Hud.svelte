<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { location } from "svelte-spa-router";
  import Objectives from "$components/hud/objectives";
  import { Dialog } from "$components/hud/dialog";
  import { SmModal, SmPuzzle } from "$components/hud/sm";
  import Inventory, { ItemUnlockScreen } from "$components/hud/inventory";
  import { Notepad } from "$components/hud/notepad";
  import {
    hudApi,
    dialogApi,
    objectivesApi,
    inventoryApi,
    notepadApi,
  } from "$apis";
  import { noSignal } from "$dialog/radio";
  const disableHideClass = "disabled opacity-50";
</script>

{#if $hudApi.activated}
  <div transition:fade class="container-hud">
    {#if $hudApi.showObjectives}
      <div transition:fade>
        <Objectives
          class="z-100 left-0 {($hudApi.showDialog ||
            $hudApi.showSmModal ||
            $hudApi.showSmPuzzle) &&
            disableHideClass}"
        />
      </div>
    {/if}
    {#if $hudApi.showDialog}
      <Dialog
        top={$dialogApi.positionTop}
        keys={$dialogApi.currentDialog}
        onFinished={() => {
          $hudApi.endDialog();
        }}
        class="{$dialogApi.aboveModal
          ? 'z-[105]'
          : 'z-[101]'} {$dialogApi.blockInput && 'pointer-events-auto'}"
        optionsClass="z-[102]"
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
      <div transition:fade>
        <ItemUnlockScreen
          itemId={$inventoryApi.newItemUnlock}
          onFinish={() => {
            $hudApi.endItemUnlock();
          }}
          class="z-[102] pointer-events-auto"
        />
      </div>
    {/if}
    {#if $hudApi.showSmModal}
      <div transition:fade>
        <SmModal
          activeIndex={$hudApi.smModalIndex}
          closable={$hudApi.smModalClosable}
          class="z-[102] pointer-events-auto"
        />
      </div>
    {/if}
    {#if $hudApi.showSmPuzzle}
      <SmPuzzle
        onClose={() => {
          $hudApi.showSmPuzzle = false;
        }}
        onCorrect={() => {
          //$objectivesApi.completeTask("task_call-radio");
          if ($location === "/surface") {
            console.log("surface");
          } else {
            $hudApi.startDialog({
              keys: noSignal,
            });
          }
        }}
        class="z-[102] pointer-events-auto"
      />
    {/if}
    {#if $hudApi.showNotepad}
      <div
        transition:slide={{ axis: "x" }}
        class="absolute w-[33%] h-3/4 bottom-2 right-2 z-[102]"
      >
        <Notepad
          title={$notepadApi.title}
          lines={$notepadApi.lines}
          onClose={() => {
            $hudApi.showNotepad = false;
          }}
          class="size-full pointer-events-auto opacity-80"
        />
      </div>
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
