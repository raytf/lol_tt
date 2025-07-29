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
  import {
    gameApi,
    audioApi,
    objectivesApi,
    radioApi,
    hudApi,
    notepadApi,
    lolApi,
  } from "$apis";
  import { status, missionBrief } from "$dialog/tutorial";

  //#region setup
  const grid = {
    width: $gameApi.windowWidth,
    height: $gameApi.windowHeight,
  };
  // minOffset.set({
  //   x: -grid.width + $gameApi.windowWidth,
  //   y: -grid.height + $gameApi.windowHeight,
  // });

  let initialSubCoords = {
    x: $gameApi.windowWidth / 2,
    y: $gameApi.windowHeight / 2 + 111,
  };
  const searchParams = new URLSearchParams($querystring);
  if (searchParams.has("from", "wrecks")) {
    initialSubCoords = {
      x: subCoords.current.x,
      y: initialSubCoords.y,
    };
    gridOffset.set({ x: gridOffset.current.x, y: 0 }, { instant: true });
  }
  let surfaceSub = $state(true);
  let readyToDive = $state(false);
  //#endregion

  //#region events
  function onClickArea(e: MouseEvent) {
    if ($objectivesApi.currentObjectiveIs("obj_explore")) {
      $objectivesApi.completeTask("task_move-sub");
    }

    moveSub(e);
  }
  //#endregion

  setSubPosition(initialSubCoords);
  onMount(() => {});
</script>

<Location titleKey="" uiClass="z-[11]">
  {#snippet ui()}
    <div class="size-full flex flex-col items-center">
      <h1 class="text-title text-8xl font-bold text-shadow-md mt-24">
        {$lolApi.getText("title")}
      </h1>
      <p
        in:fade={{ delay: 3000, duration: 2000 }}
        class="text-title text-4xl font-bold p-4"
      >
        {$lolApi.getText("subtitle")}
      </p>
    </div>
  {/snippet}

  <Grid
    size={[grid.width, grid.height]}
    xOffset={gridOffset.current.x}
    yOffset={gridOffset.current.y}
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
    {#snippet areas()}
      <div class="absolute flex w-full h-1/2 bottom-0 z-10">
        <Area
          size={[grid.width, grid.height / 2]}
          onmousedown={onClickArea}
          class=""
        ></Area>
      </div>
    {/snippet}
  </Grid>
</Location>
