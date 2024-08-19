<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import BackupInit from "$lib/components/BackupInit.svelte";
  import { Grid, Area, BgImg } from "$components/exploration";
  import Inventory from "$components/inventory";
  import { InfoMarker } from "$components/ui/buttons";
  import type { DialogKey } from "$components/dialog";
  import { Dialog, QuestionDialog } from "$components/dialog";
  import { ItemUnlockScreen, ItemCard } from "$components/inventory";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  import MeasuringLine from "$components/visual/MeasuringLine.svelte";
  import Otter from "$components/visual/Otter.svelte";
  import relics2 from "$assets/relics/relics_2.svg";
  import kelp from "$assets/chapter1/kelp.png";
  // Dialog
  import {
    dialog1,
    dialogQuestionSqOption1,
    dialogQuestionSqOption2,
    dialogQuestionSqOption3,
    dialogQuestionHypOption1,
    dialogQuestionHypOption2,
    dialogQuestionHypOption3,
    dialogVars,
    dialogQuestionVarIOption1,
    dialogQuestionVarIOption2,
    dialogQuestionVarIOption3,
    dialogQuestionVarDOption1,
    dialogQuestionVarDOption2,
    dialogQuestionVarDOption3,
    dialogDepth,
    dialogPressure,
    dialogProcedure,
  } from "./dialogue";
  // Stores
  // Apis
  import { getGameApi } from "$apis/game.svelte";
  import { getInventoryApi, itemMap } from "$apis/inventory.svelte";
  const gameApi = getGameApi();
  const inventoryApi = getInventoryApi();

  const xOffset = tweened(0, {
    duration: 500,
  });
  const yOffset = tweened(-window.innerHeight, {
    duration: 500,
  });

  let initialSubCoords = {
    x: window.innerWidth / 2,
    y: window.innerHeight * 2.2,
  };
  let subCoords = $state(initialSubCoords);

  let otterCoords = $derived.by(() => {
    if (goTooDeep) {
      return { x: window.innerWidth / 2, y: window.innerHeight * 1.5 };
    }
    return { x: subCoords.x + 22, y: subCoords.y };
  });

  let activeArea = $state(1);

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
    subCoords = { x: window.innerWidth / 2, y: window.innerHeight * 1.5 };
    inventoryApi.currentHintIndex = 3;
    goTooDeep = false;
  });

  let revealQuestionSQ = $state(false);
  let revealQuestionHyp = $state(false);
  let revealQuestionVarI = $state(false);
  let revealQuestionVarD = $state(false);

  let dialogKeys = $state<DialogKey[]>([]);
  let onDialogFinish: () => void;

  let goTooDeep = $state(true);

  let startPlanning = $state(false);
  let startExploration = $state(false);
  let depthReady = $state(false);
  let pressureReady = $state(false);
  let revealPg = $state(false);
</script>

<BackupInit inventory={true} />
<Inventory />

<QuestionDialog
  reveal={revealQuestionSQ}
  questionKey="ch3-question_sq"
  option1Key="ch3-question_sq_option-1"
  option1DialogKeys={dialogQuestionSqOption1}
  onFinish1={() => {
    revealQuestionSQ = false;
  }}
  option2Correct={true}
  option2Key="ch3-question_sq_option-2"
  option2DialogKeys={dialogQuestionSqOption2}
  onFinish2={() => {
    revealQuestionSQ = false;
    revealQuestionHyp = true;
  }}
  option3Key="ch3-question_sq_option-3"
  option3DialogKeys={dialogQuestionSqOption3}
  onFinish3={() => {
    revealQuestionSQ = false;
  }}
/>
<QuestionDialog
  reveal={revealQuestionHyp}
  questionKey="ch3-question_hyp"
  option1Correct={true}
  option1Key="ch3-question_hyp_option-1"
  option1DialogKeys={dialogQuestionHypOption1}
  onFinish1={() => {
    revealQuestionHyp = false;
    startPlanning = true;
    dialogKeys = dialogVars;
    onDialogFinish = () => {
      revealQuestionVarI = true;
    };
  }}
  option2Key="ch3-question_hyp_option-2"
  option2DialogKeys={dialogQuestionHypOption2}
  onFinish2={() => {
    revealQuestionHyp = false;
  }}
  option3Key="ch3-question_hyp_option-3"
  option3DialogKeys={dialogQuestionHypOption3}
  onFinish3={() => {
    revealQuestionHyp = false;
  }}
/>
<QuestionDialog
  reveal={revealQuestionVarI}
  questionKey="ch3-question_var-i"
  option1Key="ch3-question_var-i_option-1"
  option1DialogKeys={dialogQuestionVarIOption1}
  onFinish1={() => {
    revealQuestionVarI = false;
    dialogKeys = dialogVars;
    onDialogFinish = () => {
      revealQuestionVarI = true;
    };
  }}
  option2Correct={true}
  option2Key="ch3-question_var-i_option-2"
  option2DialogKeys={dialogQuestionVarIOption2}
  onFinish2={() => {
    revealQuestionVarI = false;
    revealQuestionVarD = true;
  }}
  option3Key="ch3-question_var-i_option-3"
  option3DialogKeys={dialogQuestionVarIOption3}
  onFinish3={() => {
    revealQuestionVarI = false;
    dialogKeys = dialogVars;
    onDialogFinish = () => {
      revealQuestionVarI = true;
    };
  }}
/>
<QuestionDialog
  reveal={revealQuestionVarD}
  questionKey="ch3-question_var-d"
  option1Correct={true}
  option1Key="ch3-question_var-d_option-1"
  option1DialogKeys={dialogQuestionVarDOption1}
  onFinish1={() => {
    revealQuestionVarD = false;
    startExploration = true;
  }}
  option2Key="ch3-question_var-d_option-2"
  option2DialogKeys={dialogQuestionVarDOption2}
  onFinish2={() => {
    revealQuestionVarD = false;
    dialogKeys = dialogVars;
    onDialogFinish = () => {
      revealQuestionVarI = true;
    };
  }}
  option3Key="ch3-question_var-d_option-3"
  option3DialogKeys={dialogQuestionVarDOption3}
  onFinish3={() => {
    revealQuestionVarD = false;
    dialogKeys = dialogVars;
    onDialogFinish = () => {
      revealQuestionVarI = true;
    };
  }}
/>

<Dialog
  once={false}
  keys={dialogKeys}
  onFinished={() => {
    dialogKeys = [];
    if (onDialogFinish) {
      onDialogFinish();
      onDialogFinish = () => {};
    }
  }}
/>

<ItemUnlockScreen
  reveal={revealPg}
  onclick={() => {
    inventoryApi.unlockItem("pg");
    revealPg = false;
    dialogKeys = dialogProcedure;
    onDialogFinish = () => {
      gameApi.fadeScene("/ch3_experiment");
    };
  }}
>
  <ItemCard id="pg" />
</ItemUnlockScreen>

<Grid xOffset={$xOffset} yOffset={$yOffset} class="grid-cols-1 w-full h-[300%]">
  <Submarine targetPosition={subCoords} class="z-[21]">
    {#if depthReady}
      <InfoMarker
        onclick={() => {
          dialogKeys = dialogPressure;
          pressureReady = true;
          onDialogFinish = () => {
            revealPg = true;
          };
        }}
        class="{pressureReady
          ? 'opacity-50'
          : ''} w-[44px] h-[44px] absolute top-[-44px] left-[-22px] pointer-events-auto"
      />
    {/if}
  </Submarine>
  <Otter targetPosition={otterCoords} class="z-[22]">
    {#if !startPlanning}
      <InfoMarker
        onclick={() => {
          dialogKeys = dialog1;
          onDialogFinish = () => {
            revealQuestionSQ = true;
          };
        }}
        class="w-[44px] h-[44px] absolute bottom-8 left-2 pointer-events-auto"
      />
    {/if}
  </Otter>
  <BgImg
    src={kelp}
    class="absolute top-0 right-[-11%] h-2/3 pointer-events-none z-[1]"
  />
  <MeasuringLine
    reveal={depthReady}
    height={1111}
    values={[200, 150, 100, 50, 0]}
  />
  <MeasuringLine
    reveal={!depthReady}
    height={1111}
    values={[0, 50, 100, 150, 200]}
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
        class="absolute size-full"
        --color-top="#03E5B7"
        --color-bottom="#08C8F6"
      />
      {#if startExploration}
        <InfoMarker
          onclick={() => {
            dialogKeys = dialogDepth;
            onDialogFinish = () => {
              depthReady = true;
            };
          }}
          class="{depthReady
            ? 'opacity-50'
            : ''} absolute w-[55px] h-[55px] top-[11px] right-[222px] z-20"
        />
      {/if}
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
      onDown={undefined}
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
      onDown={undefined}
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
