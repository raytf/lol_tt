<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import BackupInit from "$lib/components/BackupInit.svelte";
  import { Grid, Area, BgImg } from "$components/exploration";
  import Inventory from "$components/inventory";
  import type { DialogKey } from "$components/dialog";
  import { InfoMarker } from "$components/ui/buttons";
  import { Dialog, QuestionDialog } from "$components/dialog";
  import { ItemUnlockScreen, ItemCard } from "$components/inventory";
  import { GaugeScreen } from "$components/inventory";
  import { SimpleButton } from "$components/ui/buttons";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  // Dialog
  import {
    dialog1,
    dialogExperiment,
    dialogOption1,
    dialogOption2,
    dialogOption3,
  } from "./dialogue";
  // Stores
  import { depthOffset, depthMultiplier, coords } from "$lib/stores/sub";
  // Apis
  import { getGameApi } from "$apis/game.svelte";
  import { getInventoryApi } from "$apis/inventory.svelte";
  const gameApi = getGameApi();
  const inventoryApi = getInventoryApi();

  const xOffset = tweened(0, {
    duration: 500,
  });
  const yOffset = tweened(0, {
    duration: 500,
  });

  let subCoords = $state($coords);

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
    $depthOffset = 1000;
    $depthMultiplier = 10;
    subCoords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    inventoryApi.currentHintKey = "hint_4";
    inventoryApi.showGaugeScreen = true;
  });

  let startDialog1 = $state(false);
  let startDialogExperiment = $state(false);
  let revealUnlockScreen = $state(false);
  let startExperiment = $state(false);
  let revealQuestion = $state(false);
  let finishedExperiment = $state(false);
</script>

<BackupInit inventory={true} />
<Inventory />
<GaugeScreen />
{#if startDialog1}
  <Dialog
    keys={dialog1}
    onFinished={() => {
      revealUnlockScreen = true;
    }}
  />
{/if}
{#if startDialogExperiment}
  <Dialog
    keys={dialogExperiment}
    onFinished={() => {
      startExperiment = true;
      inventoryApi.currentHintKey = "hint_5";
    }}
    hint={true}
  />
{/if}
<ItemUnlockScreen
  reveal={revealUnlockScreen}
  onclick={() => {
    inventoryApi.unlockItem("th");
    startDialogExperiment = true;
    revealUnlockScreen = false;
  }}
>
  <ItemCard id="th" />
</ItemUnlockScreen>
{#if startExperiment}
  <div
    class="absolute size-full flex justify-end items-end pointer-events-none z-[2]"
  >
    <SimpleButton onclick={() => (revealQuestion = true)} key="ready" />
  </div>
{/if}
{#if revealQuestion}
  <QuestionDialog
    questionKey="ch4-question"
    option1Correct={true}
    option1Key="ch4-question_option-1"
    option1DialogKeys={dialogOption1}
    onFinish1={() => {
      revealQuestion = false;
      finishedExperiment = true;
    }}
    option2Key="ch4-question_option-2"
    option2DialogKeys={dialogOption2}
    onFinish2={() => {
      revealQuestion = false;
    }}
    option3Key="ch4-question_option-3"
    option3DialogKeys={dialogOption3}
    onFinish3={() => {
      revealQuestion = false;
    }}
  />
{/if}

<Grid xOffset={$xOffset} yOffset={$yOffset} class="grid-cols-1 w-full h-[200%]">
  <Submarine size={66} targetPosition={subCoords} class="z-[21]" />
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
        animated={true}
        class="absolute size-full"
        --color-top="#19476b"
        --color-bottom="#011e36"
      />
      {#if !startExperiment}
        <InfoMarker
          onclick={() => {
            startDialog1 = true;
          }}
          class="absolute bottom-[44%] left-[48%] w-[55px] h-[55px] z-[2]"
        />
      {/if}
    </Area>
    <Area
      active={activeArea === 1}
      onUp={() => {
        activeArea = 0;
        moveToNextArea(0, 1);
      }}
      onmousedown={handleMouseDown}
    >
      <UnderwaterGradient
        animated={true}
        class="absolute size-full"
        --color-top="#011e36"
        --color-bottom="#06121c"
      />
    </Area>
  {/snippet}
</Grid>
