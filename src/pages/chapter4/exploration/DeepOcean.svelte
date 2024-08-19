<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import BackupInit from "$lib/components/BackupInit.svelte";
  import { Grid, Area, BgImg } from "$components/exploration";
  import Inventory from "$components/inventory";
  import type { DialogKey } from "$components/dialog";
  import { Dialog, QuestionDialog } from "$components/dialog";
  import { GaugeScreen } from "$components/inventory";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  // Dialog

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
    inventoryApi.currentHintIndex = 4;
    inventoryApi.showGaugeScreen = true;
  });
</script>

<BackupInit inventory={true} />
<Inventory />
<GaugeScreen />
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
