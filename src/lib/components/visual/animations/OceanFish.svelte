<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { gsap } from "gsap";
  import { Fish, FishType } from "$components/gameObjects";
  import { cn } from "$lib/utils";

  let {
    height = 576,
    width = 1920,
    containerClass = "",
    fishClass = "",
  } = $props();

  function getRandomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let fishTimelines: { [key: string]: gsap.core.Timeline } = {};
  let fishSize = 25;

  const fishTypes = [...Object.values(FishType), ...Object.values(FishType)];

  function moveFish(fishClass: string, forward = true) {
    if (fishTimelines[fishClass] !== undefined) {
      fishTimelines[fishClass].kill();
    }

    fishTimelines[fishClass] = gsap.timeline();
    const randomY = getRandomNum(0, height - fishSize * 3);
    const randomDuration = getRandomNum(5, 15);
    const randomDelay = getRandomNum(0, 2);

    if (forward) {
      fishTimelines[fishClass].fromTo(
        `.${fishClass}`,
        { x: -200, y: randomY, scaleX: -1 },
        {
          x: width,
          duration: randomDuration,
          delay: randomDelay,
          ease: "linear",
          onComplete: () => {
            moveFish(fishClass, false);
          },
        },
      );
    } else {
      fishTimelines[fishClass].fromTo(
        `.${fishClass}`,
        { x: width, y: randomY, scaleX: 1 },
        {
          x: -200,
          duration: randomDuration,
          delay: randomDelay,
          ease: "linear",
          onComplete: () => {
            moveFish(fishClass);
          },
        },
      );
    }
  }

  onDestroy(() => {
    // Clean up all timelines
    Object.values(fishTimelines).forEach((timeline) => {
      if (timeline) {
        timeline.kill();
      }
    });
  });

  onMount(() => {
    // Start animation for each fish
    fishTypes.forEach((_, index) => {
      // Randomize direction
      let rand = Math.random();
      if (rand >= 0.5) {
        moveFish(`fish${index + 1}`);
      } else {
        moveFish(`fish${index + 1}`, false);
      }
    });
  });
</script>

<div class={cn("absolute size-full pointer-events-none", containerClass)}></div>
{#each fishTypes as fishType, index}
  <Fish
    {fishType}
    size={fishSize}
    class={cn(`absolute fish${index + 1}`, fishClass)}
    onclick={() => {
      console.log(fishType);
    }}
  />
{/each}
