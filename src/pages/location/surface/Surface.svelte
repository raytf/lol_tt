<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { Location } from "$components/location";
  import { Grid, Area } from "$components/exploration";
  import { Lol } from "$components/text";
  import { Dive } from "$components/svg/icons";
  import { Button } from "$components/ui/button";
  import { SkyOcean } from "$components/visual/scenery";
  import { Submarine, Ship, FloatingKelp } from "$components/gameObjects";
  import { gridOffset, minOffset, moveSub } from "$stores/exploration";
  import {
    setPosition as setSubPosition,
    coords as subCoords,
  } from "$stores/sub";
  import {
    gameApi,
    audioApi,
    objectivesApi,
    radioApi,
    hudApi,
    notepadApi,
    lolApi,
  } from "$apis";
  import { status, missionBrief } from "$dialog/tutorial";

  //#region setup
  const grid = {
    width: $gameApi.windowWidth,
    height: $gameApi.windowHeight,
  };

  let initialSubCoords = {
    x: $gameApi.windowWidth / 2,
    y: $gameApi.windowHeight / 2 + 111,
  };
  const searchParams = new URLSearchParams($querystring);
  const isTitleScreen = searchParams.has("title");
  if (searchParams.has("from", "wrecks")) {
    initialSubCoords = {
      x: subCoords.current.x,
      y: initialSubCoords.y,
    };
    gridOffset.set({ x: gridOffset.current.x, y: 0 }, { instant: true });
  }
  let surfaceSub = $state(false);
  let readyToDive = $state(false);
  //#endregion

  //#region events
  function startTitleSequence() {
    showTitleSequence = true;
    $audioApi.playTrack({
      src: "music/into-the-blue.mp3",
      volume: 0.55,
      loop: true,
    });
  }

  function onPlay() {
    $audioApi.stopTrack({
      src: "music/into-the-blue.mp3",
      fade: true,
      fadeTime: 5555,
    });

    surfaceSub = true;
    showTitleSequence = false;
    showLocationTitle = true;

    // $gameApi.fadeScene("/surface?start", 2, 2);
  }
  function onClickArea(e: MouseEvent) {
    if ($objectivesApi.currentObjectiveIs("obj_explore")) {
      $objectivesApi.completeTask("task_move-sub");
    }

    moveSub(e);
  }
  //#endregion

  setSubPosition(initialSubCoords);
  onMount(() => {
    $audioApi.playTrack({
      src: "sound/ocean-loop.mp3",
      volume: 0.05,
      loop: true,
    });

    if (isTitleScreen) {
      startTitleSequence();
      return;
    }

    onPlay();
  });

  let showTitleSequence = $state(false);
  let showLocationTitle = $state(false);
</script>

<Location
  showTitle={showLocationTitle}
  titleKey="location-surface"
  uiClass="z-[21]"
>
  {#snippet ui()}
    {#if showTitleSequence}
      <div
        out:fade={{ duration: 2000 }}
        class="absolute top-0 size-full flex flex-col items-center"
      >
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
          <button onclick={onPlay} class="text-title p-12 pointer-events-auto">
            <p class="text-2xl hover:text-yellow-200">
              {$lolApi.getText("play")}
            </p>
          </button>
        </div>
      </div>
    {/if}
  {/snippet}

  <Grid
    size={[grid.width, grid.height]}
    xOffset={gridOffset.current.x}
    yOffset={gridOffset.current.y}
    class=""
  >
    <SkyOcean start={true} />
    <Submarine
      size={111}
      offset={{ x: 111 / 2, y: 111 }}
      class="overflow-hidden z-[12]"
      imgClass="bottom-[-44%]"
      bob={true}
      reveal={surfaceSub}
    />
    {#snippet areas()}
      <div class="absolute flex w-full h-1/2 bottom-0 z-10">
        <Area
          size={[grid.width, grid.height / 2]}
          onmousedown={onClickArea}
          class=""
        ></Area>
      </div>
    {/snippet}
  </Grid>
</Location>

<style>
  .text-title {
    text-shadow: black 1px 2px 5px;
  }
</style>
