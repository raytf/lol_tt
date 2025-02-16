<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import { Lol } from "$components/text";
  import {
    Observation,
    Question,
    Hypothesis,
    Experiment,
    Analysis,
    Conclusion,
  } from "$components/svg/icons/sm";
  import { Info } from "$components/svg/icons";
  import { cn } from "$lib/utils";
  import { infoApi, hudApi } from "$apis";

  let {
    show = $bindable(),
    dialogClass,
  }: { show: boolean; dialogClass?: string } = $props();
  let iconClass = "w-[44px] h-[44px] pointer-events-none";
</script>

<Modal
  bind:open={show}
  classDialog={cn("absolute pointer-events-auto", dialogClass)}
  class={cn(
    $infoApi.smStep && `modal ${$infoApi.smStep.label}`,
    "text-black p-2",
  )}
  autoclose
  outsideclose
>
  <div class="absolute -top-2 left-6">
    {#if $infoApi.smStep}
      <button
        onclick={() => {
          $infoApi.closeModal();
          $hudApi.showSmModal = true;
        }}
        class="flex items-center gap-2 hover:text-white transition-colors"
      >
        {#if $infoApi.smStep.label === "sm-o"}
          <Observation class={iconClass} />
        {:else if $infoApi.smStep.label === "sm-q"}
          <Question class={iconClass} />
        {:else if $infoApi.smStep.label === "sm-h"}
          <Hypothesis class={iconClass} />
        {:else if $infoApi.smStep.label === "sm-e"}
          <Experiment class={iconClass} />
        {:else if $infoApi.smStep.label === "sm-a"}
          <Analysis class={iconClass} />
        {:else if $infoApi.smStep.label === "sm-c"}
          <Conclusion class={iconClass} />
        {/if}
        <Lol key={$infoApi.smStep.titleKey} class="font-bold text-xl" />
      </button>
    {:else}
      <Info class="w-[44px] h-[44px]" />
    {/if}
  </div>

  <br />
  {#if $infoApi.smStep}
    <Lol key={`${$infoApi.smStep.titleKey}_def`} class="italic" />
  {:else if $infoApi.descKey !== ""}
    <Lol key={$infoApi.descKey} class="italic" />
  {/if}
  {#each $infoApi?.textKeys as textKey}
    <Lol key={textKey} class="text-lg" />
  {/each}
</Modal>

<style>
  :global(.modal) {
    background-color: var(--color);
  }
</style>
