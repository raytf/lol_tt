<script lang="ts">
  import { Spring } from "svelte/motion";
  import { fade } from "svelte/transition";
  import { querystring } from "svelte-spa-router";
  import { onMount, untrack } from "svelte";
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
    direction as subDirection,
    breakPropellor,
  } from "$stores/sub";
  import {
    gameApi,
    audioApi,
    infoApi,
    objectivesApi,
    hudApi,
    interfaceApi,
  } from "$apis";
  import { Button, InfoMarker } from "$components/ui/button";
  import {
    ForestPath,
    ForestRightPath,
    UnderwaterRock,
  } from "$components/svg/environment";
  import underwater from "$assets/underwater_wide.jpg";
  import forest_1 from "$assets/forest/forest_1.png";
  import forest_2 from "$assets/forest/forest_2.png";
  import forest_3 from "$assets/forest/forest_3.png";
  import forest_right from "$assets/forest/forest_right.png";
  import kelp_1 from "$assets/forest/kelp_1.png";
  import { ArrowLeft, ArrowDown } from "$components/svg/icons/animated";
  import { cn } from "$lib/utils";
  import wrecks from "$stores/wrecks.svelte";
  import forest from "$stores/forest.svelte";
  import { enterForest } from "$dialog/chapter1";

  //#region state
  const grid = {
    width: $gameApi.windowWidth * 2,
    height: $gameApi.windowHeight * 3,
  };
  minOffset.set({
    x: -grid.width + $gameApi.windowWidth,
    y: -grid.height + $gameApi.windowHeight,
  });

  let initialPosition = { x: -111, y: subCoords.current.y };
  let initialTarget = {
    x: 444,
    y: subCoords.current.y,
  };
  let initialMonsterPosition = {
    x: grid.width / 2,
    y: grid.height / 2,
  };
  const searchParams = new URLSearchParams($querystring);
  if (searchParams.has("from", "wrecks")) {
    initialPosition = { x: -111, y: subCoords.current.y };
    initialTarget = {
      x: 222,
      y: subCoords.current.y,
    };
    gridOffset.set({ x: 0, y: gridOffset.current.y }, { instant: true });
  }
  if (searchParams.has("from", "abyss")) {
    initialPosition = { x: grid.width - 111, y: grid.height + 111 };
    initialTarget = {
      x: initialPosition.x,
      y: grid.height - 111,
    };
    gridOffset.set(
      {
        x: -grid.width + $gameApi.windowWidth,
        y: -grid.height + $gameApi.windowHeight,
      },
      { instant: true },
    );
  }
  let depthRatio = $derived.by(() => {
    const ratio = gridOffset.current.y / $minOffset.y;
    return ratio;
  });
  //#region KelpMonster
  let monsterCoords = new Spring(initialMonsterPosition, {
    stiffness: 0.005,
    damping: 0.4,
  });
  let monsterDirection = $state(1);
  let maxDistance = 200;
  let maxDepth = 1300;
  let touched = $state(false);
  let tooDeep = $state(false);
  let returnTimeout = $state<NodeJS.Timeout>();

  function setMonsterTarget() {
    const x = subCoords.current.x;
    const y = subCoords.current.y;
    const deltaX = x - monsterCoords.current.x;
    const deltaY = y - monsterCoords.current.y;

    if (deltaX > 100) {
      monsterDirection = -1;
    }
    if (deltaX < 0) {
      monsterDirection = 1;
    }

    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    //console.log(distance);
    if (distance <= maxDistance) {
      if (!touched) {
        //onTouched();
        touched = true;
      }
    }

    // let unitX = deltaX / distance;
    // let unitY = deltaY / distance;

    // let scaledX = unitX * maxDistance;
    // let scaledY = unitY * maxDistance;

    // let targetX = x - scaledX;
    // let targetY = y - scaledY;
    //monsterCoords.set({ x: targetX, y: targetY });
    // Math.min(y, maxDepth)
    if (y <= maxDepth) {
      clearTimeout(returnTimeout);
      tooDeep = false;
      monsterCoords.set({ x: x, y: y });
    } else {
      if (!tooDeep) {
        returnTimeout = setTimeout(() => {
          monsterCoords.set(initialMonsterPosition);
        }, 5000);
        tooDeep = true;
      }
    }
  }

  function onTouched() {
    $hudApi.startDialog({
      keys: [{ text: "thwomp" }],
      blockInput: true,
      onFinished: () => {
        breakPropellor();
        $interfaceApi.showWarning({
          level: "danger",
          text: "warning-propellor",
        });

        $forest.encounteredMonster = true;

        // $infoApi.openModal({
        //   textKeys: ["i_propellor"],
        // });

        if ($objectivesApi.currentObjectiveIs("obj_keep-exploring")) {
          setTimeout(() => {
            $gameApi.fadeScene("/wrecks?from=forest");
          }, 1000);
        }
      },
    });
  }

  $effect(() => {
    if ($forest.monsterActivated) {
      setMonsterTarget();
    }
  });
  //#endregion

  let subNearWrecks = $state(false);
  let subNearAbyss = $state(false);
  //#endregion
  //#region events
  function onEnter() {
    $forest.monsterActivated = false;
    $audioApi.playTrack({
      src: "music/tangled-depths.mp3",
      volume: 0.55,
      loop: true,
    });

    if (!$objectivesApi.chapterStarted) {
      if (!$objectivesApi.completedChapters.includes("chapter2")) {
        $objectivesApi.startChapter("chapter2", () => {});
      }
    }

    $forest.encounteredMonster = true;

    if (
      $objectivesApi.currentChapterIs("chapter1") &&
      !$forest.encounteredMonster
    ) {
      setTimeout(() => {
        $hudApi.startDialog({
          keys: enterForest,
          blockInput: true,
          onFinished: () => {
            setSubTarget({ x: 0, y: subCoords.current.y });
            $audioApi.stopTrack({ src: "music/tangled-depths.mp3" });
            $gameApi.fadeScene("/wrecks?from=forest");
          },
        });
      }, 1000);
    } else {
      setTimeout(() => {
        $forest.monsterActivated = true;
      }, 2000);
    }
  }
  function onClickArea(e: MouseEvent) {
    const x = e.clientX - gridOffset.current.x;
    const y = e.clientY - gridOffset.current.y;

    if (x < 300 && y < 1400) {
      subNearWrecks = true;
    } else {
      subNearWrecks = false;
    }

    if (x > 1500 && y > 1500) {
      subNearAbyss = true;
    } else {
      subNearAbyss = false;
    }

    // if (x > 400) activateMonster = true;

    moveSub(e);
  }
  //#endregion

  setSubPosition(initialPosition);
  onMount(() => {
    if (!$objectivesApi.completedChapters.includes("chapter1")) {
      $objectivesApi.completedChapters = ["tutorial", "chapter1"];
      $objectivesApi.completedObjectives = ["obj_explore-forest"];
      $objectivesApi.recallCompletedChapters();
    }

    setTimeout(() => {
      setSubTarget(initialTarget);
    }, 555);

    onEnter();
  });
</script>

<Location titleKey="location-forest" uiClass="z-[11]">
  {#snippet ui()}
    {#if subNearWrecks}
      <div
        transition:fade
        class="absolute z-[11] top-0 left-0 w-[222px] h-full flex flex-col justify-center items-start pl-4"
      >
        <Button
          onclick={() => {
            setSubTarget({ x: -111, y: subCoords.current.y });
            $audioApi.stopTrack({ src: "music/tangled-depths.mp3" });
            $gameApi.fadeScene("/wrecks?from=forest");
          }}
          class="w-[99px] h-[88px] flex-col items-center"
        >
          <Lol key="location-wrecks" class="mr-1" />
          <ArrowLeft class="w-[33px] h-[33px]" />
        </Button>
      </div>
    {/if}
  {/snippet}
  <Grid
    size={[grid.width, grid.height]}
    xOffset={gridOffset.current.x}
    yOffset={gridOffset.current.y}
    class=""
  >
    <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
    <BgImg
      src={forest_3}
      class="w-[111%] z-[7]"
      style="transform: translateX({gridOffset.current.x / 8}px);"
    />
    <BgImg
      src={forest_2}
      class="z-[7]"
      style="transform: translateX({gridOffset.current.x / 7}px);"
    />
    <KelpMonster
      coords={monsterCoords.current}
      direction={monsterDirection}
      class="w-[555px] h-[666px] z-[9]"
    />
    <Submarine class="z-10" />

    <BgImg
      src={forest_right}
      class="-right-[9%] z-[11]"
      style="transform: translateX({gridOffset.current.x / 6}px);"
    />
    <ForestRightPath
      class="absolute -right-[9%] opacity-0 z-[11] pointer-events-none"
      style="transform: translateX({gridOffset.current.x / 6}px);"
    />
    <ForestPath
      class="z-[11] opacity-0 pointer-events-none"
      style="transform: translateX({gridOffset.current.x / 6}px);"
    />
    <BgImg
      src={forest_1}
      class="z-[11]"
      style="transform: translateX({gridOffset.current.x / 6}px);"
    />

    <BgImg
      src={kelp_1}
      class="left-0 size-full z-[12]"
      style="filter: brightness({1 -
        depthRatio +
        0.4}); transform: translateX({gridOffset.current.x / 4}px);"
    />
    <Darkness
      level={depthRatio * 0.5 + 0.3}
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
        {#if $objectivesApi.currentObjectiveIs("obj_sm-forest")}
          <InfoMarker
            type="sm-o"
            onclick={() => {
              //makeTableObservation("depth-deep", "o_darkness");
            }}
            class={cn(
              "absolute w-[55px] h-[55px] bottom-[22%] left-[44%] z-[15]",
            )}
          />
        {/if}
        {#if $forest.abyssUnlocked && subNearAbyss}
          <div
            transition:fade
            class={cn(
              "absolute bottom-0 right-0 w-[500px] h-[100px]",
              "flex justify-center items-center z-[11]",
            )}
          >
            <Button
              onclick={() => {
                setSubTarget({ x: grid.width - 111, y: grid.height + 111 });
                $audioApi.stopTrack({ src: "music/tangled-depths.mp3" });
                $gameApi.fadeScene("/abyss");
                // $gameApi.fadeScene("/surface?from=wrecks", 1, 1);
              }}
              class="w-[99px] h-[88px] flex-col items-center gap-1"
            >
              <Lol key="location-abyss" />
              <ArrowDown class="w-[44px] h-[44px]" />
            </Button>
          </div>
        {/if}
      </Area>
    {/snippet}
  </Grid>
</Location>
