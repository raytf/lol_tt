<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";
  import {
    Observation,
    Question,
    Hypothesis,
    Experiment,
    Analysis,
    Conclusion,
  } from "$components/svg/icons/sm";
  import { Lol } from "$components/text";
  import { steps } from "$components/scientificMethod";
  import { infoApi } from "$apis";
  let {
    step,
    onclick,
    class: extraClass,
    children,
  }: {
    step: SM;
    onclick?: () => void;
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<button
  onclick={() => {
    $infoApi.openModal({
      infoType: step,
      textKeys: [`${steps[step].titleKey}_desc`],
    });
    onclick?.();
  }}
  class={cn("pointer-events-auto", step, extraClass)}
>
  <div class="flex">
    {#if step === "sm-o"}
      <Observation class="m-1" />
      <Lol key="sm-observation" class="font-bold" />:
    {:else if step === "sm-q"}
      <Question class="m-1" />
      <Lol key="sm-question" class="font-bold" />:
    {:else if step === "sm-h"}
      <Hypothesis class="m-1" />
      <Lol key="sm-hypothesis" class="font-bold" />:
    {:else if step === "sm-e"}
      <Experiment class="m-1" />
      <Lol key="sm-experiment" class="font-bold" />:
    {:else if step === "sm-a"}
      <Analysis class="m-1" />
      <Lol key="sm-analysis" class="font-bold" />:
    {:else if step === "sm-c"}
      <Conclusion class="m-1" />
      <Lol key="sm-conclusion" class="font-bold" />:
    {/if}
  </div>
  {@render children?.()}
</button>

<style>
  button:hover {
    color: var(--color);
  }
</style>
