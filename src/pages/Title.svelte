<script>
  import { gsap } from "gsap";
  import { getGameApi } from "$apis/game.svelte";
  import { getAudioApi } from "$apis/audio.svelte";
  // Assets
  import titleScreen from "$assets/title_screen.jpg";
  const gameApi = getGameApi();
  const audioApi = getAudioApi();

  $effect(() => {
    gsap.set(["#title_header", "#title_subheader", "#title_start-button"], {
      opacity: 0,
    });
  });

  $effect(() => {
    audioApi.playTrack({ src: "music/theme_main.mp3", volume: 0.5 });
    const entryTl = gsap.timeline();
    entryTl.to(
      "#title_bg-image",
      {
        scale: 1.5,
        duration: 8,
      },
      0,
    );
    entryTl.to(
      "#title_header",
      {
        opacity: 1,
        duration: 1,
      },
      3,
    );
    entryTl.to(
      "#title_subheader",
      {
        opacity: 1,
        duration: 1,
      },
      4,
    );
    entryTl.to(
      "#title_start-button",
      {
        opacity: 1,
        duration: 1,
      },
      5,
    );
  });
</script>

<div class="size-full">
  <img id="title_bg-image" src={titleScreen} alt="bg" />

  <div class="relative size-full flex flex-col items-center">
    <h1 id="title_header" class="text-6xl mt-24 p-4">Triton's Treasure</h1>
    <h2 id="title_subheader" class="text-3xl p-2">
      A Scientific Method Adventure
    </h2>
    <div class="grow w-full flex flex-col justify-end items-center">
      <button
        id="title_start-button"
        onclick={() => gameApi.fadeScene("/story/prologue")}
        class="p-12"
      >
        <p class="text-2xl">Start</p>
      </button>
    </div>
  </div>
</div>

<style>
  #title_bg-image {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  #title_header,
  #title_subheader {
    animation: underwater 5s infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
  }

  @keyframes underwater {
    0% {
      transform: skew(5deg);
    }
    100% {
      transform: skew(-5deg);
    }
  }
</style>
