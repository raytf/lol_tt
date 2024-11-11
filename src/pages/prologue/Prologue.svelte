<script>
  import { onMount } from "svelte";
  import { fade, blur } from "svelte/transition";
  import { gsap } from "gsap";
  import { TextOverlay } from "$components/text";
  import { Blackdrop } from "$components/ui";
  import { TurbulentImg } from "$components/ui/img";
  import ocean from "$assets/prologue/expedition_ocean.jpg";
  import ship from "$assets/prologue/expedition_ship.png";
  import shadow from "$assets/prologue/expedition_shadow.png";
  import { gameApi, audioApi } from "$apis";

  const textSequence = [
    ["pl_1", "pl_2"],
    ["pl_3", "pl_4"],
    ["pl_5", "pl_6"],
  ];
  let currentSequence = $state(0);
  let blackdropOpacity = $state(100);
  let shadowOpacity = $state(0);

  function nextSequence() {
    currentSequence += 1;
    if (currentSequence == 1) {
      blackdropOpacity = 22;
      shadowOpacity = 77;
    }
    if (currentSequence >= textSequence.length) {
      $audioApi.stopTrack({ src: "music/tritons-triangle.mp3" });
      setTimeout(() => {
        $gameApi.fadeScene("/surface-intro");
      }, 1111);
    }
  }

  onMount(() => {
    blackdropOpacity = 44;
    gsap.to("#pg-prologue_bg", { scale: 1.4, duration: 44, force3D: false });
    $audioApi.playTrack({
      src: "music/tritons-triangle.mp3",
      volume: 0.66,
      loop: true,
    });
  });
</script>

<div id="pg-prologue" class="relative size-full">
  <div id="pg-prologue_bg" class="absolute size-full">
    <TurbulentImg
      src={ocean}
      duration={44}
      minFrequency={[0.01, 0.01]}
      maxFrequency={[0.015, 0.02]}
      yoyo={true}
      class="w-full h-full object-cover"
    />
    <img
      src={shadow}
      alt="shadow"
      class="shadow absolute size-full blur-[14px] z-[1]"
      style="opacity: {shadowOpacity}%"
    />
    <img src={ship} alt="ship" class="anim-bob absolute size-full z-[2]" />
  </div>

  <Blackdrop opacity={blackdropOpacity} transitionDuration={8} class="z-[5]" />
  {#each textSequence as sequence, i}
    <TextOverlay
      active={i === currentSequence}
      keys={sequence}
      onFinished={nextSequence}
      class="z-10"
    />
  {/each}
</div>

<style>
  .anim-bob {
    animation: bob 44s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
  }
  .shadow {
    transition: opacity 11s;
  }
</style>
