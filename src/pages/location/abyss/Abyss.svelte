<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { Location } from "$components/location";
  import { Grid, Area } from "$components/exploration";
  import { Submarine } from "$components/gameObjects";
  import { Darkness, UnderwaterGradient } from "$components/visual";
  import { Lol } from "$components/text";
  import { ArrowUp } from "$components/svg/icons/animated";
  import { Button } from "$components/ui/button";
  import { TurbulentImg, BgImg } from "$components/ui/img";
  import { gridOffset, minOffset, moveSub } from "$stores/exploration";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
    coords as subCoords,
    direction as subDirection,
  } from "$stores/sub";
  import { gameApi, audioApi } from "$apis";
  import { cn } from "$lib/utils";
  import underwater from "$assets/underwater_swirls.jpg";
  import abyss_1 from "$assets/abyss/abyss_1.png";
  import abyss_2 from "$assets/abyss/abyss_2.png";
  import abyss_3 from "$assets/abyss/abyss_3.png";

  //#region state
  const grid = {
    width: $gameApi.windowWidth * 2,
    height: $gameApi.windowHeight * 3,
  };
  minOffset.set({
    x: -grid.width + $gameApi.windowWidth,
    y: -grid.height + $gameApi.windowHeight,
  });
  let depthRatio = $derived.by(() => {
    const ratio = gridOffset.current.y / $minOffset.y;
    return ratio;
  });

  let initialPosition = { x: 111, y: -111 };
  let initialTarget = {
    x: 111,
    y: 111,
  };
  //#endregion
  //#region events
  function onEnter() {}
  function onClickArea(e: MouseEvent) {
    moveSub(e);
  }
  //#endregion

  gridOffset.set({ x: 0, y: 0 }, { instant: true });
  setSubPosition(initialPosition);
  onMount(() => {
    setTimeout(() => {
      setSubTarget(initialTarget);
    }, 555);

    onEnter();
  });
</script>

<Location title="abyss">
  <Grid
    size={[grid.width, grid.height]}
    xOffset={gridOffset.current.x}
    yOffset={gridOffset.current.y}
  >
    <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
    <BgImg src={abyss_3} class="blur-lg z-[7]" />
    <BgImg src={abyss_2} class="blur z-[8]" />
    <BgImg src={abyss_1} class="blur-sm z-[9]" />
    <Submarine size={88} class="z-10" />

    <Darkness
      level={depthRatio * 0.2 + 0.8}
      lights={[
        {
          x: subCoords.current.x + $subDirection.x * 50,
          y: subCoords.current.y,
          unit: "px",
          radius: 4,
          strength: 1,
        },
        // {
        //   x: subCoords.current.x,
        //   y: subCoords.current.y,
        //   unit: "px",
        //   radius: 8,
        // },
      ]}
      class="z-50"
    />
    {#snippet areas()}
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={onClickArea}
      >
        <UnderwaterGradient
          class="absolute size-full"
          --color-top="#037ADE"
          --color-bottom="#182B3A"
        />
        <div
          transition:fade
          class={cn(
            "absolute top-0 left-0 w-[300px] h-[100px]",
            "flex justify-center items-center z-[11]",
          )}
        >
          <Button
            onclick={() => {
              setSubTarget({ x: 111, y: -111 });
              //   $audioApi.stopTrack({
              //     src: "music/deep-echoes.mp3",
              //   });
              $gameApi.fadeScene("/forest?from=abyss");
            }}
            class="w-[99px] h-[88px] flex-col items-center gap-1"
          >
            <Lol key="location-abyss" />
            <ArrowUp class="w-[44px] h-[44px]" />
          </Button>
        </div>
      </Area>
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={onClickArea}
      >
        <UnderwaterGradient
          class="absolute size-full"
          --color-top="#182B3A"
          --color-bottom="#00172a"
        />
      </Area>
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={onClickArea}
      >
        <UnderwaterGradient
          class="absolute size-full"
          --color-top="#00172a"
          --color-bottom="#00172a"
        />
      </Area>
    {/snippet}
  </Grid>
</Location>
