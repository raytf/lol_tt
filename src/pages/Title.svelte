<script>
  import { gsap } from "gsap";
  import BackupInit from "$lib/components/BackupInit.svelte";
  import { getLolApi, LolApi } from "$apis/lol.svelte";
  import { getGameApi } from "$apis/game.svelte";
  import { getAudioApi } from "$apis/audio.svelte";
  // Assets
  import titleScreen from "$assets/title_screen.jpg";
  const lolApi = getLolApi();
  const gameApi = getGameApi();
  const audioApi = getAudioApi();

  $effect(() => {
    gsap.set(["#title_header", "#title_subheader", "#title_start-button"], {
      opacity: 0,
    });
  });

  $effect(() => {
    audioApi.playTrack({
      src: "music/theme_main.mp3",
      volume: 0.22,
      loop: true,
    });
    const entryTl = gsap.timeline();
    entryTl
      .to(
        "#title_bg-image",
        {
          scale: 1.5,
          duration: 8,
        },
        0,
      )
      .to("#title_bg-image", {
        scale: 1.55,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    entryTl.to(
      "#title_header",
      {
        opacity: 1,
        duration: 1,
      },
      2.5,
    );
    entryTl.to(
      "#title_subheader",
      {
        opacity: 1,
        duration: 1,
      },
      3.5,
    );
    entryTl.to(
      "#title_start-button",
      {
        opacity: 1,
        duration: 1,
      },
      4.5,
    );
  });
</script>

<BackupInit />
<div class="size-full">
  <img id="title_bg-image" src={titleScreen} alt="bg" />

  <div class="relative size-full flex flex-col items-center">
    <h1 id="title_header" class="text-6xl mt-24 p-4">
      {lolApi.getText("title")}
    </h1>
    <h2 id="title_subheader" class="text-3xl p-2">
      {lolApi.getText("subtitle")}
    </h2>
    <div class="grow w-full flex flex-col justify-end items-center">
      <button
        id="title_start-button"
        onclick={() => gameApi.fadeScene("/ch1")}
        class="p-12"
      >
        <p class="text-2xl">{lolApi.getText("start")}</p>
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
    animation: underwater 8s infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
  }

  @keyframes underwater {
    0% {
      transform: skew(8deg);
    }
    100% {
      transform: skew(-8deg);
    }
  }
</style>
