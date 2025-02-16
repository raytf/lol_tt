<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { Location } from "$components/location";
  import { TurbulentImg, BgImg } from "$components/ui/img";
  import { Darkness, UnderwaterGradient } from "$components/visual";
  import { Grid, Area } from "$components/exploration";
  import { InfoMarker } from "$components/ui/button";
  import { Lol } from "$components/text";
  import { Button } from "$components/ui/button";
  import Conch from "$components/gameObjects/Conch.svelte";
  import { Submarine } from "$components/gameObjects";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
    coords as subCoords,
    direction as subDirection,
  } from "$stores/sub";
  import {
    gridOffset,
    minOffset,
    depthRatio,
    moveSub,
  } from "$stores/exploration";
  import underwater from "$assets/underwater_1by3.jpg";
  import wrecks_kelp from "$assets/wrecks/wrecks_kelp.png";
  import wrecks_1 from "$assets/wrecks/wrecks_1.png";
  import wrecks_2 from "$assets/wrecks/wrecks_2.png";
  import wrecks_3 from "$assets/wrecks/wrecks_3.png";
  import { WrecksPath, UnderwaterRock } from "$components/svg/environment";
  import { audioApi, gameApi } from "$apis";
  import wrecks from "./events.svelte";
  import { ArrowUp, ArrowRight } from "$components/svg/icons/animated";

  //#region state
  const grid = {
    width: $gameApi.windowWidth * 2,
    height: $gameApi.windowHeight * 3,
  };
  minOffset.set({
    x: -grid.width + $gameApi.windowWidth,
    y: -grid.height + $gameApi.windowHeight,
  });

  let initialPosition = { x: $gameApi.windowWidth / 2, y: -222 };
  let initialTarget = {
    x: $gameApi.windowWidth / 2,
    y: $gameApi.windowHeight / 2,
  };
  const searchParams = new URLSearchParams($querystring);
  if (searchParams.has("from", "surface")) {
    initialPosition = { x: $subCoords.x, y: -222 };
    initialTarget = {
      x: initialPosition.x,
      y: $gameApi.windowHeight / 2,
    };
    gridOffset.set({ x: $gridOffset.x, y: 0 }, { hard: true });
  }
  if (searchParams.has("from", "forest")) {
    initialPosition = { x: grid.width + 111, y: $subCoords.y };
    initialTarget = { x: grid.width - 222, y: initialPosition.y };
    gridOffset.update(
      ({ x, y }) => {
        return {
          x: -grid.width + $gameApi.windowWidth,
          y: y,
        };
      },
      { hard: true },
    );
  }
  let subNearSurface = $state(false);
  let subNearForest = $state(false);
  //#endregion

  //#region events
  function onEnter() {
    $audioApi.playTrack({
      src: "music/deep-echoes.mp3",
      volume: 0.44,
      loop: true,
    });
  }
  function onClickTopArea(e: MouseEvent) {
    const x = e.clientX - $gridOffset.x;
    const y = e.clientY - $gridOffset.y;
    if (y < 222 && x < 1555) {
      subNearSurface = true;
    } else {
      subNearSurface = false;
    }
    onClickArea(e);
  }
  function onClickArea(e: MouseEvent) {
    const x = e.clientX - $gridOffset.x;
    const y = e.clientY - $gridOffset.y;

    if (x > 1500 && y < 1400) {
      subNearForest = true;
    } else {
      subNearForest = false;
    }
    moveSub(e);
  }
  //#endregion

  setSubPosition(initialPosition);
  onMount(() => {
    setTimeout(() => {
      setSubTarget(initialTarget);
    }, 555);

    onEnter();
  });
</script>

<Location title="wrecks" uiClass="z-[11]">
  {#snippet ui()}
    {#if subNearSurface}
      <div
        transition:fade
        class="absolute z-[11] top-0 w-full h-[222px] flex justify-center items-start pt-4"
      >
        <Button
          onclick={() => {
            setSubTarget({ x: $subCoords.x, y: 0 });
            $audioApi.stopTrack({
              src: "music/deep-echoes.mp3",
            });
            $gameApi.fadeScene("/surface?from=wrecks", 1, 1);
          }}
          class="w-[99px] h-[88px] flex-col items-center"
        >
          <ArrowUp class="w-[44px] h-[44px]" />
          <Lol key="surface" />
        </Button>
      </div>
    {/if}
    {#if subNearForest}
      <div
        transition:fade
        class="absolute z-[11] top-0 right-0 w-[222px] h-full flex flex-col justify-center items-end pr-4"
      >
        <Button
          onclick={() => {
            setSubTarget({ x: grid.width, y: $subCoords.y });
            $audioApi.stopTrack({
              src: "music/deep-echoes.mp3",
            });
            $gameApi.fadeScene("/forest?from=wrecks");
          }}
          class="w-[99px] h-[88px] flex-col items-center"
        >
          <Lol key="forest" class="mr-1" />
          <ArrowRight class="w-[33px] h-[33px]" />
        </Button>
      </div>
    {/if}
  {/snippet}

  <Grid
    size={[grid.width, grid.height]}
    xOffset={$gridOffset.x}
    yOffset={$gridOffset.y}
  >
    <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
    <BgImg src={wrecks_3} class="w-[133%] left-[-22%] bottom-0 z-[7]" />
    <BgImg
      src={wrecks_2}
      style="transform: translateX({$gridOffset.x / 10}px)"
      class="w-[122%] left-[-11%] bottom-0 z-[9]"
    />
    <Conch
      onclick={() => $wrecks.onClickConch()}
      faceRevealed={$wrecks.showConchFace}
      class="absolute w-[55px] h-[55px] top-[92%] left-[37%] z-[9] {!$wrecks.revealConch &&
        'brightness-50 pointer-events-none'}"
      style="transform: translateX({$gridOffset.x / 10}px)"
    />
    <Submarine class="z-10" />
    <BgImg
      src={wrecks_kelp}
      style="filter: brightness({1 -
        $depthRatio * 0.5}); transform: translateX({$gridOffset.x / 5}px)"
      class="w-[111%] bottom-0 z-[14] opacity-100"
    />
    <WrecksPath
      style="transform: translateX({$gridOffset.x / 5}px)"
      class="absolute w-[111%] bottom-0 z-[13] pointer-events-none opacity-0"
    />
    <BgImg
      src={wrecks_1}
      style="transform: translateX({$gridOffset.x / 5}px)"
      class="w-[111%] bottom-0 z-[13] opacity-100"
    />
    <Darkness
      level={$gridOffset.y / $minOffset.y - 0.4}
      lights={[
        {
          x: $subCoords.x + $subDirection.x * 50,
          y: $subCoords.y,
          unit: "px",
          radius: 4,
          strength: 0.5,
        },
        { x: 37, y: 92, unit: "%", radius: $wrecks.conchLightRadius },
      ]}
      class="z-50"
    />
    {#snippet areas()}
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={onClickTopArea}
        class="flex flex-row"
      >
        <UnderwaterGradient
          class="absolute w-full h-[101%]"
          --color-top="#03E5B7"
          --color-bottom="#00C1EF"
        />
        <!-- <button
          onclick={() => {
            $audioApi.stopTrack({
              src: "music/deep-echoes.mp3",
            });
            $gameApi.fadeScene("/surface?from=wrecks");
          }}
          class="absolute right-[44%] top-[4%] text-2xl flex flex-col items-center select-none z-[20]"
        >
          <ArrowUp class="w-[44px] h-[44px]" />
          <Lol key="surface" />
        </button> -->

        {#if $wrecks.startObservationTask && $wrecks.numObserved === 0}
          <InfoMarker
            type="sm-o"
            onclick={() => {
              $wrecks.makeObservation(1);
            }}
            class="absolute w-[55px] h-[55px] bottom-[55%] left-[44%] z-20"
          />
        {/if}
      </Area>
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={onClickArea}
      >
        <UnderwaterGradient
          class="absolute w-full h-[101%]"
          --color-top="#00C1EF"
          --color-bottom="#037ADE"
        />
        {#if $wrecks.startObservationTask && $wrecks.numObserved === 1}
          <InfoMarker
            onclick={() => {
              $wrecks.makeObservation(2);
            }}
            class="absolute w-[55px] h-[55px] bottom-[55%] left-[44%] z-20"
          />
        {/if}
      </Area>
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={onClickArea}
      >
        <UnderwaterGradient
          class="absolute size-full"
          --color-top="#037ADE"
          --color-bottom="#182B3A"
        />
        {#if $wrecks.startObservationTask && $wrecks.numObserved === 2}
          <InfoMarker
            onclick={() => {
              $wrecks.makeObservation(3);
            }}
            class="absolute w-[55px] h-[55px] bottom-[33%] left-[44%] z-20"
          />
        {/if}
      </Area>
    {/snippet}
  </Grid>
</Location>
