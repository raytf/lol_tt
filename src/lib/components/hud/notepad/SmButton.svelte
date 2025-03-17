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

<p class="mx-3">&nbsp</p>
<button
  onclick={() => {
    $infoApi.openModal({
      infoType: step,
      textKeys: [`${steps[step].titleKey}_desc`],
    });
    onclick?.();
  }}
  class={cn("absolute pointer-events-auto", step, extraClass)}
>
  {#if step === "sm-o"}
    <Observation class="mt-1" />
  {:else if step === "sm-q"}
    <Question class="mt-1" />
  {:else if step === "sm-h"}
    <Hypothesis class="mt-1" />
  {:else if step === "sm-e"}
    <Experiment class="mt-1" />
  {:else if step === "sm-a"}
    <Analysis class="mt-1" />
  {:else if step === "sm-c"}
    <Conclusion class="mt-1" />
  {/if}
  {@render children?.()}
</button>

<style>
  button:hover {
    color: var(--color);
  }
</style>
