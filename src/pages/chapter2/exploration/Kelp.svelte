<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { BgImg, TurbulentImg } from "$lib/components/ui/img";
  import { Grid, Area } from "$components/explorationOld";
  import { InfoMarker } from "$lib/components/ui/button";
  import type { DialogKey } from "$components/hud/dialog";
  import { Dialog, QuestionDialog } from "$components/hud/dialog";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import { Submarine } from "$components/gameObjects";
  import { setTarget as setSubTarget } from "$stores/sub";
  import MeasuringLine from "$components/visual/MeasuringLine.svelte";
  import Otter from "$components/visual/Otter.svelte";
  import relics2 from "$assets/relics/relics_2.svg";
  import kelp from "$assets/chapter1/kelp.png";
  import underwater from "$assets/underwater_surface.jpg";
  // Dialog
  import {
    dialogOption1,
    dialogOption2,
    dialogOption3,
    dialogIntro,
    dialogColor1,
    dialogColor2,
    dialogKelp1,
    dialogKelp2,
  } from "./dialogue";
  // Stores
  import { otterEncountered } from "../store";
  import { inventoryApi, gameApi } from "$apis";

  const xOffset = tweened(0, {
    duration: 500,
  });
  const yOffset = tweened(0, {
    duration: 500,
  });

  let initialSubCoords = { x: 0, y: height / 2 };
  if ($otterEncountered) {
    initialSubCoords = {
      x: width / 2 + 222,
      y: height / 2,
    };
  }
  let subCoords = $state(initialSubCoords);

  let otterCoords = $derived.by(() => {
    if ($otterEncountered) {
      if (goTooDeep) {
        return { x: width / 2, y: height * 1.5 };
      }
      return { x: subCoords.x + 22, y: subCoords.y };
    }
    return { x: width + 88, y: height / 2 };
  });

  let activeArea = $state(0);

  function handleMouseDown(event: MouseEvent) {
    const x = event.clientX - $xOffset;
    const y = event.clientY - $yOffset;
    setSubTarget({ x, y });
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
    subCoords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    $inventoryApi.currentHintKey = "hint_2";
    if (!$otterEncountered) {
      revealQuestion = true;
    }
  });

  let revealQuestion = $state(false);
  let dialogKeys = $state<DialogKey[]>([]);
  let onDialogFinish: () => void;

  let clickedInfoColor1 = $state(false);
  let clickedInfoColor2 = $state(false);
  let clickedInfoKelp = $state(false);

  let goTooDeep = $state(false);
</script>

<!-- <QuestionDialog
  reveal={revealQuestion}
  questionKey="ch2-question"
  option1Key="ch2-question_option-1"
  option1DialogKeys={dialogOption1}
  onFinish1={() => $gameApi.fadeScene("/ch1_exploration_wrecks")}
  option2Key="ch2-question_option-2"
  option2DialogKeys={dialogOption2}
  onFinish2={() => $gameApi.fadeScene("/ch1_exploration_wrecks")}
  option3Correct={true}
  option3Key="ch2-question_option-3"
  option3DialogKeys={dialogOption3}
  onFinish3={() => {
    revealQuestion = false;
  }}
/> -->

<Dialog
  keys={dialogKeys}
  onFinished={() => {
    dialogKeys = [];
    if (onDialogFinish) {
      onDialogFinish();
      onDialogFinish = () => {};
    }
  }}
/>

<Grid xOffset={$xOffset} yOffset={$yOffset} class="grid-cols-1 w-full h-[300%]">
  <Submarine class="z-[21]" />
  <Otter targetPosition={otterCoords} class="z-[22]" />
  <BgImg
    src={kelp}
    class="absolute top-0 right-[-11%] h-2/3 pointer-events-none z-[1]"
  />
  <MeasuringLine
    height={1111}
    reveal={clickedInfoKelp}
    values={[0, 50, 100, 150, 200]}
  />
  {#snippet areas()}
    <Area
      active={activeArea === 0}
      onDown={$otterEncountered
        ? () => {
            activeArea = 1;
            moveToNextArea(0, -1);
          }
        : undefined}
      onmousedown={handleMouseDown}
      showInstruction={false}
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#03E5B7"
        --color-bottom="#08C8F6"
      />
      <TurbulentImg src={underwater} class="absolute size-full opacity-10" />
      {#if !$otterEncountered}
        <InfoMarker
          onclick={() => {
            dialogKeys = dialogIntro;
            onDialogFinish = () => {
              $otterEncountered = true;
              $gameApi.fadeScene("/ch2_encounter_otter");
            };
          }}
          class="absolute w-[55px] h-[55px] top-[200px] right-[111px] z-20"
        />
      {/if}
      <div class="absolute size-full top-0 z-[1] pointer-events-none">
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
      onDown={clickedInfoColor1 && clickedInfoKelp
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
        --color-top="#07BBE5"
        --color-bottom="#037ade"
      />
      <InfoMarker
        onclick={() => {
          dialogKeys = dialogColor1;
          clickedInfoColor1 = true;
        }}
        class="{clickedInfoColor1
          ? 'opacity-50'
          : ''} absolute w-[55px] h-[55px] top-[33%] right-[44%] z-20"
      />
      <InfoMarker
        onclick={() => {
          dialogKeys = dialogKelp1;

          onDialogFinish = () => {
            clickedInfoKelp = true;
            dialogKeys = dialogKelp2;
            setTimeout(() => {
              activeArea = 0;
              moveToNextArea(0, 1);
            }, 1000);
          };
        }}
        class="{clickedInfoKelp
          ? 'opacity-50'
          : ''} absolute w-[55px] h-[55px] bottom-[11%] right-[5%] z-20"
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
        if (clickedInfoColor2) {
          $gameApi.fadeScene("/ch3");
          return;
        }
        activeArea = 1;
        moveToNextArea(0, 1);
        goTooDeep = false;
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
          clickedInfoColor2 = true;
          dialogKeys = dialogColor2;
        }}
        class="{clickedInfoColor2
          ? 'opacity-50'
          : ''} absolute w-[55px] h-[55px] top-[55%] right-[44%] z-20"
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
