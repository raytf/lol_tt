<script lang="ts">
  import { onMount } from "svelte";
  import { fade, blur } from "svelte/transition";
  import { gsap } from "gsap";
  import { TurbulentImg } from "$components/ui/img";
  import { TextOverlay } from "$components/text";
  import ocean from "$assets/title/tritons-triangle.jpg";
  import { gameApi, lolApi, audioApi } from "$apis";

  function zoomIn(vars?: gsap.TimelineVars) {
    const zoomTl = gsap.timeline(vars);
    zoomTl.to(".pg-title_bg", { scale: 1.22, duration: 6 });
    return zoomTl;
  }

  function zoomInMore(vars?: gsap.TimelineVars) {
    const zoomTl = gsap.timeline(vars);
    zoomTl.to(".pg-title_bg", { scale: 1.44, duration: 2 });
    return zoomTl;
  }

  function revealText(vars?: gsap.TimelineVars) {
    const textTl = gsap.timeline(vars);
    textTl.to("#pg-title_header", {
      opacity: 1,
      duration: 2,
    });
    textTl.to("#pg-title_subheader", { opacity: 1, duration: 1 });

    textTl.to("#pg-title_button-start", { opacity: 1, duration: 1 });
    return textTl;
  }

  let startIntro = $state(true);
  let startTitle = $state(true);
  let blackdropOpacity = $state(100);
  onMount(() => {
    gsap.set(
      ["#pg-title_header", "#pg-title_subheader", "#pg-title_button-start"],
      {
        opacity: 0,
      },
    );

    $audioApi.loadTrack({
      src: "music/into-the-blue.mp3",
    });
    blackdropOpacity = 55;
  });
</script>

<div id="pg-title" class="size-full">
  <TurbulentImg
    src={ocean}
    duration={44}
    minFrequency={[0.01, 0.01]}
    maxFrequency={[0.012, 0.012]}
    yoyo={true}
    class="pg-title_bg w-full h-full object-cover"
  />
  <div id="pg-title_blackdrop" style="opacity: {blackdropOpacity}%"></div>
  {#if startIntro}
    <div transition:fade class="absolute size-full z-10">
      <TextOverlay
        keys={[
          "intro_1",
          "intro_2",
          "intro_3",
          "intro_4",
          "intro_5",
          "intro_6",
        ]}
        onFinished={() => {
          startIntro = false;
          blackdropOpacity = 0;
          zoomIn();
          revealText({ delay: 4 });
          $audioApi.playTrack({
            src: "music/into-the-blue.mp3",
            volume: 0.66,
            loop: true,
            fadeTime: 2222,
          });
        }}
      />
    </div>
  {/if}
  {#if startTitle}
    <div out:blur class="relative size-full flex flex-col items-center">
      <h1 id="pg-title_header" class="text-title text-8xl font-bold mt-24">
        {$lolApi.getText("title")}
      </h1>
      <p id="pg-title_subheader" class="text-title text-4xl font-bold p-4">
        {$lolApi.getText("subtitle")}
      </p>
      <div class="grow w-full flex flex-col justify-end items-center">
        <button
          id="pg-title_button-start"
          onclick={() => {
            startTitle = false;

            // Preload
            $audioApi.loadTrack({
              src: "music/tritons-triangle.mp3",
            });
            $gameApi.fadeScene("/prologue-intro", 2.4);
            zoomInMore({
              onComplete: () => {
                $audioApi.stopTrack({ src: "music/into-the-blue.mp3" });
              },
            });
          }}
          class="text-title p-12"
        >
          <p class="text-2xl">{$lolApi.getText("start")}</p>
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  #pg-title_blackdrop {
    position: absolute;
    height: 100%;
    width: 100%;

    background: black;
    transition: opacity 11s;
  }
  .text-title {
    text-shadow: 1px 1px 2px black;
  }
</style>
