<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { gsap } from "gsap";
  import { Area } from "$components/explorationOld";
  import { Lol } from "$components/text";
  import { Dive } from "$components/svg/icons";
  import { Button } from "$components/ui/button";
  import { Dialog } from "$components/dialog";
  import { SkyOcean } from "$components/visual/scenery";
  import { Submarine } from "$components/gameObjects";
  import { moveSub } from "$lib/stores/exploration";
  import { ItemUnlockScreen, ItemCard } from "$components/inventory";
  import { missionBrief } from "./dialogue";
  import { windowWidth, windowHeight } from "$lib/stores/game";
  import { setPosition as setSubPosition } from "$lib/stores/sub";
  import {
    audioApi,
    gameApi,
    hudApi,
    inventoryApi,
    objectivesApi,
  } from "$apis";

  function revealHeading(vars?: gsap.TimelineVars) {
    const tl = gsap.timeline(vars);
    tl.to("#surface-heading", { opacity: 1, duration: 1 });
    return tl;
  }

  let surfaceSub = $state(false);
  let startDialog = $state(false);
  let tlHeading: GSAPTimeline;
  let initialSubCoords = {
    x: $windowWidth / 2,
    y: $windowHeight / 2 + 111,
  };
  setSubPosition(initialSubCoords);
  onMount(() => {
    gsap.set("#surface-heading", { opacity: 0 });
    $audioApi.playTrack({
      src: "sound/ocean-loop.mp3",
      volume: 0.08,
      loop: true,
    });

    tlHeading = revealHeading();
    setTimeout(() => {
      surfaceSub = true;
      tlHeading.reverse();
      setTimeout(() => {
        startDialog = true;
      }, 1500);
    }, 1500);
  });

  let unlockRadio = $state(false);
  let unlockSM = $state(false);
  let equipmentChecked = $state(false);
  let readyToStart = $state(false);
</script>

{#if startDialog}
  <Dialog
    top={true}
    keys={missionBrief}
    onFinished={() => {
      unlockSM = true;
    }}
  />
{/if}
<div class="relative size-full">
  <div class="absolute size-full z-[11] pointer-events-none">
    <div id="surface-heading">
      <Lol key="surface-heading" class="text-3xl font-bold p-4" />
    </div>
    <div
      class="absolute bottom-0 w-full h-[222px] flex justify-center items-end pb-11"
    >
      {#if readyToStart}
        <div transition:fade>
          <Button
            onclick={() => {
              readyToStart = false;
              surfaceSub = false;
              setTimeout(() => {
                $gameApi.fadeScene("/exploration_wrecks");
                $audioApi.stopTrack({
                  src: "sound/ocean-loop.mp3",
                });
              }, 1000);
            }}
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
    <Area
      onmousedown={(e) => {
        if (equipmentChecked) {
          $objectivesApi.completeTask("task_move-sub");
        }
        moveSub(e);
      }}
    ></Area>
  </div>
  <Submarine
    size={111}
    offset={{ x: 111 / 2, y: 111 }}
    class="overflow-hidden"
    imgClass="bottom-[-44%]"
    bob={true}
    reveal={surfaceSub}
  />
</div>

<ItemUnlockScreen
  reveal={unlockSM}
  onclick={() => {
    $inventoryApi.unlockItem("sm");
    unlockSM = false;
    unlockRadio = true;
  }}
>
  <ItemCard id="sm" />
</ItemUnlockScreen>
<ItemUnlockScreen
  reveal={unlockRadio}
  onclick={() => {
    $hudApi.activated = true;
    $inventoryApi.unlockItem("radio");
    unlockRadio = false;
    $objectivesApi.startChapter("tutorial", [
      {
        key: "obj_check-equipment",
        completed: false,
        onFinished: () => {
          equipmentChecked = true;
        },
      },
      {
        key: "obj_learn-controls",
        completed: false,
        onFinished: () => {
          readyToStart = true;
        },
      },
    ]);

    $hudApi.showInventory = true;
    $hudApi.showObjectives = true;
  }}
>
  <ItemCard id="radio" />
</ItemUnlockScreen>
