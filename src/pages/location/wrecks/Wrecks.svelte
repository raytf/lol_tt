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
  import Conch from "$components/gameObjects/Conch.svelte";
  import { Submarine } from "$components/gameObjects";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
    coords as subCoords,
    direction as subDirection,
  } from "$stores/sub";
  import { gridOffset, minOffset, moveSub } from "$stores/exploration";
  import underwater from "$assets/underwater_1by3.jpg";
  import wrecks_kelp from "$assets/wrecks/wrecks_kelp.png";
  import wrecks_trash from "$assets/wrecks/wrecks_trash.png";
  import wrecks_1 from "$assets/wrecks/wrecks_1.png";
  import wrecks_2 from "$assets/wrecks/wrecks_2.png";
  import wrecks_3 from "$assets/wrecks/wrecks_3.png";
  import { WrecksPath, UnderwaterRock } from "$components/svg/environment";
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
    width: $gameApi.windowWidth * 2,
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
  const searchParams = new URLSearchParams($querystring);
  if (searchParams.has("from", "surface")) {
    initialPosition = { x: subCoords.current.x, y: -222 };
    initialTarget = {
      x: initialPosition.x,
      y: $gameApi.windowHeight / 2,
    };
    gridOffset.set({ x: gridOffset.current.x, y: 0 }, { instant: true });
  }
  if (searchParams.has("from", "forest")) {
    initialPosition = { x: grid.width + 111, y: subCoords.current.y };
    initialTarget = { x: grid.width - 444, y: initialPosition.y };
    gridOffset.set(
      {
        x: -grid.width + $gameApi.windowWidth,
        y: gridOffset.current.y,
      },
      { instant: true },
    );
  }
  let depthRatio = $derived.by(() => {
    const ratio = gridOffset.current.y / $minOffset.y;
    return ratio;
  });
  let xRatio = $derived.by(() => {
    const ratio = gridOffset.current.x / $minOffset.x;
    return ratio;
  });
  //#endregion
  //#region booleans
  let subNearSurface = $state(false);
  let subNearForest = $state(false);
  //#endregion
  //#region events
  function onEnter() {
    $audioApi.playTrack({
      src: "music/deep-echoes.mp3",
      volume: 0.44,
      loop: true,
    });

    if (!$objectivesApi.chapterStarted) {
      // Chapter not started
      if (!$objectivesApi.completedChapters.includes("chapter1")) {
        $objectivesApi.startChapter("chapter1", () => {});
        return;
      }
      if (!$objectivesApi.completedChapters.includes("chapter2")) {
        $objectivesApi.startChapter("chapter2", () => {});
        return;
      }

      if (searchParams.has("from", "forest") && $forest.encounteredMonster) {
        setTimeout(() => {
          $hudApi.startDialog({
            keys: conchEncounter,
            blockInput: true,
            onFinished: () => {
              $objectivesApi.startChapter("chapter2", () => {});
              $wrecks.conchEncountered = true;
            },
          });
        }, 1000);
      }
    }
  }
  function onClickTopArea(e: MouseEvent) {
    const x = e.clientX - gridOffset.current.x;
    const y = e.clientY - gridOffset.current.y;
    if (y < 222 && x < 1555) {
      subNearSurface = true;
    } else {
      subNearSurface = false;
    }

    onClickArea(e);
  }
  function onClickMiddleArea(e: MouseEvent) {
    if ($objectivesApi.currentObjectiveIs("obj_explore-wrecks")) {
      $objectivesApi.completeTask("task_enter-wrecks");
    }
    onClickArea(e);
  }
  function onClickBottomArea(e: MouseEvent) {
    onClickArea(e);
  }
  function onClickArea(e: MouseEvent) {
    const x = e.clientX - gridOffset.current.x;
    const y = e.clientY - gridOffset.current.y;

    if (x > 1500 && y < 1400) {
      subNearForest = true;
    } else {
      subNearForest = false;
    }
    moveSub(e);
  }
  function makeObservation(observationKey: string, onClose?: () => void) {
    $infoApi.openModal({
      infoType: "sm-o",
      textKeys: [observationKey],
      onClose: onClose,
    });

    if (!$wrecks.observed.includes(observationKey)) {
      $wrecks.observed = [...$wrecks.observed, observationKey];
      $notepadApi.openPage("wrecks-notes");
      $notepadApi.addLine(observationKey);
    }
  }
  function makeTableObservation(
    key: string,
    observationKey: string,
    onClose?: () => void,
  ) {
    $infoApi.openModal({
      infoType: "sm-o",
      textKeys: [observationKey],
      onClose: onClose,
    });

    if (!$wrecks.observed.includes(observationKey)) {
      $wrecks.observed = [...$wrecks.observed, observationKey];
      $notepadApi.openPage("wrecks-experiment");
      $notepadApi.addTableRow(
        $lolApi.getText(key),
        $lolApi.getText(observationKey),
      );

      if ($wrecks.observed.length === 3) {
        $objectivesApi.completeTask("task_wrecks-record-data");
        $notepadApi.openPage("wrecks-experiment");
        $hudApi.showNotepad = true;
      }
    }
  }
  function makeMeasurement(depth: string, pressure: string) {
    $notepadApi.openPage("pressure-experiment");
    $hudApi.showNotepad = true;
    $notepadApi.addTableRow(depth, pressure);
    $wrecks.numMeasured++;
    $objectivesApi.incrementTask("task_record-pressure");
  }
  //#endregion

  setSubPosition(initialPosition);
  onMount(() => {
    //#endregion
    setTimeout(() => {
      setSubTarget(initialTarget);
    }, 555);

    onEnter();
  });
  //#region experiment values
  let measuringLineValues = $state([200, 150, 100, 50, 0]);
  //#region
</script>

<Location titleKey="location-wrecks" uiClass="z-[11]">
  {#snippet ui()}
    {#if subNearSurface}
      <div
        transition:fade
        class="absolute z-[11] top-0 w-full h-[222px] flex justify-center items-start pt-4"
      >
        <Button
          onclick={() => {
            setSubTarget({ x: subCoords.current.x, y: 0 });
            $audioApi.stopTrack({
              src: "music/deep-echoes.mp3",
            });
            $gameApi.fadeScene("/surface?from=wrecks", 1, 1);
          }}
          class="w-[99px] h-[88px] flex-col items-center"
        >
          <ArrowUp class="w-[44px] h-[44px]" />
          <Lol key="surface" />
        </Button>
      </div>
    {/if}
    {#if $wrecks.forestUnlocked && subNearForest}
      <div
        transition:fade
        class="absolute z-[11] top-0 right-0 w-[222px] h-full flex flex-col justify-center items-end pr-4"
      >
        <Button
          onclick={() => {
            setSubTarget({ x: grid.width, y: subCoords.current.y });
            $audioApi.stopTrack({
              src: "music/deep-echoes.mp3",
            });
            $gameApi.fadeScene("/forest?from=wrecks");
            if ($objectivesApi.currentObjectiveIs("obj_explore-forest")) {
              $objectivesApi.completeTask("task_enter-forest");
            }
          }}
          class="w-[99px] h-[88px] flex-col items-center"
        >
          <Lol key="location-forest" class="mr-1" />
          <ArrowRight class="w-[33px] h-[33px]" />
        </Button>
      </div>
    {/if}
  {/snippet}

  <Grid
    size={[grid.width, grid.height]}
    xOffset={gridOffset.current.x}
    yOffset={gridOffset.current.y}
  >
    {#snippet backgrounds()}
      <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
      <BgImg
        src={wrecks_3}
        class="w-[133%] left-[-22%] bottom-0 z-[7] opacity-75"
      />
      <BgImg
        src={wrecks_2}
        style="transform: translateX({gridOffset.current.x / 10}px)"
        class="w-[122%] left-[-11%] bottom-0 z-[9]"
      />
      <Submarine class="z-10" />
      <BgImg
        src={wrecks_kelp}
        style="filter: brightness({1 -
          depthRatio * 0.5}); transform: translateX({gridOffset.current.x /
          5}px)"
        class="w-[111%] opacity-[90%] bottom-0 z-[12]"
      />
      <WrecksPath
        style="transform: translateX({gridOffset.current.x / 5}px)"
        class="absolute w-[111%] bottom-0 z-[13] pointer-events-none opacity-0"
      />
      <BgImg
        src={wrecks_1}
        style="transform: translateX({gridOffset.current.x / 5}px)"
        class="w-[111%] bottom-0 z-[13]"
      />
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
        onmousedown={onClickTopArea}
        class="flex flex-row"
      >
        <UnderwaterGradient
          class="absolute w-full h-[101%]"
          --color-top="#03E5B7"
          --color-bottom="#00C1EF"
        />
        {#if $objectivesApi.currentObjectiveIs("obj_wrecks-start") || $objectivesApi.currentObjectiveIs("obj_wrecks-experiment")}
          <InfoMarker
            type="sm-o"
            onclick={() => {
              $objectivesApi.completeTask("task_observation");
              makeObservation("o_sunlight-surface", () => {
                if ($objectivesApi.currentObjectiveIs("obj_wrecks-start")) {
                  $objectivesApi.completeTask("task_question");
                  $hudApi.startDialog({
                    keys: smColor,
                    onFinished: () => {
                      $objectivesApi.completeTask("task_hypothesis");
                      $hudApi.showNotepad = true;
                    },
                  });
                }
              });
            }}
            class={cn(
              "absolute top-[44%] left-[44%]",
              "w-[55px] h-[55px] z-[9]",
              $wrecks.observed.includes("o_sunlight-surface")
                ? "opacity-30"
                : "opacity-100",
            )}
          />
        {/if}
        {#if $objectivesApi.currentObjectiveIs("obj_pressure-experiment") && $wrecks.numMeasured === 0}
          <InfoMarker
            type="sm-e"
            onclick={() => {
              makeMeasurement("0", "101.33");
            }}
            class={cn("absolute top-0 right-[11%]", "w-[55px] h-[55px] z-[9]")}
            style="transform: translateX({gridOffset.current.x / 5}px)"
          />
        {/if}
        {#if $objectivesApi.currentObjectiveIs("obj_pressure-experiment") && $wrecks.numMeasured === 1}
          <InfoMarker
            type="sm-e"
            onclick={() => {
              makeMeasurement("50", "607.95");
            }}
            class={cn(
              "absolute bottom-[33%] right-[11%]",
              "w-[55px] h-[55px] z-[9]",
            )}
            style="transform: translateX({gridOffset.current.x / 5}px)"
          />
        {/if}
      </Area>
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={onClickMiddleArea}
      >
        <UnderwaterGradient
          class="absolute w-full h-[101%]"
          --color-top="#00C1EF"
          --color-bottom="#037ADE"
        />
        {#if $objectivesApi.currentObjectiveIs("obj_wrecks-experiment") && $notepadApi.hasPage("wrecks-experiment")}
          <InfoMarker
            type="sm-o"
            onclick={() => {
              makeTableObservation("depth-medium", "o_color-change");
            }}
            class={cn(
              "absolute w-[55px] h-[55px] bottom-[55%] right-[33%] z-[15]",
              $wrecks.observed.includes("o_color-change")
                ? "opacity-30"
                : "opacity-100",
            )}
          />
        {/if}
        {#if $objectivesApi.currentObjectiveIs("obj_pressure-experiment") && $wrecks.numMeasured === 2}
          <InfoMarker
            type="sm-e"
            onclick={() => {
              makeMeasurement("100", "1114.58");
            }}
            class={cn(
              "absolute top-[17%] right-[11%]",
              "w-[55px] h-[55px] z-[9]",
            )}
            style="transform: translateX({gridOffset.current.x / 5}px)"
          />
        {/if}
        {#if $objectivesApi.currentObjectiveIs("obj_pressure-experiment") && $wrecks.numMeasured === 3}
          <InfoMarker
            type="sm-e"
            onclick={() => {
              makeMeasurement("150", "1621.20");
            }}
            class={cn(
              "absolute bottom-[12%] right-[11%]",
              "w-[55px] h-[55px] z-[9]",
            )}
            style="transform: translateX({gridOffset.current.x / 5}px)"
          />
        {/if}
      </Area>
      <Area
        size={[grid.width, $gameApi.windowHeight]}
        onmousedown={onClickBottomArea}
      >
        <UnderwaterGradient
          class="absolute size-full"
          --color-top="#037ADE"
          --color-bottom="#182B3A"
        />
        {#if $forest.encounteredMonster && !$wrecks.conchEncountered}
          <Conch
            onclick={() => {
              console.log("hello");
            }}
            class={cn(
              "absolute right-[19%] bottom-[51%] w-[55px] h-[55px] z-[9]",
              true && "pointer-events-none",
            )}
            style="transform: translateX({gridOffset.current.x / 5}px)"
          />
        {/if}
        {#if $objectivesApi.currentObjectiveIs("obj_wrecks-experiment") && $notepadApi.hasPage("wrecks-experiment")}
          <InfoMarker
            type="sm-o"
            onclick={() => {
              makeTableObservation("depth-deep", "o_darkness");
            }}
            class={cn(
              "absolute w-[55px] h-[55px] bottom-[66%] right-[22%] z-[15]",
              $wrecks.observed.includes("o_darkness")
                ? "opacity-30"
                : "opacity-100",
            )}
          />
        {/if}
        {#if $objectivesApi.currentObjectiveIs("obj_pressure-experiment") && $wrecks.numMeasured === 4}
          <InfoMarker
            type="sm-e"
            onclick={() => {
              makeMeasurement("200", "2127.83");
            }}
            class={cn(
              "absolute top-[36%] right-[11%]",
              "w-[55px] h-[55px] z-[9]",
            )}
            style="transform: translateX({gridOffset.current.x / 5}px)"
          />
        {/if}
      </Area>
    {/snippet}
  </Grid>
</Location>
