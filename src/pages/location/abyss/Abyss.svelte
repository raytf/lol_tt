<script lang="ts">
  import { onMount, onDestroy } from "svelte";
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
  import { gameApi, audioApi, hudApi } from "$apis";
  import { cn } from "$lib/utils";
  import { hiddenEntrance } from "$dialog/chapter3";
  import underwater from "$assets/underwater_swirls.jpg";
  import abyss_1 from "$assets/abyss/abyss_1.png";
  import abyss_2 from "$assets/abyss/abyss_2.png";
  import abyss_3 from "$assets/abyss/abyss_3.png";
  import jellyfish from "$assets/characters/jellyfish/jellyfish.png";

  //#region state
  const grid = {
    width: $gameApi.windowWidth * 3,
    height: $gameApi.windowHeight * 4,
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
  let showEntranceOptions = $state(false);
  //#endregion
  //#region events
  function onEnter() {
    $audioApi.playTrack({
      src: "music/in-the-abyss.mp3",
      volume: 0.5,
      loop: true,
    });
  }
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

  onDestroy(() => {
    $audioApi.stopTrack({ src: "music/in-the-abyss.mp3" });
  });
</script>

<Location title="abyss">
  {#snippet ui()}
    <button
      onclick={() => {
        $hudApi.startDialog({
          keys: hiddenEntrance,
          onFinished: () => {
            showEntranceOptions = true;
          },
        });
      }}
      class="absolute top-1/2 left-1/2 z-[12] pointer-events-auto"
      >Vent
    </button>
    {#if showEntranceOptions}
      <div
        transition:fade
        class={cn(
          "absolute size-full z-[12]",
          "flex flex-col justify-center items-center",
        )}
      >
        <Button
          onclick={() => {
            $audioApi.loadTrack({
              src: "music/theme.mp3",
            });
            $gameApi.fadeScene("/vent", 1, 1);
          }}
        >
          Yes
        </Button>
        <Button
          onclick={() => {
            showEntranceOptions = false;
          }}>No</Button
        >
      </div>
    {/if}
  {/snippet}
  <Grid
    size={[grid.width, grid.height]}
    xOffset={gridOffset.current.x}
    yOffset={gridOffset.current.y}
  >
    <TurbulentImg
      src={jellyfish}
      maxFrequency={[0.02, 0.07]}
      yoyo={true}
      class="!w-[222px] !h-[222px] blur opacity-50 z-10"
    />
    <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
    <BgImg src={abyss_3} class="w-full -bottom-[100px] blur z-[7]" />
    <BgImg src={abyss_2} class="w-full -bottom-[100px] blur z-[8]" />
    <BgImg src={abyss_1} class="w-full -bottom-[100px] blur z-[9]" />
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
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={onClickArea}
      >
        <UnderwaterGradient
          class="absolute size-full"
          --color-top="#00172a"
          --color-bottom="#00060a"
        />
      </Area>
    {/snippet}
  </Grid>
</Location>
