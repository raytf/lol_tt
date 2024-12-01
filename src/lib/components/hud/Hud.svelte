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
    smApi,
  } from "$apis";
  import { noSignal } from "$dialog/radio";
  import { storyComponent } from "$stores/story";

  const disableHideClass = "disabled opacity-50";
</script>

<div transition:fade class="container-hud">
  {#if $hudApi.showObjectives}
    <div transition:fade>
      <Objectives
        class="z-100 left-0 {($hudApi.showDialog ||
          $hudApi.showSmModal ||
          $hudApi.showSmPuzzle ||
          $hudApi.showNotepad) &&
          disableHideClass}"
      />
    </div>
  {/if}
  {#if $hudApi.showDialog}
    <div transition:fade>
      <Dialog
        top={$dialogApi.positionTop}
        keys={$dialogApi.currentDialog}
        onFinished={() => {
          $hudApi.endDialog();
        }}
        class="z-[105] {$dialogApi.blockInput ? 'pointer-events-auto' : ''}"
        optionsClass="z-[106] pointer-events-auto"
      />
    </div>
  {/if}
  {#if $hudApi.showUnderlay}
    <svelte:component this={$storyComponent} />
  {/if}
  {#if $hudApi.showInventory}
    <Inventory
      class="z-[101] {($hudApi.showDialog ||
        $hudApi.showSmModal ||
        $hudApi.showSmPuzzle ||
        $hudApi.showItemUnlock) &&
        disableHideClass}"
      drawerClass="z-[101]"
    />
  {/if}
  {#if $hudApi.showItemUnlock}
    <div transition:fade>
      <ItemUnlockScreen
        itemId={$inventoryApi.newItemUnlock}
        onFinish={() => {
          $hudApi.endItemUnlock();
        }}
        class="z-[110] pointer-events-auto"
      />
    </div>
  {/if}
  {#if $hudApi.showSmModal}
    <div transition:fade>
      <SmModal
        activeIndex={$smApi.currentIndex}
        interactable={$smApi.isInteractable}
        class="{$smApi.modalClass} z-[102] pointer-events-auto"
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
          $hudApi.startHintDialog();
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
      transition:fly={{ x: -555 }}
      class="absolute w-[33%] h-3/4 bottom-2 left-2 z-[100]"
    >
      <Notepad
        title={$notepadApi.currentPage ? $notepadApi.currentPage.title : ""}
        lines={$notepadApi.currentPage ? $notepadApi.currentPage.lines : []}
        onClose={() => {
          $hudApi.showNotepad = false;
        }}
        class="size-full pointer-events-auto opacity-80"
      />
    </div>
  {/if}
</div>

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
