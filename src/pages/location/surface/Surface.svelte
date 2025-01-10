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
  import { Submarine } from "$components/gameObjects";
  import { gridOffset, minOffset } from "$stores/exploration";
  import {
    setPosition as setSubPosition,
    coords as subCoords,
  } from "$stores/sub";
  import { gameApi } from "$apis";
  import surface from "./events.svelte";
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
    setSubPosition(initialSubCoords);
    const searchParams = new URLSearchParams($querystring);
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
    class="bg-red-200 opacity-100"
  >
    <SkyOcean start={true} />
    <Submarine
      size={111}
      offset={{ x: 111 / 2, y: 111 }}
      class="overflow-hidden z-[11]"
      imgClass="bottom-[-44%]"
      bob={true}
      reveal={$surface.surfaceSub}
    />
    <BgImg
      src={island_1}
      class="absolute bottom-0 -right-[22%] w-1/2 h-full z-[15]"
    />
    {#snippet areas()}
      <div class="absolute w-full h-1/2 bottom-0 z-10">
        <Area
          size={[$gameApi.windowWidth * 1.5, grid.height]}
          onmousedown={(e) => $surface.onClickArea(e)}
        ></Area>
      </div>
    {/snippet}
  </Grid>
</Location>
