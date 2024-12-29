<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { Location } from "$components/location";
  import { Grid, Area } from "$components/exploration";
  import { Submarine, KelpMonster } from "$components/gameObjects";
  import { TurbulentImg, BgImg } from "$components/ui/img";
  import { Lol } from "$components/text";
  import { Darkness, UnderwaterGradient } from "$components/visual";
  import { gridOffset, minOffset, moveSub } from "$stores/exploration";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
    coords as subCoords,
  } from "$stores/sub";
  import { gameApi, audioApi } from "$apis";
  import forest from "./events.svelte";

  import { ForestPath, UnderwaterRock } from "$components/svg/environment";
  import underwater from "$assets/underwater_wide.jpg";
  import forest_1 from "$assets/forest/forest_1.png";
  import forest_2 from "$assets/forest/forest_2.png";
  import forest_3 from "$assets/forest/forest_3.png";
  import kelp_1 from "$assets/forest/kelp_1.png";
  import kelp_2 from "$assets/forest/kelp_2.png";
  import kelp_3 from "$assets/forest/kelp_3.png";
  import kelp_4 from "$assets/forest/kelp_4.png";
  import { ArrowLeft } from "$components/svg/icons/animated";

  const grid = {
    width: $gameApi.windowWidth * 3,
    height: $gameApi.windowHeight * 4,
  };
  minOffset.set({
    x: -grid.width + $gameApi.windowWidth,
    y: -grid.height + $gameApi.windowHeight,
  });
  console.log("grid size", grid);
  console.log("minOffset", $minOffset);

  const depthRatio = $derived.by(() => {
    return $gridOffset.y / $minOffset.y;
  });

  let initialPosition = { x: -222, y: 222 };
  let initialTarget = {
    x: 222,
    y: 222,
  };
  const searchParams = new URLSearchParams($querystring);
  if (searchParams.has("from", "wrecks")) {
    initialPosition = { x: -222, y: $gameApi.windowHeight * 2.5 };
    initialTarget = { x: 222, y: initialPosition.y };
    gridOffset.set({ x: 0, y: -$gameApi.windowHeight * 2 }, { hard: true });
  }

  setSubPosition(initialPosition);
  onMount(() => {
    setTimeout(() => {
      setSubTarget(initialTarget);
    }, 555);

    $forest.onEnter();
  });
</script>

<Location title="forest" uiClass="z-[11]">
  <Grid
    size={[grid.width, grid.height]}
    xOffset={$gridOffset.x}
    yOffset={$gridOffset.y}
    class="grid-rows-4"
  >
    <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
    <BgImg
      src={kelp_4}
      class="left-[11%] z-[3]"
      style="filter: brightness({1 -
        depthRatio -
        0.2}); transform: translateX({$gridOffset.x / 10}px);"
    />
    <BgImg
      src={forest_3}
      class="left-[11%] z-[4]"
      style="filter: brightness(0.5); transform: translateX({$gridOffset.x /
        10}px);"
    />
    <BgImg
      src={kelp_3}
      class="left-[11%] z-[5]"
      style="filter: brightness({1 -
        depthRatio}); transform: translateX({$gridOffset.x / 8}px);"
    />
    <BgImg
      src={forest_2}
      class="z-[6]"
      style="filter: brightness(0.5); transform: translateX({$gridOffset.x /
        8}px);"
    />
    <BgImg
      src={kelp_2}
      class="left-[11%] z-[7]"
      style="filter: brightness({1 -
        depthRatio +
        0.2}); transform: translateX({$gridOffset.x / 6}px);"
    />
    <ForestPath
      class="absolute size-full z-[8] opacity-0 pointer-events-none"
      style="transform: translateX({$gridOffset.x / 6}px);"
    />
    <BgImg
      src={forest_1}
      class="z-[8]"
      style="filter: brightness(0.5); transform: translateX({$gridOffset.x /
        6}px);"
    />
    <KelpMonster class="w-[555px] h-[666px] z-[9]" />
    <Submarine class="z-10" />
    <BgImg
      src={kelp_1}
      class="left-[11%] size-full z-[11]"
      style="filter: brightness({1 -
        depthRatio +
        0.4}); transform: translateX({$gridOffset.x / 4}px);"
    />
    <UnderwaterRock
      class="absolute h-[1444px] -top-[7%] -left-[23%] z-[12] pointer-events-none"
      style="transform: translateX({$gridOffset.x / 5}px);"
    />
    <Darkness
      level={depthRatio * 0.5 + 0.5}
      lights={[{ x: $subCoords.x, y: $subCoords.y, unit: "px", radius: 4 }]}
      class="z-50"
    />

    {#snippet areas()}
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={(e) => $forest.onClickArea(e)}
      >
        <UnderwaterGradient
          class="absolute w-full h-[101%]"
          --color-top="#03E5B7"
          --color-bottom="#00C1EF"
        />
      </Area>
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={(e) => $forest.onClickArea(e)}
      >
        <UnderwaterGradient
          class="absolute w-full h-[101%]"
          --color-top="#00C1EF"
          --color-bottom="#037ADE"
        />
      </Area>
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={(e) => $forest.onClickArea(e)}
      >
        <UnderwaterGradient
          class="absolute size-full"
          --color-top="#037ADE"
          --color-bottom="#182B3A"
        />
        <button
          onclick={() => {
            $audioApi.stopTrack({ src: "music/tangled-depths.mp3" });
            $gameApi.fadeScene("/wrecks?from=forest");
          }}
          class="absolute left-[1%] top-[44%] text-2xl flex items-center z-[20]"
        >
          <ArrowLeft class="w-[33px] h-[33px]" />
          <Lol key="wrecks" class="mr-1" />
        </button>
      </Area>
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={(e) => $forest.onClickArea(e)}
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
