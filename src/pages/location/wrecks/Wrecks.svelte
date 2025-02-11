<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { Location } from "$components/location";
  import { TurbulentImg, BgImg } from "$components/ui/img";
  import { Darkness, UnderwaterGradient } from "$components/visual";
  import { Grid, Area } from "$components/exploration";
  import { InfoMarker } from "$components/ui/button";
  import { Lol } from "$components/text";
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
    initialPosition = { x: grid.width + 111, y: $gameApi.windowHeight * 2.5 };
    initialTarget = { x: grid.width - 222, y: initialPosition.y };
    gridOffset.set(
      { x: $minOffset.x, y: -$gameApi.windowHeight * 2 },
      { hard: true },
    );
  }

  setSubPosition(initialPosition);
  onMount(() => {
    setTimeout(() => {
      setSubTarget(initialTarget);
    }, 555);

    $wrecks.onEnter();
  });
</script>

<Location title="wrecks" uiClass="z-[11]">
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
    <!-- <InfoMarker
    onclick={onclickConch}
    class="absolute w-[55px] h-[55px] top-[92%] left-[37%] z-[14]"
    style="transform: translateX({$gridOffset.x / 10}px)"
  /> -->
    <Submarine class="z-10" />
    <!-- <UnderwaterRock
      class="absolute h-[1444px] -top-[7%] -right-[37%] z-[12] pointer-events-none"
    /> -->
    <BgImg
      src={wrecks_kelp}
      style="filter: brightness({1 -
        $depthRatio * 0.5}); transform: translateX({$gridOffset.x / 5}px)"
      class="w-[111%] bottom-0 z-[12] opacity-100"
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
        onmousedown={moveSub}
        class="flex flex-row"
      >
        <UnderwaterGradient
          class="absolute w-full h-[101%]"
          --color-top="#03E5B7"
          --color-bottom="#00C1EF"
        />
        <!-- {#if $subNearSurface}
      {/if} -->
        <button
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
        </button>

        <!-- <button
        onclick={() => {
          setSubTarget({ x: grid.width + 111, y: 111 });
          $gameApi.fadeScene("/forest", 0.44);
        }}
        class="absolute right-[4%] top-[22%] text-2xl flex items-center z-[25]"
      >
        <Lol key="forest" class="mr-1" />
        <ArrowRight class="w-[33px] h-[33px]" />
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
      <Area size={[grid.width, $gameApi.windowHeight]} onmousedown={moveSub}>
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
      <Area size={[grid.width, $gameApi.windowHeight]} onmousedown={moveSub}>
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
        <button
          onclick={() => {
            $audioApi.stopTrack({
              src: "music/deep-echoes.mp3",
            });
            $gameApi.fadeScene("/forest?from=wrecks");
          }}
          class="absolute right-[2%] bottom-[44%] text-2xl flex items-center z-[20]"
        >
          <Lol key="forest" class="mr-1" />
          <ArrowRight class="w-[33px] h-[33px]" />
        </button>
      </Area>
    {/snippet}
  </Grid>
</Location>
