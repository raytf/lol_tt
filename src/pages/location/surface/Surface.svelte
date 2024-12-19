<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { Grid, Area } from "$components/exploration";
  import { Lol } from "$components/text";
  import { Dive } from "$components/svg/icons";
  import { Button } from "$components/ui/button";
  import { SkyOcean } from "$components/visual/scenery";
  import { Submarine } from "$components/gameObjects";
  import { gridOffset, minOffset } from "$stores/exploration";
  import {
    setPosition as setSubPosition,
    coords as subCoords,
  } from "$stores/sub";
  import { gameApi } from "$apis";
  import { events } from "./events.svelte";
  import { hideHeading } from "./animations";
  import island_1 from "$assets/islands/island_1.png";
  import { BgImg, TurbulentImg } from "$components/ui/img";

  const grid = {
    width: $gameApi.windowWidth * 2,
    height: $gameApi.windowHeight,
  };
  minOffset.set({
    x: -grid.width + $gameApi.windowWidth,
    y: -grid.height + $gameApi.windowHeight,
  });

  let initialSubCoords = {
    x: $gameApi.windowWidth / 2,
    y: $gameApi.windowHeight / 2 + 111,
  };
  const searchParams = new URLSearchParams($querystring);
  if (searchParams.has("from", "wrecks")) {
    initialSubCoords = {
      x: $subCoords.x,
      y: initialSubCoords.y,
    };
    gridOffset.set({ x: $gridOffset.x, y: 0 }, { hard: true });
  }
  onMount(() => {
    hideHeading();

    setSubPosition(initialSubCoords);
    const searchParams = new URLSearchParams($querystring);
    $events.onStart(searchParams.has("start"));
  });
</script>

<div class="relative size-full">
  <div class="absolute size-full z-[11] pointer-events-none">
    <div id="surface-heading" class="w-full text-center">
      <Lol key="surface-heading" class="text-3xl font-bold p-4" />
    </div>
    <div
      class="absolute bottom-0 w-full h-[222px] flex justify-center items-end pb-11"
    >
      {#if $events.readyToDive}
        <div transition:fade>
          <Button
            onclick={() => $events.onClickDive()}
            class="w-[99px] h-[88px] flex-col items-center pointer-events-auto"
          >
            <Lol key="dive" class="text-2xl" />
            <Dive class="w-[33px] h-[33px]" />
          </Button>
        </div>
      {/if}
    </div>
  </div>

  <Grid
    size={[grid.width, grid.height]}
    xOffset={$gridOffset.x}
    yOffset={$gridOffset.y}
    class="bg-red-200 opacity-100"
  >
    <SkyOcean start={true} />
    <Submarine
      size={111}
      offset={{ x: 111 / 2, y: 111 }}
      class="overflow-hidden z-[11]"
      imgClass="bottom-[-44%]"
      bob={true}
      reveal={$events.surfaceSub}
    />
    <BgImg
      src={island_1}
      class="absolute -bottom-[18%] -right-[22%] w-1/2 h-full z-[15]"
    />
    {#snippet areas()}
      <div class="absolute w-full h-1/2 bottom-0 z-10">
        <Area
          size={[$gameApi.windowWidth * 1.5, grid.height]}
          onmousedown={(e) => $events.onClickArea(e)}
        ></Area>
      </div>
    {/snippet}
  </Grid>
</div>
