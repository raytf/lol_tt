<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { SkyOcean } from "$components/visual/scenery";
  import { GameIntro } from "$components/text";
  import sub from "$assets/sprites/sub.png";
  import { getGameApi } from "$apis/game.svelte";
  import { getLolApi } from "$apis/lol.svelte";
  import { getAudioApi } from "$apis/audio.svelte";
  const gameApi = getGameApi();
  const lolApi = getLolApi();
  const audioApi = getAudioApi();

  function hideIntro(vars?: gsap.TimelineVars) {
    const introTl = gsap.timeline(vars);
    introTl.to("#title-screen_intro-text", { opacity: 0, duration: 1 });
    return introTl;
  }
  function revealText(vars?: gsap.TimelineVars) {
    const textTl = gsap.timeline(vars);
    textTl.to("#title-screen_header", { opacity: 1, duration: 4 });
    textTl.to("#title-screen_subheader", { opacity: 1, duration: 2 }, 2);
    textTl.to("#title-screen_start-button", { opacity: 1, duration: 1 });
    return textTl;
  }
  function hideText(vars?: gsap.TimelineVars) {
    const textTl = gsap.timeline(vars);
    textTl.to(
      [
        "#title-screen_header",
        "#title-screen_subheader",
        "#title-screen_start-button",
      ],
      { opacity: 0, duration: 1 },
    );
    return textTl;
  }
  function surfaceSub(vars?: gsap.TimelineVars) {
    const subTl = gsap.timeline(vars);
    subTl.to("#sub-image", {
      bottom: "-44%",
      duration: 1,
      ease: "back.out",
    });
    return subTl;
  }
  function submergeSub(vars?: gsap.TimelineVars) {
    const subTl = gsap.timeline(vars);
    subTl.to("#sub-image", {
      bottom: "-100%",
      duration: 1,
      ease: "back.in",
    });
    return subTl;
  }

  let startIntro = $state(false);
  let introIndex = $state(-1);
  let backdropOpacity = $state(100);
  let startTitle = $state(false);
  onMount(() => {
    gsap.set(
      [
        "#title-screen_header",
        "#title-screen_subheader",
        "#title-screen_start-button",
      ],
      {
        opacity: 0,
      },
    );

    startIntro = true;
    introIndex = 0;
    backdropOpacity = 44;

    audioApi.loadTrack({
      src: "music/theme_song.mp3",
    });
  });
</script>

<div id="title-screen" class="size-full">
  <div
    id="title-screen_ui"
    class="relative size-full flex flex-col items-center"
  >
    <h1 id="title-screen_header" class="text-title text-6xl font-bold mt-24">
      {lolApi.getText("title")}
    </h1>
    <p id="title-screen_subheader" class="text-title text-4xl font-bold p-4">
      {lolApi.getText("subtitle")}
    </p>
    <div class="grow w-full flex flex-col justify-end items-center">
      <button
        id="title-screen_start-button"
        onclick={() => {
          hideText({
            onComplete: () => {
              audioApi.stopTrack("music/theme_song.mp3", true);

              submergeSub({
                delay: 1,
                onComplete: () => gameApi.fadeScene("/ch1"),
              });
            },
          });
          audioApi.loadTrack({
            src: "music/theme_underwater.mp3",
          });
        }}
        class="text-title p-12"
      >
        <p class="text-2xl">{lolApi.getText("start")}</p>
      </button>
    </div>
    <button
      id="title-screen_intro-text"
      onclick={() => {
        introIndex++;
      }}
      class="absolute size-full {startIntro
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none'}"
    >
      <div class="backdrop" style="opacity: {backdropOpacity}%"></div>
      <GameIntro
        class="absolute size-full top-0 p-12"
        textIndex={introIndex}
        onFinished={() => {
          hideIntro({
            onComplete: () => {
              startIntro = false;

              startTitle = true;
              revealText({ delay: 2 });
              surfaceSub({ delay: 1 });
              audioApi.playTrack({
                src: "music/theme_song.mp3",
                volume: 0.44,
                loop: true,
              });
            },
          });
        }}
      />
    </button>
  </div>
  <SkyOcean start={startTitle} />
  <div
    class="absolute left-1/2 -translate-x-1/2 bottom-[22%] w-[111px] h-[111px] overflow-hidden"
  >
    <img id="sub-image" src={sub} alt="sub" class="absolute" />
  </div>
</div>

<style>
  #title-screen_ui {
    width: 100%;
    height: 100%;

    z-index: 1;
  }
  .text-title {
    text-shadow: 1px 1px 2px black;
  }
  .backdrop {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: black;
    transition: opacity 11s;
  }
  #sub-image {
    bottom: -100%;
    animation: bob 11s linear infinite;
  }
  @keyframes bob {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(-8deg);
    }
    100% {
      transform: rotate(0);
    }
  }
</style>
