<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { Location } from "$components/location";
  import { Grid, Area } from "$components/exploration";
  import { Submarine } from "$components/gameObjects";
  import {
    Darkness,
    UnderwaterGradient,
    MeasuringLine,
  } from "$components/visual";
  import { Lol } from "$components/text";
  import { ArrowUp } from "$components/svg/icons/animated";
  import { Button, InfoMarker } from "$components/ui/button";
  import { TurbulentImg, BgImg } from "$components/ui/img";
  import { gridOffset, minOffset, moveSub } from "$stores/exploration";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
    coords as subCoords,
    direction as subDirection,
    nearVent,
  } from "$stores/sub";
  import { gameApi, audioApi, hudApi, objectivesApi, notepadApi } from "$apis";
  import { cn } from "$lib/utils";
  import { trial1, anomaly, hiddenEntrance } from "$dialog/chapter3";
  import underwater from "$assets/underwater_swirls.jpg";
  import abyss_1 from "$assets/abyss/abyss_1.png";
  import abyss_2 from "$assets/abyss/abyss_2.png";
  import abyss_3 from "$assets/abyss/abyss_3.png";
  import jellyfish from "$assets/characters/jellyfish/jellyfish.png";
  import abyss from "$stores/abyss.svelte";

  //#region state
  const grid = {
    width: $gameApi.windowWidth * 2,
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

    if (!$objectivesApi.chapterStarted) {
      if (!$objectivesApi.completedChapters.includes("chapter3")) {
        $objectivesApi.startChapter("chapter3", () => {});
      }
    }
    $objectivesApi.completeTask("task_enter-abyss");
  }
  function onClickArea(e: MouseEvent) {
    moveSub(e, ({ x1, y1 }) => {
      if (x1 > 1800 && y1 > 1000) {
        nearVent.set(true);
      } else {
        nearVent.set(false);
      }
      //console.log(x1, y1);
    });
  }
  function makeMeasurement(...cols: string[]) {
    $notepadApi.openPage("temperature-experiment");
    if (!$objectivesApi.currentObjectiveIs("obj_temp-experiment-3")) {
      $hudApi.showNotepad = true;
    }
    $notepadApi.updateTableRow($abyss.numMeasured, ...cols);

    $abyss.numMeasured++;
    if ($abyss.numMeasured >= 5) {
      $abyss.numMeasured = 0;
      if ($objectivesApi.currentObjectiveIs("obj_temp-experiment")) {
        $hudApi.startDialog({
          keys: trial1,
        });
      }
      if ($objectivesApi.currentObjectiveIs("obj_temp-experiment-3")) {
        $hudApi.showNotepad = true;
        $notepadApi.seethrough = false;
        $hudApi.startDialog({
          keys: anomaly,
          blockInput: true,
          onFinished: () => {
            $notepadApi.seethrough = true;
            $gameApi.fadeScene("/vent");
          },
        });
      }
    }
    $objectivesApi.incrementTask("task_record-temp");
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

<Location titleKey="location-abyss" uiClass="z-[11]">
  {#snippet ui()}
    <!-- <button
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
    </button> -->
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
    <Submarine size={55} class="z-10" />

    <Darkness
      level={depthRatio * 0.4 + 0.5}
      lights={[
        {
          x: subCoords.current.x + $subDirection.x * 25,
          y: subCoords.current.y,
          unit: "px",
          radius: 2,
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
        {#if $objectivesApi.currentObjectiveIs("obj_temp-experiment") || $objectivesApi.currentObjectiveIs("obj_temp-experiment-2") || $objectivesApi.currentObjectiveIs("obj_temp-experiment-3")}
          {#if $abyss.numMeasured === 0}
            <InfoMarker
              type="sm-e"
              onclick={() => {
                let t1 = "6.59",
                  t2 = "",
                  t3 = "";
                if ($objectivesApi.hasCompleted("obj_temp-experiment")) {
                  t2 = "6.64";
                }
                if ($objectivesApi.hasCompleted("obj_temp-experiment-2")) {
                  t3 = "6.70";
                }
                makeMeasurement("300", t1, t2, t3);
              }}
              class={cn(
                "absolute w-[55px] h-[55px] top-[3%] z-[15]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment") &&
                  "left-[22%]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment-2") &&
                  "left-[55%]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment-3") &&
                  "left-[88%]",
              )}
            />
          {/if}
          {#if $abyss.numMeasured === 1}
            <InfoMarker
              type="sm-e"
              onclick={() => {
                let t1 = "4.63",
                  t2 = "",
                  t3 = "";
                if ($objectivesApi.hasCompleted("obj_temp-experiment")) {
                  t2 = "4.59";
                }
                if ($objectivesApi.hasCompleted("obj_temp-experiment-2")) {
                  t3 = "4.69";
                }
                makeMeasurement("800", t1, t2, t3);
              }}
              class={cn(
                "absolute w-[55px] h-[55px] top-[83%] z-[15]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment") &&
                  "left-[22%]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment-2") &&
                  "left-[55%]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment-3") &&
                  "left-[88%]",
              )}
            />
          {/if}
        {/if}
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
            <Lol key="location-forest" />
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
        {#if $objectivesApi.currentObjectiveIs("obj_temp-experiment") || $objectivesApi.currentObjectiveIs("obj_temp-experiment-2") || $objectivesApi.currentObjectiveIs("obj_temp-experiment-3")}
          {#if $abyss.numMeasured === 2}
            <InfoMarker
              type="sm-e"
              onclick={() => {
                let t1 = "3.66",
                  t2 = "",
                  t3 = "";
                if ($objectivesApi.hasCompleted("obj_temp-experiment")) {
                  t2 = "3.73";
                }
                if ($objectivesApi.hasCompleted("obj_temp-experiment-2")) {
                  t3 = "3.77";
                }
                makeMeasurement("1300", t1, t2, t3);
              }}
              class={cn(
                "absolute w-[55px] h-[55px] top-[62%] z-[15]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment") &&
                  "left-[22%]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment-2") &&
                  "left-[55%]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment-3") &&
                  "left-[88%]",
              )}
            />
          {/if}
        {/if}
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
        {#if $objectivesApi.currentObjectiveIs("obj_temp-experiment") || $objectivesApi.currentObjectiveIs("obj_temp-experiment-2") || $objectivesApi.currentObjectiveIs("obj_temp-experiment-3")}
          {#if $abyss.numMeasured === 3}
            <InfoMarker
              type="sm-e"
              onclick={() => {
                let t1 = "3.01",
                  t2 = "",
                  t3 = "";
                if ($objectivesApi.hasCompleted("obj_temp-experiment")) {
                  t2 = "2.95";
                }
                if ($objectivesApi.hasCompleted("obj_temp-experiment-2")) {
                  t3 = "9.09";
                }
                makeMeasurement("1800", t1, t2, t3);
              }}
              class={cn(
                "absolute w-[55px] h-[55px] top-[43%] z-[15]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment") &&
                  "left-[22%]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment-2") &&
                  "left-[55%]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment-3") &&
                  "left-[88%]",
              )}
            />
          {/if}
        {/if}
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
        {#if $objectivesApi.currentObjectiveIs("obj_temp-experiment") || $objectivesApi.currentObjectiveIs("obj_temp-experiment-2") || $objectivesApi.currentObjectiveIs("obj_temp-experiment-3")}
          {#if $abyss.numMeasured === 4}
            <InfoMarker
              type="sm-e"
              onclick={() => {
                let t1 = "2.52",
                  t2 = "",
                  t3 = "";
                if ($objectivesApi.hasCompleted("obj_temp-experiment")) {
                  t2 = "2.69";
                }
                if ($objectivesApi.hasCompleted("obj_temp-experiment-2")) {
                  t3 = "12.55";
                }
                makeMeasurement("2300", t1, t2, t3);
              }}
              class={cn(
                "absolute w-[55px] h-[55px] top-[23%] z-[15]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment") &&
                  "left-[22%]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment-2") &&
                  "left-[55%]",
                $objectivesApi.currentObjectiveIs("obj_temp-experiment-3") &&
                  "left-[88%]",
              )}
            />
          {/if}
        {/if}
      </Area>
    {/snippet}
  </Grid>
</Location>
