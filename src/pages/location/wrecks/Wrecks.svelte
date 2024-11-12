<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { linear, expoInOut, quadInOut } from "svelte/easing";
  import { toast } from "@zerodevx/svelte-toast";
  import { TurbulentImg, BgImg } from "$components/ui/img";
  import { Darkness, UnderwaterGradient } from "$components/visual";
  import { Grid, Area } from "$components/exploration";
  import { Button, InfoMarker } from "$components/ui/button";
  import { Lol } from "$components/text";
  import Conch from "$components/gameObjects/Conch.svelte";
  import { Submarine } from "$components/gameObjects";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
    coords as subCoords,
  } from "$stores/sub";
  import { gridOffset, minOffset, moveSub } from "$stores/exploration";
  import { WrecksShape } from "$components/svg/environment";
  import underwater from "$assets/underwater_1by3.jpg";
  import wrecks_1 from "$assets/wrecks/wrecks_1.png";
  import wrecks_2 from "$assets/wrecks/wrecks_2.png";
  import wrecks_3 from "$assets/wrecks/wrecks_3.png";
  import wrecks_secret from "$assets/wrecks/wrecks_secret.png";
  import { gameApi, hudApi } from "$apis";
  import {
    subNearSurface,
    onTopAreaClick,
    revealConchFace,
    onclickConch,
    startedObservationTask,
    finishedObservationTask,
    startChapterOne,
    makeObservation,
  } from "./events";

  let { params }: { params: { from: string } } = $props();

  const grid = {
    width: $gameApi.windowWidth * 1.5,
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
  if (params.from === "surface") {
    initialPosition = { x: $gameApi.windowWidth / 2, y: -222 };
    initialTarget = {
      x: $gameApi.windowWidth / 2,
      y: $gameApi.windowHeight / 2,
    };
    gridOffset.set({ x: 0, y: 0 }, { hard: true });
  }
  if (params.from === "forest") {
    initialPosition = { x: grid.width + 111, y: 111 };
    initialTarget = { x: grid.width - 222, y: 111 };
    gridOffset.set({ x: $minOffset.x, y: 0 }, { hard: true });
  }
  setSubPosition(initialPosition);
  onMount(() => {
    setTimeout(() => {
      setSubTarget(initialTarget);
    }, 555);
    //$hudApi.debugActivate();
    //startChapterOne();
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
    onclick={onclickConch}
    faceRevealed={$revealConchFace}
    class="absolute w-[44px] h-[44px] top-[93%] left-[84%] z-[9]"
    style="transform: translateX({$gridOffset.x / 10}px)"
  />
  <Submarine class="z-10" />
  <WrecksShape
    style="transform: translateX({$gridOffset.x / 5}px)"
    class="absolute w-[111%] left-[-4%] bottom-0 pointer-events-none opacity-0 z-[13]"
  />
  <BgImg
    src={wrecks_secret}
    style="transform: translateX({$gridOffset.x / 5}px)"
    class="w-[111%] left-[-4%] bottom-0 z-[13]"
  />
  <BgImg
    src={wrecks_1}
    style="transform: translateX({$gridOffset.x / 5}px)"
    class="w-[111%] left-[-4%] bottom-0 z-[13] opacity-50"
  />
  <Darkness
    level={$gridOffset.y / $minOffset.y - 0.4}
    lights={[
      { x: $subCoords.x, y: $subCoords.y, unit: "px", radius: 4 },
      { x: 83, y: 94, unit: "%", radius: 8 },
    ]}
    class="z-50"
  />
  {#snippet areas()}
    <Area
      size={[grid.width, $gameApi.windowHeight]}
      onmousedown={onTopAreaClick}
      class="flex flex-row"
    >
      <UnderwaterGradient
        class="absolute w-full h-[101%]"
        --color-top="#03E5B7"
        --color-bottom="#00C1EF"
      />
      {#if $subNearSurface}
        <div transition:fade>
          <Button
            onclick={() => {
              $gameApi.fadeScene("/surface");
            }}
            class="absolute right-[44%] top-[4%] text-2xl z-[20]"
          >
            <Lol key="surface" />
          </Button>
        </div>
      {/if}
      <button
        onclick={() => {
          setSubTarget({ x: grid.width + 111, y: 111 });
          $gameApi.fadeScene("/forest", 0.44);
        }}
        class="absolute right-[4%] top-[22%] text-2xl z-[25]">Forest</button
      >
      {#if $startedObservationTask && !$finishedObservationTask}
        <InfoMarker
          onclick={() => {
            makeObservation(1);
          }}
          class="absolute w-[55px] h-[55px] bottom-[55%] right-[55%] z-20"
        />
      {/if}
    </Area>
    <Area size={[grid.width, $gameApi.windowHeight]} onmousedown={moveSub}>
      <UnderwaterGradient
        class="absolute w-full h-[101%]"
        --color-top="#00C1EF"
        --color-bottom="#037ADE"
      />
      {#if $startedObservationTask && !$finishedObservationTask}
        <InfoMarker
          onclick={() => {
            makeObservation(2);
          }}
          class="absolute w-[55px] h-[55px] bottom-[55%] right-[55%] z-20"
        />
      {/if}
    </Area>
    <Area size={[grid.width, $gameApi.windowHeight]} onmousedown={moveSub}>
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#037ADE"
        --color-bottom="#182B3A"
      />
      {#if $startedObservationTask && !$finishedObservationTask}
        <InfoMarker
          onclick={() => {
            makeObservation(3);
          }}
          class="absolute w-[55px] h-[55px] bottom-[55%] right-[55%] z-20"
        />
      {/if}
    </Area>
  {/snippet}
</Grid>
