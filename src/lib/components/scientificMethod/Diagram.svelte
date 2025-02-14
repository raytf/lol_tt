<script lang="ts">
  import { gsap } from "gsap";
  import {
    Observation,
    Question,
    Hypothesis,
    Experiment,
    Analysis,
    Conclusion,
  } from "$components/svg/icons/sm";
  import steps from "./steps";
  import { lolApi } from "$apis";
  import { cn } from "$lib/utils";

  let {
    visible = true,
    activeIndex = 0,
    onClickStep,
    class: extraClass,
    itemClass,
  }: {
    visible?: boolean;
    activeIndex?: number;
    onClickStep?: (step: SMStep) => void;
    class?: string;
    itemClass?: string;
  } = $props();

  let revealTl: gsap.core.Timeline;
  $effect(() => {
    gsap.set(".grid-item", { opacity: 0 });
    revealTl = gsap.timeline({ paused: true });
    revealTl.to(".grid-item", {
      opacity: 1,
      duration: 1,
      stagger: 0.33,
    });
  });

  $effect(() => {
    if (visible) {
      revealTl.play();
    } else {
      revealTl.reverse();
    }
  });
</script>

<div class="grid grid-cols-3 grid-rows-2 text-black {extraClass}">
  {#each steps as step, i}
    <button
      onclick={() => onClickStep?.(step)}
      class={cn(
        itemClass,
        activeIndex >= 0 && activeIndex < steps.length && activeIndex !== i
          ? "brightness-50"
          : "",
        i == 1 && "mb-4",
        `grid-item border-black ${step.border} ${step.label}`,
        "hover:brightness-125",
      )}
    >
      <p class="text-2xl font-bold">
        {i + 1}. {$lolApi.getText(step.titleKey)}
      </p>
      {#if step.label === "sm-o"}
        <Observation class="w-[55px] h-[55px] m-2 pointer-events-none" />
      {:else if step.label === "sm-q"}
        <Question class="w-[55px] h-[55px] m-2 pointer-events-none" />
      {:else if step.label === "sm-h"}
        <Hypothesis class="w-[55px] h-[55px] m-2 pointer-events-none" />
      {:else if step.label === "sm-e"}
        <Experiment class="w-[55px] h-[55px] m-2 pointer-events-none" />
      {:else if step.label === "sm-a"}
        <Analysis class="w-[55px] h-[55px] m-2 pointer-events-none" />
      {:else if step.label === "sm-c"}
        <Conclusion class="w-[55px] h-[55px] m-2 pointer-events-none" />
      {/if}
    </button>
  {/each}
</div>

<style>
  :global(.sm-o) {
    --color: #3b82f6;
  }
  :global(.sm-q) {
    --color: #06b6d4;
  }
  :global(.sm-h) {
    --color: #22c55e;
  }
  :global(.sm-e) {
    --color: #fde047;
  }
  :global(.sm-a) {
    --color: #f97316;
  }
  :global(.sm-c) {
    --color: #ef4444;
  }
  :global(.color) {
    color: var(--color);
  }

  .grid-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    user-select: none;
    background-color: var(--color);

    transition: filter 1s;
  }
</style>
