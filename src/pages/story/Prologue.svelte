<script>
  import { gsap } from "gsap";
  import { createTextTracker } from "$components/text.svelte.ts";
  import { getLolApi } from "$lib/apis/lol.svelte";

  const lolApi = getLolApi();
  const textKeys = ["prologue_1", "prologue_2", "prologue_3"];
  const textTracker = createTextTracker(textKeys);

  // OnMount
  $effect(() => {
    gsap.set(".text-prologue", { opacity: 0 });
    textTracker.ready = true;
  });
  // Change: textTracker.index
  $effect(() => {
    if (!textTracker.finished) {
      gsap.to(`.text-prologue_${textTracker.index}`, {
        duration: 1,
        opacity: 1,
        onComplete: () => {
          textTracker.ready = true;
        },
      });
    } else {
      console.log("done!");
    }
  });

  function nextText() {
    if (!textTracker.ready) return;

    textTracker.ready = false;
    gsap.to(`.text-prologue_${textTracker.index}`, {
      duration: 1,
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
    class="absolute size-full flex flex-col justify-center items-center bg-black"
  >
    {#each textKeys as key, i}
      <p class="text-prologue text-prologue_{i}">
        {lolApi.getText(key)}
      </p>
    {/each}
  </button>
</div>

<style>
  .text-prologue {
    position: absolute;
  }
</style>
