<script>
  import { gsap } from "gsap";
  import { getGameApi } from "$apis/game.svelte";
  // Assets
  import titleScreen from "$assets/title_screen.jpg";
  const gameApi = getGameApi();

  $effect(() => {
    gsap.set(["#title_header", "#title_subheader", "#title_start-button"], {
      opacity: 0,
    });
  });

  $effect(() => {
    const entryTl = gsap.timeline();
    entryTl.to(
      "#title_bg-image",
      {
        scale: 1.5,
        duration: 4,
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
  <img
    id="title_bg-image"
    src={titleScreen}
    alt="bg"
    class="absolute size-full"
  />
  <div class="relative size-full z-[1] flex flex-col items-center">
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
