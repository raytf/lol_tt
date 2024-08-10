<script>
  import { gsap } from "gsap";
  import { createTextTracker } from "$lib/helpers/text.svelte";
  import { getLolApi } from "$apis/lol.svelte";
  import { getGameApi } from "$apis/game.svelte";
  import { Next } from "$components/svg/icons";

  const lolApi = getLolApi();
  const gameApi = getGameApi();

  const textKeys = [
    "prologue_1",
    "prologue_2",
    "prologue_3",
    "prologue_4",
    "prologue_5",
  ];
  const textTracker = createTextTracker(textKeys);

  // Scene setup
  $effect(() => {
    gsap.set(".text-prologue", { opacity: 0 });

    if (gameApi.sceneReady) {
      textTracker.ready = true;
    }
  });
  // Change: textTracker.index
  $effect(() => {
    if (!gameApi.sceneReady) return;
    if (textTracker.finished) {
      gameApi.fadeScene("/title");
      return;
    }

    gsap.to(`.text-prologue_${textTracker.index}`, {
      opacity: 1,
      duration: 1,
      onComplete: () => {
        textTracker.ready = true;
      },
    });
  });

  function nextText() {
    if (!textTracker.ready) return;

    textTracker.ready = false;
    gsap.to(`.text-prologue_${textTracker.index}`, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        textTracker.increment();
      },
    });
  }
</script>

<div class="size-full bg-blue-200">
  <button
    onclick={nextText}
    class="absolute size-full flex flex-col justify-center items-center bg-black {textTracker.ready
      ? 'cursor-pointer'
      : 'cursor-default'}"
  >
    {#each textKeys as key, i}
      <p class="text-prologue text-prologue_{i}">
        {lolApi.getText(key)}
      </p>
    {/each}
  </button>
  <Next
    class="absolute bottom-1/2 translate-y-1/2 right-[4%] pointer-events-none text-4xl {textTracker.ready
      ? 'opacity-100'
      : 'opacity-0'}"
  />
</div>

<style>
  .text-prologue {
    position: absolute;
  }
</style>
