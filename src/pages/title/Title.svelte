<script lang="ts">
  import { onMount } from "svelte";
  import { querystring } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import { Dialog } from "$components/hud/dialog";
  import { TurbulentImg } from "$components/ui/img";
  import ocean from "$assets/title/tritons-triangle.jpg";
  import { gameApi, lolApi, audioApi, hudApi } from "$apis";
  import { tlSlowRevealBackground } from "./animations";
  import { intro } from "./dialog";

  let revealTitleSequence = $state(false);
  const searchParams = new URLSearchParams($querystring);
  onMount(() => {
    if (searchParams.has("intro")) {
      tlSlowRevealBackground(44);
      $hudApi.startDialog({
        keys: intro,
        onFinished: () => {
          startTitleSequence();
        },
      });
    } else {
      tlSlowRevealBackground();
      startTitleSequence();
    }

    $audioApi.loadTrack({
      src: "music/into-the-blue.mp3",
    });
  });

  function startTitleSequence() {
    revealTitleSequence = true;
    $audioApi.playTrack({
      src: "music/into-the-blue.mp3",
      volume: 0.55,
      loop: true,
    });
  }

  function onPlay() {
    revealTitleSequence = false;

    $gameApi.fadeScene("/newspaper", 2.4, 2);
    $audioApi.stopTrack({
      src: "music/into-the-blue.mp3",
      fade: true,
      fadeTime: 5555,
    });
  }
</script>

<div id="pg-title" class="size-full">
  <TurbulentImg
    src={ocean}
    duration={44}
    minFrequency={[0.01, 0.01]}
    maxFrequency={[0.012, 0.012]}
    yoyo={true}
    class="title_bg w-full h-full object-cover"
  />
  <div id="title_blackdrop"></div>
  {#if revealTitleSequence}
    <div out:fade class="relative size-full flex flex-col items-center">
      <h1
        in:fade={{ delay: 1000, duration: 3000 }}
        class="text-title text-8xl font-bold mt-24"
      >
        {$lolApi.getText("title")}
      </h1>
      <p
        in:fade={{ delay: 3000, duration: 2000 }}
        class="text-title text-4xl font-bold p-4"
      >
        {$lolApi.getText("subtitle")}
      </p>
      <div
        in:fade={{ delay: 4000, duration: 2000 }}
        class="grow w-full flex flex-col justify-end items-center"
      >
        <button onclick={onPlay} class="text-title p-12">
          <p class="text-2xl">{$lolApi.getText("play")}</p>
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  #title_blackdrop {
    position: absolute;
    height: 100%;
    width: 100%;

    background: black;
    opacity: 1;
  }
  .text-title {
    text-shadow: 1px 1px 2px black;
  }
</style>
