<script lang="ts">
  import { writable } from "svelte/store";
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
  import { MeasuringLine } from "$components/visual";
  import { Submarine } from "$components/gameObjects";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
    coords as subCoords,
    direction as subDirection,
  } from "$stores/sub";
  import { gridOffset, minOffset, moveSub } from "$stores/exploration";
  import underwater from "$assets/underwater_1by3.jpg";
  import wrecks1 from "$assets/wrecks/wrecks1.png";
  import wrecks2 from "$assets/wrecks/wrecks2.png";
  import wrecks3 from "$assets/wrecks/wrecks3.png";
  import { WrecksPath } from "$components/svg/environment";
  import {
    hudApi,
    audioApi,
    gameApi,
    objectivesApi,
    infoApi,
    notepadApi,
    lolApi,
  } from "$apis";
  import { pressureCreak } from "$dialog/common";
  import {
    smColor,
    shipWreck,
    conchScare,
    conchEncounter,
  } from "$dialog/chapter1";
  import { showConchFace, conchLightRadius } from "$stores/conch";
  import { ArrowUp, ArrowRight } from "$components/svg/icons/animated";
  import wrecks from "$stores/wrecks.svelte";
  import forest from "$stores/forest.svelte";
  import { cn } from "$lib/utils";

  //#region grid
  const grid = {
    width: $gameApi.windowWidth * 4,
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
  let depthRatio = $derived.by(() => {
    const ratio = gridOffset.current.y / $minOffset.y;
    return ratio;
  });
  let xRatio = $derived.by(() => {
    const ratio = gridOffset.current.x / $minOffset.x;
    return ratio;
  });
  //#endregion

  setSubPosition(initialPosition);
  onMount(() => {
    setTimeout(() => {
      setSubTarget(initialTarget);
    }, 555);
  });
  //#region experiment values
  let measuringLineValues = $state([200, 150, 100, 50, 0]);
  //#region
</script>

<Location titleKey="location-wrecks" uiClass="z-[11]">
  {#snippet ui()}{/snippet}

  <Grid
    size={[grid.width, grid.height]}
    xOffset={gridOffset.current.x}
    yOffset={gridOffset.current.y}
  >
    {#snippet backgrounds()}
      <TurbulentImg src={underwater} class="opacity-50 z-[1]" />

      <div id="layer3">
        <BgImg src={wrecks3} class="w-[100%] bottom-0 z-[7] opacity-100" />
      </div>
      <div id="layer2">
        <BgImg
          src={wrecks2}
          style="transform: translateX({gridOffset.current.x / 10}px)"
          class="w-[110%] left-0 bottom-0 z-[9]"
        />
      </div>

      <Submarine class="z-10" />

      <div id="layer1">
        <BgImg
          src={wrecks1}
          style="transform: translateX({gridOffset.current.x / 5}px)"
          class="w-[120%] left-0 bottom-0 z-[13]"
        />
        <WrecksPath
          style="transform: translateX({gridOffset.current.x / 5}px)"
          class="absolute w-[120%] left-0 bottom-0 z-[13] pointer-events-none opacity-0"
        />
      </div>

      <Darkness
        level={depthRatio - 0.2}
        lights={[
          {
            x: subCoords.current.x + $subDirection.x * 50,
            y: subCoords.current.y,
            unit: "px",
            radius: 4,
            strength: 0.5,
          },
          {
            x: 72 - (xRatio - 0.7) * 8,
            y: 80,
            unit: "%",
            radius: $conchLightRadius,
          },
        ]}
        class="z-50"
      />
      {#if $wrecks.measuringUnlocked && !$objectivesApi.hasCompleted("obj_pressure-review")}
        <MeasuringLine
          height={1400}
          values={measuringLineValues}
          class="z-[9]"
          style="transform: translateX({gridOffset.current.x / 5}px)"
        />
      {/if}
    {/snippet}
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
      </Area>
      <Area size={[grid.width, $gameApi.windowHeight]} onmousedown={moveSub}>
        <UnderwaterGradient
          class="absolute w-full h-[101%]"
          --color-top="#00C1EF"
          --color-bottom="#037ADE"
        />
      </Area>
      <Area size={[grid.width, $gameApi.windowHeight]} onmousedown={moveSub}>
        <UnderwaterGradient
          class="absolute size-full"
          --color-top="#037ADE"
          --color-bottom="#182B3A"
        />
      </Area>
    {/snippet}
  </Grid>
</Location>
