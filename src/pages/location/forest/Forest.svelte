<script lang="ts">
  import { fade } from "svelte/transition";
  import { querystring } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { Location } from "$components/location";
  import { Grid, Area } from "$components/exploration";
  import { Submarine, KelpMonster } from "$components/gameObjects";
  import { TurbulentImg, BgImg } from "$components/ui/img";
  import { Lol } from "$components/text";
  import { Darkness, UnderwaterGradient } from "$components/visual";
  import {
    gridOffset,
    minOffset,
    depthRatio,
    moveSub,
  } from "$stores/exploration";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
    coords as subCoords,
    direction as subDirection,
  } from "$stores/sub";
  import { gameApi, audioApi } from "$apis";
  import { Button } from "$components/ui/button";
  import { ForestPath, UnderwaterRock } from "$components/svg/environment";
  import underwater from "$assets/underwater_wide.jpg";
  import forest_1 from "$assets/forest/forest_1.png";
  import forest_2 from "$assets/forest/forest_2.png";
  import forest_3 from "$assets/forest/forest_3.png";
  import forest_right from "$assets/forest/forest_right.png";
  import kelp_1 from "$assets/forest/kelp_1.png";
  import kelp_2 from "$assets/forest/kelp_2.png";
  import kelp_3 from "$assets/forest/kelp_3.png";
  import kelp_4 from "$assets/forest/kelp_4.png";
  import { ArrowLeft } from "$components/svg/icons/animated";

  //#region state
  const grid = {
    width: $gameApi.windowWidth * 2,
    height: $gameApi.windowHeight * 3,
  };
  minOffset.set({
    x: -grid.width + $gameApi.windowWidth,
    y: -grid.height + $gameApi.windowHeight,
  });

  let initialPosition = { x: -111, y: $subCoords.y };
  let initialTarget = {
    x: 444,
    y: $subCoords.y,
  };
  let initialMonsterPosition = {
    x: $gameApi.windowWidth * 2,
    y: $gameApi.windowHeight,
  };
  const searchParams = new URLSearchParams($querystring);
  if (searchParams.has("from", "wrecks")) {
    initialPosition = { x: -111, y: $subCoords.y };
    initialTarget = {
      x: 444,
      y: $subCoords.y,
    };
    gridOffset.update(
      ({ x, y }) => {
        return { x: 0, y: y };
      },
      { hard: true },
    );
  }
  let subNearWrecks = $state(false);
  //#endregion
  //#region events
  function onEnter() {
    $audioApi.playTrack({
      src: "music/tangled-depths.mp3",
      volume: 0.55,
      loop: true,
    });
  }
  function onClickArea(e: MouseEvent) {
    const x = e.clientX - $gridOffset.x;
    const y = e.clientY - $gridOffset.y;

    if (x < 1000 && y < 1400) {
      subNearWrecks = true;
    } else {
      subNearWrecks = false;
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

<Location title="forest" uiClass="z-[11]">
  {#snippet ui()}
    {#if subNearWrecks}
      <div
        transition:fade
        class="absolute z-[11] top-0 left-0 w-[222px] h-full flex flex-col justify-center items-start pl-4"
      >
        <Button
          onclick={() => {
            setSubTarget({ x: -111, y: $subCoords.y });
            $audioApi.stopTrack({ src: "music/tangled-depths.mp3" });
            $gameApi.fadeScene("/wrecks?from=forest");
          }}
          class="w-[99px] h-[88px] flex-col items-center"
        >
          <Lol key="wrecks" class="mr-1" />
          <ArrowLeft class="w-[33px] h-[33px]" />
        </Button>
      </div>
    {/if}
  {/snippet}
  <Grid
    size={[grid.width, grid.height]}
    xOffset={$gridOffset.x}
    yOffset={$gridOffset.y}
    class=""
  >
    <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
    <BgImg
      src={forest_3}
      class="w-[111%] z-[7]"
      style="filter: brightness({1 -
        $depthRatio +
        0.2}); transform: translateX({$gridOffset.x / 8}px);"
    />
    <BgImg
      src={forest_2}
      class="z-[7]"
      style="filter: brightness({1 -
        $depthRatio +
        0.3}); transform: translateX({$gridOffset.x / 7}px);"
    />
    <KelpMonster
      startCoords={initialMonsterPosition}
      class="w-[555px] h-[666px] z-[9]"
    />
    <Submarine class="z-10" />

    <BgImg
      src={forest_right}
      class="-right-[9%] z-[11]"
      style="filter: brightness({1 -
        $depthRatio +
        0.4}); transform: translateX({$gridOffset.x / 6}px);"
    />
    <ForestPath
      class="z-[11] opacity-0 pointer-events-none"
      style="transform: translateX({$gridOffset.x / 6}px);"
    />
    <BgImg
      src={forest_1}
      class="z-[11]"
      style="filter: brightness({1 -
        $depthRatio +
        0.4}); transform: translateX({$gridOffset.x / 6}px);"
    />

    <BgImg
      src={kelp_1}
      class="left-0 size-full z-[12]"
      style="filter: brightness({1 -
        $depthRatio +
        0.4}); transform: translateX({$gridOffset.x / 4}px);"
    />
    <Darkness
      level={$depthRatio * 0.5 + 0.2}
      lights={[
        {
          x: $subCoords.x + $subDirection.x * 50,
          y: $subCoords.y,
          unit: "px",
          radius: 4,
          strength: 0.5,
        },
        // {
        //   x: $subCoords.x,
        //   y: $subCoords.y,
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
          class="absolute w-full h-[101%]"
          --color-top="#03E5B7"
          --color-bottom="#00C1EF"
        />
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
    {/snippet}
  </Grid>
</Location>
