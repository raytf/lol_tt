<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { Grid, Area, BgImg } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
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

  function moveToNextArea(xDirection, yDirection) {
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

<Grid xOffset={$xOffset} yOffset={$yOffset} class="grid-cols-1 w-full h-[200%]">
  <Submarine
    targetPosition={subCoords}
    x={subCoords.x}
    y={subCoords.y}
    class="z-10"
  />
  <BgImg
    src={kelp}
    class="absolute top-0 right-0 h-full pointer-events-none z-[1]"
  />
  {#snippet areas()}
    <Area
      active={activeArea === 0}
      onmousedown={handleMouseDown}
      onDown={() => {
        activeArea = 1;
        moveToNextArea(0, -1);
      }}
      class=""
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#03E5B7"
        --color-bottom="#037ADE"
      />
    </Area>
    <Area
      active={activeArea === 1}
      onmousedown={handleMouseDown}
      onUp={() => {
        activeArea = 0;
        moveToNextArea(0, 1);
      }}
      class=""
    >
      <UnderwaterGradient
        class="absolute size-full z-[-1]"
        --color-top="#037ADE"
        --color-bottom="#182b3a"
      />
    </Area>
  {/snippet}
</Grid>
