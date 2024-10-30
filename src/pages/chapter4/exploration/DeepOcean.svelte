<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { BgImg } from "$components/ui/img";
  import { Grid, Area } from "$components/explorationOld";
  import type { DialogKey } from "$components/dialog";
  import { InfoMarker } from "$lib/components/ui/button";
  import { Dialog, QuestionDialog } from "$components/dialog";
  import { ItemUnlockScreen, ItemCard } from "$components/inventory";
  import { GaugeScreen } from "$components/inventory";
  import { Button } from "$lib/components/ui/button";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  import Squid from "$components/visual/Squid.svelte";
  // Dialog
  import {
    dialog1,
    dialogExperiment,
    dialogOption1,
    dialogOption2,
    dialogOption3,
    dialog2,
  } from "./dialogue";
  // Stores
  import {
    depthOffset,
    depthMultiplier,
    nearVent,
    coords,
  } from "$lib/stores/sub";
  // Apis
  import { inventoryApi } from "$apis";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

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
    $inventoryApi.currentHintKey = "hint_4";
    $inventoryApi.showGaugeScreen = true;
  });

  let startDialog1 = $state(false);
  let startDialogExperiment = $state(false);
  let revealUnlockScreen = $state(false);
  let startExperiment = $state(false);
  let revealQuestion = $state(false);
  let finishedExperiment = $state(false);
  let startDialog2 = $state(false);
</script>

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
      $inventoryApi.currentHintKey = "hint_5";
    }}
    hint={true}
  />
{/if}
<ItemUnlockScreen
  reveal={revealUnlockScreen}
  onclick={() => {
    $inventoryApi.unlockItem("th");
    startDialogExperiment = true;
    revealUnlockScreen = false;
  }}
>
  <ItemCard id="th" />
</ItemUnlockScreen>
{#if startExperiment && !finishedExperiment}
  <div
    class="absolute size-full flex justify-end items-end pointer-events-none z-[2]"
  >
    <Button onclick={() => (revealQuestion = true)} />
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
      $inventoryApi.currentHintKey = "hint_4";
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
{#if startDialog2}
  <Dialog
    keys={dialog2}
    onFinished={() => {
      gameApi.fadeScene("/chapter-select");
    }}
  />
{/if}

<Grid xOffset={$xOffset} yOffset={$yOffset} class="grid-cols-1 w-full h-[300%]">
  <Submarine size={66} targetPosition={subCoords} class="z-[21]" />
  <Squid
    size={333}
    targetPosition={subCoords}
    class="{finishedExperiment ? 'opacity-20' : 'opacity-0'} z-[20]"
  />
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
      onDown={finishedExperiment
        ? () => {
            activeArea = 2;
            moveToNextArea(0, -1);
            $nearVent = true;
          }
        : undefined}
      onmousedown={handleMouseDown}
    >
      <UnderwaterGradient
        animated={true}
        class="absolute size-full"
        --color-top="#011e36"
        --color-bottom="#06121c"
      />
    </Area>
    <Area
      active={activeArea === 2}
      onUp={() => {
        activeArea = 1;
        moveToNextArea(0, 1);
        $nearVent = false;
      }}
      onmousedown={handleMouseDown}
    >
      <UnderwaterGradient
        animated={true}
        class="absolute size-full"
        --color-top="#06121c"
        --color-bottom="#000000"
      />
      <InfoMarker
        onclick={() => {
          startDialog2 = true;
        }}
        class="absolute bottom-[22%] left-[48%] w-[55px] h-[55px] z-[2]"
      />
    </Area>
  {/snippet}
</Grid>
