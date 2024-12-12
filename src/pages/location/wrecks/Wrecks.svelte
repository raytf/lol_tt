<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import { onMount } from "svelte";
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
  } from "$stores/sub";
  import { gridOffset, minOffset, moveSub } from "$stores/exploration";
  import underwater from "$assets/underwater_1by3.jpg";
  import wrecks_1 from "$assets/wrecks/wrecks_1.png";
  import wrecks_2 from "$assets/wrecks/wrecks_2.png";
  import wrecks_3 from "$assets/wrecks/wrecks_3.png";
  import { audioApi, gameApi } from "$apis";
  import { events } from "./events.svelte";
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
    initialPosition = { x: $gameApi.windowWidth / 2, y: -222 };
    initialTarget = {
      x: $gameApi.windowWidth / 2,
      y: $gameApi.windowHeight / 2,
    };
    gridOffset.set({ x: 0, y: 0 }, { hard: true });
  }
  if (searchParams.has("from", "forest")) {
    initialPosition = { x: grid.width + 111, y: 111 };
    initialTarget = { x: grid.width - 222, y: 111 };
    gridOffset.set({ x: $minOffset.x, y: 0 }, { hard: true });
  }

  setSubPosition(initialPosition);
  onMount(() => {
    setTimeout(() => {
      setSubTarget(initialTarget);
    }, 555);

    $events.onStart();
  });
</script>

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
    onclick={() => $events.onClickConch()}
    faceRevealed={$events.showConchFace}
    class="absolute w-[55px] h-[55px] top-[92%] left-[37%] z-[9] {!$events.revealConch &&
      'brightness-50 pointer-events-none'}"
    style="transform: translateX({$gridOffset.x / 10}px)"
  />
  <!-- <InfoMarker
    onclick={onclickConch}
    class="absolute w-[55px] h-[55px] top-[92%] left-[37%] z-[14]"
    style="transform: translateX({$gridOffset.x / 10}px)"
  /> -->
  <Submarine class="z-10" />
  <BgImg
    src={wrecks_1}
    style="transform: translateX({$gridOffset.x / 5}px)"
    class="w-[111%] bottom-0 z-[13] opacity-100"
  />
  <Darkness
    level={$gridOffset.y / $minOffset.y - 0.4}
    lights={[
      { x: $subCoords.x, y: $subCoords.y, unit: "px", radius: 4 },
      { x: 37, y: 92, unit: "%", radius: $events.conchLightRadius },
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
          $gameApi.fadeScene("/surface");
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
      {#if $events.startObservationTask && $events.numObserved === 0}
        <InfoMarker
          onclick={() => {
            $events.makeObservation(1);
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
      {#if $events.startObservationTask && $events.numObserved === 1}
        <InfoMarker
          onclick={() => {
            $events.makeObservation(2);
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
      {#if $events.startObservationTask && $events.numObserved === 2}
        <InfoMarker
          onclick={() => {
            $events.makeObservation(3);
          }}
          class="absolute w-[55px] h-[55px] bottom-[33%] left-[44%] z-20"
        />
      {/if}
    </Area>
  {/snippet}
</Grid>
