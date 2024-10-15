<script lang="ts">
  import { onMount } from "svelte";
  import { fade, blur } from "svelte/transition";
  import { gsap } from "gsap";
  import { Blackdrop } from "$components/ui";
  import { TurbulentImg } from "$components/ui/img";
  import { TextOverlay } from "$components/text";
  import ocean from "$assets/prologue/tritons-triangle.jpg";
  import { getGameApi, getLolApi, getAudioApi } from "$apis";
  const gameApi = getGameApi();
  const lolApi = getLolApi();
  const audioApi = getAudioApi();

  function zoomIn(vars?: gsap.TimelineVars) {
    const zoomTl = gsap.timeline(vars);
    zoomTl.to(".pg-title_bg", { scale: 1.2, duration: 8 });
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
  let startTitle = $state(false);
  let blackdropOpacity = $state(100);
  onMount(() => {
    gsap.set(
      ["#pg-title_header", "#pg-title_subheader", "#pg-title_button-start"],
      {
        opacity: 0,
      },
    );

    audioApi.loadTrack({
      src: "music/theme_song.mp3",
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
          "intro_1-1",
          "intro_1-2",
          "intro_1-3",
          "intro_1-4",
          "intro_1-5",
          "intro_1-6",
        ]}
        onFinished={() => {
          startIntro = false;
          startTitle = true;

          blackdropOpacity = 0;
          zoomIn();
          revealText({ delay: 2 });
          audioApi.playTrack({
            src: "music/theme_song.mp3",
            volume: 0.66,
            loop: true,
          });
        }}
      />
    </div>
  {/if}
  <div class="relative size-full flex flex-col items-center">
    <h1 id="pg-title_header" class="text-title text-8xl font-bold mt-24">
      {lolApi.getText("title")}
    </h1>
    <p id="pg-title_subheader" class="text-title text-4xl font-bold p-4">
      {lolApi.getText("subtitle")}
    </p>
    <div class="grow w-full flex flex-col justify-end items-center">
      <button
        id="pg-title_button-start"
        onclick={() => {
          console.log("start");
        }}
        class="text-title p-12"
      >
        <p class="text-2xl">{lolApi.getText("start")}</p>
      </button>
    </div>
  </div>
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
