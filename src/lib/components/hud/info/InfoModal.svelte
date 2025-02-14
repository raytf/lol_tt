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
  import { infoApi } from "$apis";

  let {
    show = $bindable(),
    dialogClass,
  }: { show: boolean; dialogClass?: string } = $props();
  let iconClass = "w-[44px] h-[44px]";
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
  <div class="absolute -top-2 left-6 flex items-center gap-2">
    {#if $infoApi.smStep}
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
    {:else}
      <Info class="w-[44px] h-[44px]" />
    {/if}
  </div>

  <br />
  {#if $infoApi.smStep}
    <Lol key={`${$infoApi.smStep.titleKey}_def`} class="italic" />
  {/if}
  {#if $infoApi.textKey !== ""}
    <Lol key={$infoApi.textKey} class="text-lg" />
  {/if}
</Modal>

<style>
  :global(.modal) {
    background-color: var(--color);
  }
</style>
