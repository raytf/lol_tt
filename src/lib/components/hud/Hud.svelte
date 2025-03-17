<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { location } from "svelte-spa-router";
  import Objectives from "$components/hud/objectives";
  import { InterfaceScreen } from "$components/hud/interface";
  import { Dialog } from "$components/hud/dialog";
  import { SmModal, SmPuzzle } from "$components/hud/sm";
  import {
    InventoryToggle,
    InventoryModal,
    ItemUnlockScreen,
  } from "$components/hud/inventory";
  import { Notepad } from "$components/hud/notepad";
  import { Map } from "$components/hud/map";
  import { InfoModal } from "$components/hud/info";
  import { SettingsModal, SettingsToggle } from "$components/hud/settings";

  import {
    hudApi,
    dialogApi,
    objectivesApi,
    inventoryApi,
    notepadApi,
    smApi,
    lolApi,
    radioApi,
    gameApi,
  } from "$apis";
  import { noSignal } from "$dialog/radio";
  import { storyComponent } from "$stores/component";

  const disableHideClass = "disabled opacity-50";
</script>

{#if $hudApi.enabled}
  <div transition:fade class="container-hud">
    <div class="absolute size-full z-[104]">
      <svelte:component this={$storyComponent} />
    </div>
    <InterfaceScreen class="z-[100]" />
    {#if $hudApi.showObjectives}
      <div transition:fade>
        <Objectives
          class="z-100 left-0 {($hudApi.showDialog ||
            $hudApi.showSmModal ||
            $hudApi.showSmPuzzle ||
            $hudApi.showMap) &&
            disableHideClass}"
        />
      </div>
    {/if}
    {#if $hudApi.showDialog}
      <div transition:fade>
        <Dialog
          dialog={$dialogApi.currentDialog}
          class="z-[105]"
          optionsClass="z-[106] pointer-events-auto"
        />
      </div>
    {/if}
    {#if $hudApi.enableSettings}
      <SettingsToggle
        onclick={() => ($hudApi.openSettings = true)}
        class="z-[101] right-0"
      />
      <SettingsModal dialogClass="z-[102]" backdropClass="z-[102]" />
    {/if}
    {#if $gameApi.startedGame && $hudApi.enableInventory}
      <InventoryToggle buttonClass="z[101] right-14" />
      <InventoryModal dialogClass="z-[102]" backdropClass="z-[102]" />
    {/if}
    {#if $hudApi.showItemUnlock}
      <div transition:fade>
        {#if $inventoryApi.newItemUnlock}
          <ItemUnlockScreen
            item={$inventoryApi.newItemUnlock}
            onFinish={() => {
              $hudApi.endItemUnlock();
            }}
            class="z-[110] pointer-events-auto"
          />
        {/if}
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
        onCall={() => {
          $radioApi.call($location);
        }}
        class="z-[102] pointer-events-auto"
      />
    {/if}
    {#if $hudApi.showNotepad}
      <div
        transition:fly={{ x: 555 }}
        class="absolute w-[70%] h-[88%] bottom-2 right-2 z-[100]"
      >
        <Notepad class="size-full opacity-80" />
      </div>
    {/if}
    {#if $hudApi.showMap}
      <div
        transition:fly={{ x: -555 }}
        class="absolute h-3/4 w-full bottom-0 z-[102]"
      >
        <Map
          onClose={() => {
            $hudApi.showMap = false;
          }}
          class=""
        />
      </div>
    {/if}
    <InfoModal bind:show={$hudApi.showInfoModal} dialogClass="z-[103]" />
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
