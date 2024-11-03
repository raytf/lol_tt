<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { BgImg } from "$components/ui/img";
  import { Grid, Area } from "$components/explorationOld";
  import { Dialog } from "$components/hud/dialog";
  import {
    GaugeScreen,
    ItemUnlockScreen,
    ItemCard,
  } from "$components/hud/inventory";
  import Table from "./Table.svelte";
  import Graph from "./Graph.svelte";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  import MeasuringLine from "$components/visual/MeasuringLine.svelte";
  import Otter from "$components/visual/Otter.svelte";
  import relics2 from "$assets/relics/relics_2.svg";
  import kelp from "$assets/chapter1/kelp.png";
  // Dialog
  import { dialogExperiment, dialogAnalysis } from "./dialogue";
  import { inventoryApi, gameApi } from "$apis";
  import { coords } from "$lib/stores/sub";

  interface TableData {
    depth: number;
    pressure: number;
  }
  const dpData = [
    {
      depth: 0,
      pressure: 1,
    },
    {
      depth: 50,
      pressure: 6,
    },
    {
      depth: 100,
      pressure: 11,
    },
    {
      depth: 150,
      pressure: 16,
    },
    {
      depth: 200,
      pressure: 21,
    },
  ];

  const xOffset = tweened(0, {
    duration: 500,
  });
  const yOffset = tweened(0, {
    duration: 500,
  });

  let initialSubCoords = {
    x: width / 2,
    y: height / 2,
  };
  let subCoords = $state(initialSubCoords);

  let otterCoords = $derived.by(() => {
    if (goTooDeep) {
      return { x: width / 2, y: height * 1.5 };
    }
    return { x: subCoords.x + 22, y: subCoords.y };
  });

  let activeArea = $state(0);

  function handleMouseDown(event: MouseEvent) {
    const x = event.clientX - $xOffset;
    const y = event.clientY - $yOffset;
    subCoords = { x: x, y: y };
  }

  function moveToNextArea(xDirection: number, yDirection: number) {
    const newXOffset = $xOffset + width * xDirection;
    const newYOffset = $yOffset + height * yDirection;
    subCoords = {
      x: width / 2 - newXOffset,
      y: height / 2 - newYOffset,
    };
    $xOffset = newXOffset;
    $yOffset = newYOffset;
  }

  onMount(() => {
    $inventoryApi.currentHintKey = "hint_3";
    $inventoryApi.showGaugeScreen = true;
    showTable = true;
  });

  let goTooDeep = $state(false);

  let experimentIndex = $state(0);
  let experimentData = $state<TableData[]>([]);
  let showTable = $state(false);
  let drawLine = $state(false);
  let showUnlockScreen = $state(false);
  let finishExperiment = $state(false);

  let startDialogAnalysis = $state(false);
</script>

<GaugeScreen />

<!-- onProceed={() => {
  if (experimentIndex > 4) return;
  const newY = (window.innerHeight / 2) * experimentIndex;
  subCoords = {
    x: window.innerWidth / 2,
    y: newY,
  };

  if (newY > window.innerHeight && newY < window.innerHeight * 2) {
    activeArea = 1;
    moveToNextArea(0, -1);
  }

  experimentIndex++;
  experimentData = dpData.slice(0, experimentIndex);
}} -->
<Dialog
  keys={dialogExperiment}
  onFinished={() => {
    startDialogAnalysis = true;
    drawLine = true;
  }}
/>
{#if startDialogAnalysis}
  <Dialog
    keys={dialogAnalysis}
    onFinished={() => {
      showTable = false;
      drawLine = false;
      showUnlockScreen = true;
    }}
  />
{/if}

<div
  class="absolute size-full flex flex-row space-x-24 pointer-events-none z-[2]"
>
  {#if showTable}
    <Table data={experimentData} extraClass="m-4 w-[222px]" />
  {/if}
  {#if drawLine}
    <Graph />
  {/if}
</div>

<!-- <ItemUnlockScreen
  reveal={showUnlockScreen}
  onclick={() => {
    $inventoryApi.unlockItem("dg");
    showUnlockScreen = false;
    finishExperiment = true;
    $inventoryApi.currentHintKey = "hint_4";
  }}
>
  <ItemCard id="dg" />
</ItemUnlockScreen> -->

<Grid xOffset={$xOffset} yOffset={$yOffset} class="grid-cols-1 w-full h-[300%]">
  <Submarine targetPosition={subCoords} class="z-[21]" />
  <Otter targetPosition={otterCoords} class="z-[22]" />
  <BgImg
    src={kelp}
    class="absolute top-0 right-[-11%] h-2/3 pointer-events-none z-[1]"
  />
  <MeasuringLine height={1111} values={[200, 150, 100, 50, 0]} />
  {#snippet areas()}
    <Area
      active={activeArea === 0}
      onDown={() => {
        activeArea = 1;
        moveToNextArea(0, -1);
      }}
      onmousedown={handleMouseDown}
      showInstruction={false}
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#03E5B7"
        --color-bottom="#08C8F6"
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
      onDown={finishExperiment
        ? () => {
            activeArea = 2;
            moveToNextArea(0, -1);
            goTooDeep = true;
          }
        : undefined}
      onmousedown={handleMouseDown}
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#08C8F6"
        --color-bottom="#037ade"
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
        goTooDeep = false;
      }}
      onDown={finishExperiment
        ? () => {
            $gameApi.fadeScene("/ch4");
          }
        : undefined}
      onmousedown={handleMouseDown}
    >
      <UnderwaterGradient
        class="absolute size-full z-[-1]"
        --color-top="#037ade"
        --color-bottom="#182b3a"
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
