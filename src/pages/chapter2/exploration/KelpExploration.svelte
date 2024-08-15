<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import BackupInit from "$lib/components/BackupInit.svelte";
  import { Grid, Area, BgImg } from "$components/exploration";
  import Inventory from "$components/inventory";
  import { InfoMarker } from "$components/ui/buttons";
  import type { DialogKey } from "$components/dialog";
  import { Dialog } from "$components/dialog";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  import relics2 from "$assets/relics/relics_2.svg";
  import kelp from "$assets/chapter1/kelp.png";
  // Emojis
  import openMouth from "$assets/emoji/open-mouth.svg";
  import neutral from "$assets/emoji/neutral.svg";
  import smile from "$assets/emoji/smile.svg";

  const xOffset = tweened(0, {
    duration: 500,
  });
  const yOffset = tweened(0, {
    duration: 500,
  });

  let initialSubCoords = { x: 0, y: window.innerHeight / 2 };
  let subCoords = $state(initialSubCoords);

  let activeArea = $state(0);

  function handleMouseDown(event: MouseEvent) {
    const x = event.clientX - $xOffset;
    const y = event.clientY - $yOffset;
    subCoords = { x: x, y: y };
  }

  function moveToNextArea(xDirection: number, yDirection: number) {
    const newXOffset = $xOffset + window.innerWidth * xDirection;
    const newYOffset = $yOffset + window.innerHeight * yDirection;
    subCoords = {
      x: window.innerWidth / 2 - newXOffset,
      y: window.innerHeight / 2 - newYOffset,
    };
    $xOffset = newXOffset;
    $yOffset = newYOffset;
  }

  onMount(() => {
    subCoords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  });

  let dialogKeys = $state<DialogKey[]>([]);
</script>

<BackupInit inventory={true} />
<Inventory />
<Dialog
  once={false}
  keys={dialogKeys}
  onFinished={() => {
    dialogKeys = [];
  }}
/>
<Grid xOffset={$xOffset} yOffset={$yOffset} class="grid-cols-1 w-full h-[300%]">
  <Submarine
    targetPosition={subCoords}
    x={subCoords.x}
    y={subCoords.y}
    class="z-[21]"
  />
  <BgImg
    src={kelp}
    class="absolute top-0 right-[-11%] h-2/3 pointer-events-none z-[1]"
  />
  {#snippet areas()}
    <Area
      active={activeArea === 0}
      onDown={() => {
        activeArea = 1;
        moveToNextArea(0, -1);
      }}
      onmousedown={handleMouseDown}
      showInstruction={true}
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#03E5B7"
        --color-bottom="#08C8F6"
      />
      <InfoMarker
        onclick={() => {
          dialogKeys = [
            {
              imgSrc: openMouth,
              name: "dialog-name_explorer",
              text: "ch2-info_kelp-1",
            },
            {
              imgSrc: smile,
              name: "dialog-name_explorer",
              text: "ch2-info_kelp-2",
            },
          ];
        }}
        class="absolute w-[55px] h-[55px] top-[200px] right-[111px] z-20"
      />
      <div class="absolute size-full z-[1] pointer-events-none">
        <div class="absolute w-1/2 h-full left-0 overflow-clip">
          <BgImg src={relics2} class="bottom-[-42%] w-[200%] z-[2]" />
        </div>
        <div class="absolute w-[11%] h-full left-0 overflow-clip z-[1]">
          <BgImg
            src={relics2}
            class="bottom-[28px] left-[-33px] w-[555px] z-[2]"
          />
        </div>
      </div>
    </Area>
    <Area
      active={activeArea === 1}
      onUp={() => {
        activeArea = 0;
        moveToNextArea(0, 1);
      }}
      onDown={() => {
        activeArea = 2;
        moveToNextArea(0, -1);
      }}
      onmousedown={handleMouseDown}
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#08C8F6"
        --color-bottom="#037ade"
      />
      <InfoMarker
        onclick={() => {
          dialogKeys = [
            {
              imgSrc: neutral,
              name: "dialog-name_explorer",
              text: "ch2-info_color-1",
            },
          ];
        }}
        class="absolute w-[55px] h-[55px] top-[50%] right-[33%] z-20"
      />
      <div class="absolute size-full z-[1] overflow-clip pointer-events-none">
        <BgImg
          src={relics2}
          class="rotate-90 left-[-60%] bottom-[-36%] w-[144%] z-[2]"
        />
        <div class="absolute h-full w-[11%] right-0 overflow-clip">
          <BgImg
            src={relics2}
            class="right-[-11px] bottom-[-22%] w-[777px] z-[2]"
          />
        </div>
      </div>
    </Area>
    <Area
      active={activeArea === 2}
      onUp={() => {
        activeArea = 1;
        moveToNextArea(0, 1);
      }}
      onmousedown={handleMouseDown}
    >
      <UnderwaterGradient
        class="absolute size-full z-[-1]"
        --color-top="#037ade"
        --color-bottom="#182b3a"
      />
      <InfoMarker
        onclick={() => {
          dialogKeys = [
            {
              imgSrc: neutral,
              name: "dialog-name_explorer",
              text: "ch2-info_foliage-1",
            },
          ];
        }}
        class="absolute w-[55px] h-[55px] top-[44px] left-[11px] z-20"
      />
      <InfoMarker
        onclick={() => {
          dialogKeys = [
            {
              imgSrc: openMouth,
              name: "dialog-name_explorer",
              text: "ch2-info_color-2",
            },
          ];
        }}
        class="absolute w-[55px] h-[55px] top-[50%] right-[33%] z-20"
      />
      <div class="absolute size-full z-[1] overflow-clip pointer-events-none">
        <BgImg
          src={relics2}
          class="rotate-90 left-[-65%] bottom-[-31%] w-[133%] z-[2]"
        />
        <div class="absolute top-0 right-0 h-[25%] w-[15%] overflow-clip">
          <BgImg
            src={relics2}
            class="-rotate-90 right-[-485px] bottom-[-576px] w-[1111px] z-[2]"
          />
        </div>
      </div>
    </Area>
  {/snippet}
</Grid>
