<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { SkyOcean } from "$components/visual/scenery";
  import { GameIntro } from "$components/text";
  import sub from "$assets/sprites/sub.png";
  import { getGameApi } from "$apis/game.svelte";
  import { getLolApi } from "$apis/lol.svelte";
  const gameApi = getGameApi();
  const lolApi = getLolApi();

  function revealText(vars?: gsap.TimelineVars) {
    const textTl = gsap.timeline(vars);
    textTl.to("#title-screen_header", { opacity: 1, duration: 1 }, 1);
    textTl.to("#title-screen_subheader", { opacity: 1, duration: 1 });
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

    revealText();
    surfaceSub({ delay: 3 });
  });

  let startIntro = $state(false);
  let introIndex = $state(-1);
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
              startIntro = true;
              introIndex = 0;
            },
          });
        }}
        class="text-title p-12"
      >
        <p class="text-2xl">{lolApi.getText("start")}</p>
      </button>
    </div>
    <button
      id="title-screen_game-intro"
      onclick={() => {
        introIndex++;
      }}
      class="absolute size-full {startIntro
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none'}"
    >
      <GameIntro
        class="absolute top-0 p-12"
        textIndex={introIndex}
        onFinished={() => {
          startIntro = false;
          submergeSub({
            delay: 1,
            onComplete: () => gameApi.fadeScene("/ch1"),
          });
        }}
      />
    </button>
  </div>
  <SkyOcean />
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
  #title-screen_game-intro {
    background-color: rgba(0, 0, 0, 0.22);
    transition: opacity 1s;
  }
  .text-title {
    text-shadow: 1px 1px 2px black;
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
