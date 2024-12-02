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
    lolApi,
    radioApi,
  } from "$apis";
  import { noSignal } from "$dialog/radio";
  import { storyComponent } from "$stores/story";
  import type { Component } from "svelte";

  const disableHideClass = "disabled opacity-50";
</script>

<div transition:fade class="container-hud">
  <div class="absolute size-full z-[104]">
    <svelte:component this={$storyComponent} />
  </div>

  {#if $hudApi.showDebug}
    <div
      class="absolute bottom-0 w-full h-[55px] flex justify-center items-center"
    >
      <button onclick={() => $lolApi.clearState()} class="pointer-events-auto"
        >Clear state</button
      >
    </div>
  {/if}
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
      onCall={() => $radioApi.call()}
      class="z-[102] pointer-events-auto"
    />
  {/if}
  {#if $hudApi.showNotepad}
    <div
      transition:fly={{ x: 555 }}
      class="absolute w-[44%] h-4/5 bottom-2 right-2 z-[100]"
    >
      <Notepad class="size-full opacity-80" />
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
