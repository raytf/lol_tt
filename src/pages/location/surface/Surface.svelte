<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { Area } from "$components/exploration";
  import { Lol } from "$components/text";
  import { Dive } from "$components/svg/icons";
  import { Button } from "$components/ui/button";
  import { SkyOcean } from "$components/visual/scenery";
  import { Submarine } from "$components/gameObjects";
  import { setPosition as setSubPosition } from "$stores/sub";
  import { gameApi } from "$apis";
  import {
    surfaceSub,
    readyToDive,
    startSurface,
    onClickDive,
    onClickArea,
  } from "./events";

  let initialSubCoords = {
    x: $gameApi.windowWidth / 2,
    y: $gameApi.windowHeight / 2 + 111,
  };
  setSubPosition(initialSubCoords);
  onMount(() => {
    startSurface();
  });
</script>

<div class="relative size-full">
  <div class="absolute size-full z-[11] pointer-events-none">
    <div id="surface-heading" class="w-full text-center">
      <Lol key="surface-heading" class="text-3xl font-bold p-4" />
    </div>
    <div
      class="absolute bottom-0 w-full h-[222px] flex justify-center items-end pb-11"
    >
      {#if $readyToDive}
        <div transition:fade>
          <Button
            onclick={onClickDive}
            class="w-[111px] h-[88px] flex-col items-center pointer-events-auto"
          >
            <Lol key="dive" class="text-2xl" />
            <Dive class="w-[33px] h-[33px]" />
          </Button>
        </div>
      {/if}
    </div>
  </div>
  <SkyOcean start={true} />
  <div class="absolute w-full h-1/2 bottom-0 z-10">
    <Area onmousedown={onClickArea}></Area>
  </div>
  <Submarine
    size={111}
    offset={{ x: 111 / 2, y: 111 }}
    class="overflow-hidden"
    imgClass="bottom-[-44%]"
    bob={true}
    reveal={$surfaceSub}
  />
</div>
