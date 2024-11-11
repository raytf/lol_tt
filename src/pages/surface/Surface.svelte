<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { gsap } from "gsap";
  import { toast } from "@zerodevx/svelte-toast";
  import { Area } from "$components/exploration";
  import { Lol } from "$components/text";
  import { Dive } from "$components/svg/icons";
  import { Button } from "$components/ui/button";
  import { SkyOcean } from "$components/visual/scenery";
  import { Submarine } from "$components/gameObjects";
  import { setTarget as setSubTarget, setTarget } from "$stores/sub";
  import { missionBrief } from "$dialog/surface";
  import { setPosition as setSubPosition } from "$lib/stores/sub";
  import { audioApi, gameApi, hudApi, objectivesApi } from "$apis";

  function revealHeading(vars?: gsap.TimelineVars) {
    const tl = gsap.timeline(vars);
    tl.to("#surface-heading", { opacity: 1, duration: 1 });
    return tl;
  }

  let surfaceSub = $state(false);
  let tlHeading: GSAPTimeline;
  let initialSubCoords = {
    x: $gameApi.windowWidth / 2,
    y: $gameApi.windowHeight / 2 + 111,
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
        $hudApi.activated = true;
        startMissionBriefDialog(() => {
          unlockSmItem(() => {
            unlockRadioItem(() => {
              $hudApi.showInventory = true;
              startTutorial();
            });
          });
        });
      }, 1111);
    }, 1111);
  });

  function startMissionBriefDialog(onFinished?: () => void) {
    $hudApi.startDialog({
      keys: missionBrief,
      onFinished: onFinished,
    });
  }

  function unlockSmItem(onFinished?: () => void) {
    $hudApi.startItemUnlock({
      itemId: "sm",
      onFinished: onFinished,
    });
  }

  function unlockRadioItem(onFinished?: () => void) {
    $hudApi.startItemUnlock({
      itemId: "radio",
      onFinished: onFinished,
    });
  }

  function startTutorial() {
    $hudApi.startChapter({
      chapterKey: "tutorial",
      objectives: [
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
        },
      ],
      onFinished: () => {
        readyToDive = true;
      },
    });
  }

  let equipmentChecked = $state(false);
  let readyToDive = $state(false);
</script>

<div class="relative size-full">
  <div class="absolute size-full z-[11] pointer-events-none">
    <div id="surface-heading">
      <Lol key="surface-heading" class="text-3xl font-bold p-4" />
    </div>
    <div
      class="absolute bottom-0 w-full h-[222px] flex justify-center items-end pb-11"
    >
      {#if readyToDive}
        <div transition:fade>
          <Button
            onclick={() => {
              readyToDive = false;
              surfaceSub = false;
              setTimeout(() => {
                $gameApi.fadeScene("/location_wrecks/surface");
                $audioApi.stopTrack({
                  src: "sound/ocean-loop.mp3",
                });
                $audioApi.playTrack({
                  src: "music/deep-echoes.mp3",
                  volume: 0.44,
                  loop: true,
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
        setSubTarget({ x: e.clientX, y: e.clientY });
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
