<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { TextOverlay } from "$components/text";
  import { Blackdrop } from "$components/ui";
  import { TurbulentImg } from "$components/ui/img";
  import expedition_full from "$assets/prologue/expedition_full.jpg";
  import ship from "$assets/prologue/expedition_ship.png";
  import shadow from "$assets/prologue/expedition_shadow.png";
  import { getGameApi } from "$apis";
  const gameApi = getGameApi();

  const textSequence = [
    ["pl_1", "pl_2", "pl_3"],
    ["pl_4", "pl_5"],
  ];
  let currentSequence = $state(0);
  let blackdropOpacity = $state(100);
  let shadowOpacity = $state(0);

  function nextSequence() {
    currentSequence += 1;
    if (currentSequence == 1) {
      shadowOpacity = 88;
    }
    if (currentSequence >= textSequence.length) {
      console.log("Prologue finished");
    }
  }

  onMount(() => {
    blackdropOpacity = 22;
    gsap.to("#pg-prologue_bg", { scale: 1.2, duration: 8 });
  });
</script>

<div id="pg-prologue" class="relative size-full">
  <div id="pg-prologue_bg" class="absolute size-full">
    <TurbulentImg
      src={expedition_full}
      duration={44}
      minFrequency={[0.01, 0.01]}
      maxFrequency={[0.015, 0.02]}
      class="w-full h-full object-cover"
    />
    <img
      src={shadow}
      alt="shadow"
      class="shadow absolute size-full blur-[8px] z-[1]"
      style="opacity: {shadowOpacity}%"
    />
    <img src={ship} alt="ship" class="absolute size-full z-[2]" />
  </div>

  <Blackdrop opacity={blackdropOpacity} transitionDuration={8} class="z-[5]" />
  {#each textSequence as sequence, i}
    {#if i === currentSequence}
      <TextOverlay keys={sequence} onFinished={nextSequence} class="z-10" />
    {/if}
  {/each}
</div>

<style>
  .shadow {
    transition: opacity 8s;
  }
</style>
