<script lang="ts">
  import { onMount } from "svelte";
  import { tweened, spring } from "svelte/motion";
  import { Grid, Area, BgImg } from "$components/exploration";
  import Dialog from "$components/dialog/Dialog.svelte";
  import Wrecks from "./areas/Wrecks.svelte";
  import SharkLair from "./areas/SharkLair.svelte";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  import Shark from "$components/visual/Shark.svelte";
  import relics2 from "$assets/relics/relics_2.svg";
  import foliage1 from "$assets/foliage/foliage_1.svg";
  import openMouth from "$assets/emoji/open-mouth.svg";
  import { sharkEncountered, explorationOffset, sharkCoords } from "../store";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

  const xOffset = tweened($explorationOffset.x, {
    duration: 500,
  });
  const yOffset = tweened($explorationOffset.y, {
    duration: 500,
  });

  const defaultCoords = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  let sharkDirection = $state(1);
  let subDirection = $state(1);
  const initialSubCoords = {
    x: window.innerWidth / 2 + 88,
    y: window.innerHeight - 88,
  };
  if ($sharkEncountered) {
    initialSubCoords.x = window.innerWidth * 2.5;
    initialSubCoords.y = window.innerHeight / 2;
  }
  let subCoords = spring(
    { x: initialSubCoords.x, y: initialSubCoords.y },
    {
      stiffness: 0.01,
      damping: 0.8,
    },
  );

  let upEnabled = $state(false);
  let downEnabled = $state(false);
  let leftEnabled = $state(false);
  let rightEnabled = $state(false);

  function resetNav() {
    upEnabled = false;
    downEnabled = false;
    leftEnabled = false;
    rightEnabled = false;
  }

  function handleMouseDown(event: MouseEvent) {
    const x = event.clientX - $xOffset;
    const y = event.clientY - $yOffset;
    moveSub(x, y);
    if ($sharkEncountered) {
      moveShark(x, y);
    }
  }

  function moveSub(x: number, y: number) {
    subCoords.set({ x: x, y: y });

    const dx = x - $subCoords.x;
    subDirection = dx <= 0 ? -1 : 1;
  }
  function moveShark(x: number, y: number) {
    if (y > window.innerHeight) return;
    sharkCoords.set({ x: x, y: y });

    const dx = $subCoords.x - $sharkCoords.x;
    sharkDirection = dx <= 0 ? 1 : -1;
  }

  onMount(() => {
    const x = window.innerWidth / 2 - $xOffset;
    const y = window.innerHeight / 2 - $yOffset;
    moveSub(x, y);
  });

  let startDialog1 = $state(false);
  let startDialog2 = $state(false);
</script>

{#if startDialog1}
  <Dialog
    keys={[
      {
        imgSrc: openMouth,
        name: "dialog-name_explorer",
        text: "ch1-dialog_shark_1-1",
      },
    ]}
    onFinished={() => {
      gameApi.fadeScene("/ch1_story_shark-encounter");
    }}
  />
{/if}
<Grid
  xOffset={$xOffset}
  yOffset={$yOffset}
  {upEnabled}
  {downEnabled}
  {leftEnabled}
  {rightEnabled}
  onUp={() => {
    resetNav();
    yOffset.update((current) => {
      const newOffset = current + window.innerHeight;
      const x = defaultCoords.x - $xOffset;
      const y = defaultCoords.y - newOffset;
      moveSub(x, y);
      return current + window.innerHeight;
    });
  }}
  onDown={() => {
    resetNav();
    yOffset.update((current) => {
      const newOffset = current - window.innerHeight;
      const x = defaultCoords.x - $xOffset;
      const y = defaultCoords.y - newOffset;
      moveSub(x, y);
      return current - window.innerHeight;
    });
  }}
  onLeft={() => {
    resetNav();
    xOffset.update((current) => {
      const newOffset = current + window.innerWidth;
      const x = defaultCoords.x - newOffset;
      const y = defaultCoords.y - $yOffset;
      moveSub(x, y);
      return current + window.innerWidth;
    });
  }}
  onRight={() => {
    resetNav();
    xOffset.update((current) => {
      const newOffset = current - window.innerWidth;
      const x = defaultCoords.x - newOffset;
      const y = defaultCoords.y - $yOffset;
      moveSub(x, y);
      return newOffset;
    });
  }}
  class="grid-cols-3 grid-rows-2 h-[200%] w-[300%]"
>
  {#snippet characters()}
    <Submarine
      x={$subCoords.x}
      y={$subCoords.y}
      scaleX={subDirection}
      class="z-[11]"
    />
    <Shark
      x={$sharkCoords.x}
      y={$sharkCoords.y}
      scaleX={sharkDirection}
      class="z-10"
    />
  {/snippet}
  {#snippet areas()}
    <Wrecks
      showInstruction={true}
      onmousedown={(e) => {
        handleMouseDown(e);
        resetNav();
        rightEnabled = true;
      }}
    ></Wrecks>
    <Area
      onmousedown={(e) => {
        handleMouseDown(e);
        resetNav();
        leftEnabled = true;
        rightEnabled = true;
        downEnabled = true;
      }}
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#03E5B7"
        --color-bottom="#037ADE"
      />
      <div class="absolute size-full z-[1] pointer-events-none">
        <div class="absolute w-1/2 h-full left-0 overflow-clip">
          <BgImg
            src={relics2}
            alt="relics-2"
            class="bottom-[-42%] w-[200%] z-[2]"
          />
        </div>
        <div class="absolute w-1/2 h-full right-0 overflow-clip">
          <BgImg
            src={foliage1}
            alt="foliage-1"
            class="right-0 bottom-[-38%] w-[200%] z-[2]"
          />
        </div>
      </div>
    </Area>
    <SharkLair
      onmousedown={(e) => {
        if (!$sharkEncountered) {
          moveShark($sharkCoords.x - 222, $sharkCoords.y);
          startDialog1 = true;
          $explorationOffset = { x: $xOffset, y: $yOffset };
          $sharkEncountered = true;
          return;
        }
        handleMouseDown(e);
        resetNav();
        leftEnabled = true;
      }}
    ></SharkLair>
    <Area
      onmousedown={(e) => {
        handleMouseDown(e);
        resetNav();
        upEnabled = true;

        if ($sharkEncountered) {
          startDialog2 = true;
        }
      }}
      class="col-end-3"
    >
      <UnderwaterGradient
        class="absolute size-full z-[-1]"
        --color-top="#037ADE"
        --color-bottom="#182b3a"
      />
      <div class="absolute size-full z-[1] overflow-clip pointer-events-none">
        <BgImg
          src={relics2}
          alt="relics-2"
          class="rotate-90 left-[-55%] bottom-[-31%] w-[133%] z-[2]"
        />
        <BgImg
          src={foliage1}
          alt="foliage-1"
          class="rotate-90 scale-y-[-1] right-[-44%]"
        />
      </div>
    </Area>
  {/snippet}
</Grid>
