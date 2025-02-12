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
  import { Submarine, Ship, FloatingKelp } from "$components/gameObjects";
  import { gridOffset, minOffset, moveSub } from "$stores/exploration";
  import {
    setPosition as setSubPosition,
    coords as subCoords,
  } from "$stores/sub";
  import { gameApi, audioApi, objectivesApi, radioApi, hudApi } from "$apis";
  import { status, missionBrief } from "$dialog/tutorial";

  //#region setup
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
  let surfaceSub = $state(searchParams.has("start") ? true : false);
  let readyToDive = $state(false);
  //#endregion

  //#region events
  function onEnter() {
    setSubPosition(initialSubCoords);
    $audioApi.playTrack({
      src: "sound/ocean-loop.mp3",
      volume: 0.08,
      loop: true,
    });

    if (searchParams.has("start")) {
      if ($objectivesApi.currentChapter === "tutorial") {
        setTimeout(() => {
          $objectivesApi.startChapter("tutorial", () => {});

          if ($objectivesApi.hasCompleted("obj_mission")) {
            readyToDive = true;
            $radioApi.attachCallback(() => {
              $hudApi.startDialog({
                keys: [...missionBrief],
              });
            });
          } else {
            $radioApi.attachCallback(() => {
              $hudApi.startDialog({
                keys: [...status, ...missionBrief],
                disabledOptions: [
                  "tut_mb-1.2",
                  "tut_mb-1.3",
                  "tut_data.qn",
                  "tut_data.ok",
                ],
                onFinished: () => {
                  $objectivesApi.completeTask("task_start-mission");
                  readyToDive = true;
                },
              });
              $objectivesApi.completeTask("task_call-radio");
            });
          }
        }, 3000);
      }

      return;
    }

    // Non-start
    setTimeout(() => {
      surfaceSub = true;
      readyToDive = true;
    }, 1111);
  }

  function onClickArea(e: MouseEvent) {
    if ($objectivesApi.currentObjectiveIs("obj_learn-controls")) {
      $objectivesApi.completeTask("task_move-sub");
    }

    moveSub(e);
  }

  function onClickDive() {
    readyToDive = false;
    surfaceSub = false;

    setTimeout(() => {
      $gameApi.fadeScene("/wrecks?from=surface");
      $audioApi.stopTrack({
        src: "sound/ocean-loop.mp3",
      });
    }, 1111);
  }
  //#endregion

  onMount(() => {
    onEnter();
  });
</script>

<Location title="surface" uiClass="z-[11]">
  {#snippet ui()}
    <div
      class="absolute z-[11] bottom-0 w-full h-[222px] flex justify-center items-end pb-11"
    >
      {#if readyToDive}
        <div transition:fade>
          <Button
            onclick={onClickDive}
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
      reveal={surfaceSub}
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
          onmousedown={onClickArea}
          class=""
        ></Area>
        <Area
          size={[$gameApi.windowWidth * 0.5, grid.height / 2]}
          class="pointer-events-none"
        >
          <FloatingKelp class="absolute top-0 size-full" />
        </Area>
      </div>
    {/snippet}
  </Grid>
</Location>
