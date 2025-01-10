<script lang="ts">
  import { onMount } from "svelte";
  import { TurbulentImg } from "$components/ui/img";
  import { TextOverlay } from "$components/text";
  import ocean from "$assets/title/tritons-triangle.jpg";
  import { gameApi, lolApi, audioApi, hudApi } from "$apis";
  import {
    tlZoomIn,
    tlZoomInMore,
    tlRevealText,
    hideHeadings,
    tlHideText,
  } from "./animations";

  const textSequence = [
    ["intro-1", "intro-2", "intro-3"],
    ["intro-4", "intro-5"],
  ];
  let currentSequence = $state(0);
  let startIntro = $state(true);
  let blackdropOpacity = $state(100);
  onMount(() => {
    $hudApi.enabled = false;
    hideHeadings();

    $audioApi.loadTrack({
      src: "music/into-the-blue.mp3",
    });
    blackdropOpacity = 66;
  });

  function nextSequence() {
    currentSequence += 1;
    if (currentSequence == 1) {
      tlZoomIn();
    }
    if (currentSequence >= textSequence.length) {
      startIntro = false;
      blackdropOpacity = 0;
      tlZoomInMore();
      tlRevealText({ delay: 4 });
      $audioApi.playTrack({
        src: "music/into-the-blue.mp3",
        volume: 0.66,
        loop: true,
        fadeTime: 2222,
      });
    }
  }
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
  {#each textSequence as sequence, i}
    <TextOverlay
      active={i === currentSequence}
      keys={sequence}
      onFinished={nextSequence}
      class="z-10"
    />
  {/each}
  <div class="relative size-full flex flex-col items-center">
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
          tlHideText();

          $gameApi.fadeScene("/surface?start", 2.4);
          $audioApi.stopTrack({
            src: "music/into-the-blue.mp3",
            fade: true,
            fadeTime: 5555,
          });
          $hudApi.enabled = true;
        }}
        class="text-title p-12"
      >
        <p class="text-2xl">{$lolApi.getText("start")}</p>
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
