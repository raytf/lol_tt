<script lang="ts">
  import { spring } from "svelte/motion";
  import { Grid, Area } from "$components/exploration";
  import { Submarine } from "$components/gameObjects";
  import { windowWidth, windowHeight } from "$stores/game";
  import { setTarget as setSubTarget } from "$stores/sub";

  const gridWidth = $windowWidth * 2;
  const gridHeight = $windowHeight * 3;
  const gridOffset = spring({ x: 0, y: 0 }, { stiffness: 0.01, damping: 0.8 });

  const minYOffset = -gridHeight + $windowHeight;
  const minXOffset = -gridWidth + $windowWidth;
  function moveSub(e: MouseEvent) {
    //console.log(e.clientX, e.clientY);
    const currentOffset = $gridOffset;

    const halfHeight = $windowHeight / 2;
    const halfWidth = $windowWidth / 2;
    const halfHeightDiff = e.clientY - halfHeight;
    const halfWidthDiff = e.clientX - halfWidth;
    let newXOffset = currentOffset.x - halfWidthDiff;
    let newYOffset = currentOffset.y - halfHeightDiff;
    if (newXOffset > 0) newXOffset = 0;
    if (newXOffset < minXOffset) newXOffset = minXOffset;
    if (newYOffset > 0) newYOffset = 0;
    if (newYOffset < minYOffset) newYOffset = minYOffset;
    const newOffset = { x: newXOffset, y: newYOffset };

    gridOffset.set(newOffset);
    const x = e.clientX - $gridOffset.x;
    const y = e.clientY - $gridOffset.y;
    setSubTarget({ x, y });
  }
</script>

<Grid
  size={[gridWidth, gridHeight]}
  xOffset={$gridOffset.x}
  yOffset={$gridOffset.y}
  class="bg-blue-800"
>
  <Submarine class="z-10" />
  {#snippet areas()}
    <Area
      size={[gridWidth, $windowHeight]}
      onmousedown={moveSub}
      class="flex flex-row"
    >
      <div class="bg-blue-200 h-full w-1/2"></div>
    </Area>
    <Area size={[gridWidth, $windowHeight]} onmousedown={moveSub}>
      <div class="bg-red-200 size-full"></div>
    </Area>
    <Area size={[gridWidth, $windowHeight]} onmousedown={moveSub}>
      <div class="bg-green-200 size-full"></div>
    </Area>
  {/snippet}
</Grid>
