<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import BackupInit from "$lib/components/BackupInit.svelte";
  import { Grid, Area, BgImg } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  import relics2 from "$assets/relics/relics_2.svg";
  import kelp from "$assets/chapter1/kelp.png";

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
</script>

<BackupInit inventory={true} />
<Grid xOffset={$xOffset} yOffset={$yOffset} class="grid-cols-1 w-full h-[300%]">
  <Submarine
    targetPosition={subCoords}
    x={subCoords.x}
    y={subCoords.y}
    class="z-10"
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
      <div class="absolute size-full z-[1] pointer-events-none">
        <div class="absolute w-1/2 h-full left-0 overflow-clip">
          <BgImg src={relics2} class="bottom-[-42%] w-[200%] z-[2]" />
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
