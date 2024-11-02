<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import Objectives from "./objectives";
  import { SmModal, SmPuzzle } from "$components/hud/sm";
  import Inventory from "./inventory";
  import { hudApi, objectivesApi } from "$apis";
  let { children }: { children?: Snippet } = $props();
</script>

{#if $hudApi.activated}
  <div transition:fade class="container-hud">
    {#if $hudApi.showObjectives}
      <Objectives class="left-0" />
    {/if}
    {#if $hudApi.showInventory}
      <Inventory class="z-[101]" />
    {/if}
    {#if $hudApi.showSmModal}
      <SmModal class="z-[102] pointer-events-auto" />
    {/if}
    {#if $hudApi.showSmPuzzle}
      <SmPuzzle
        onCorrect={() => {
          setTimeout(() => {
            $hudApi.showSmPuzzle = false;
            $objectivesApi.completeTask("task_call-radio");
          }, 555);
        }}
        class="z-[102] pointer-events-auto"
      />
    {/if}
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}

<style>
  .container-hud {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;

    z-index: 100;
  }
</style>
