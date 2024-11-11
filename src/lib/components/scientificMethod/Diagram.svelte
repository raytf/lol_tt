<script lang="ts">
  import { gsap } from "gsap";
  import steps from "./steps";
  import { lolApi } from "$apis";

  let {
    visible = true,
    activeIndex = 0,
    class: extraClass,
    itemClass,
  }: {
    visible?: boolean;
    activeIndex?: number;
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

<div class="grid grid-cols-3 grid-rows-2 {extraClass}">
  {#each steps as step, i}
    <div
      class="{itemClass} {activeIndex === i
        ? ''
        : activeIndex >= 0 && activeIndex < steps.length
          ? 'brightness-50'
          : ''} grid-item border-black {step.border} {step.titleKey}"
    >
      <p class="text-2xl font-bold text-black">
        {i + 1}. {$lolApi.getText(step.titleKey)}
      </p>
      <img src={step.image} alt="icon" class="w-[55px] h-[55px] m-2" />
    </div>
  {/each}
</div>

<style>
  :global(.sm-observation) {
    --color: #3b82f6;
  }
  :global(.sm-question) {
    --color: #06b6d4;
  }
  :global(.sm-hypothesis) {
    --color: #22c55e;
  }
  :global(.sm-experiment) {
    --color: #fde047;
  }
  :global(.sm-analysis) {
    --color: #f97316;
  }
  :global(.sm-conclusion) {
    --color: #ef4444;
  }
  :global(.sm-text) {
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
