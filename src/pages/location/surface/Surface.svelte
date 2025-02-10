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
  import { Submarine, Ship } from "$components/gameObjects";
  import { gridOffset, minOffset } from "$stores/exploration";
  import {
    setPosition as setSubPosition,
    coords as subCoords,
  } from "$stores/sub";
  import { gameApi } from "$apis";
  import surface from "./events.svelte";
  import island_1 from "$assets/islands/island_1.png";
  import { BgImg, TurbulentImg } from "$components/ui/img";
  import kelp_floating from "$assets/surface/kelp_floating.png";
  import ship from "$assets/sprites/ship.png";

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
    y: $gameApi.windowHeight / 2 + 55,
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
    setSubPosition(initialSubCoords);
    $surface.onEnter(searchParams);
  });
</script>

<Location title="surface" uiClass="z-[11]">
  {#snippet ui()}
    <div
      class="absolute z-[11] bottom-0 w-full h-[222px] flex justify-center items-end pb-11"
    >
      {#if $surface.readyToDive}
        <div transition:fade>
          <Button
            onclick={() => $surface.onClickDive()}
            class="w-[99px] h-[88px] flex-col items-center pointer-events-auto"
          >
            <Lol key="dive" class="text-2xl" />
            <Dive class="w-[33px] h-[33px]" />
          </Button>
        </div>
      {/if}
    </div>
  {/snippet}

  <Grid
    size={[grid.width, grid.height]}
    xOffset={$gridOffset.x}
    yOffset={$gridOffset.y}
    class=""
  >
    <SkyOcean start={true} />
    <Submarine
      size={111}
      offset={{ x: 111 / 2, y: 111 }}
      class="overflow-hidden z-[12]"
      imgClass="bottom-[-44%]"
      bob={true}
      reveal={$surface.surfaceSub}
    />
    <Ship class="left-[500px] bottom-[270px] z-[11]" />
    <!-- <BgImg
      src={island_1}
      class="absolute bottom-0 -right-[22%] w-1/2 h-full z-[15]"
    /> -->
    {#snippet areas()}
      <div class="absolute flex w-full h-1/2 bottom-0 z-10">
        <Area
          size={[$gameApi.windowWidth * 1.5, grid.height / 2]}
          onmousedown={(e) => $surface.onClickArea(e)}
          class=""
        ></Area>
        <Area
          size={[$gameApi.windowWidth * 0.5, grid.height / 2]}
          class="opacity-30 pointer-events-none"
        >
          <TurbulentImg
            src={kelp_floating}
            yoyo={true}
            class="absolute top-0 size-full"
          />
        </Area>
      </div>
    {/snippet}
  </Grid>
</Location>
