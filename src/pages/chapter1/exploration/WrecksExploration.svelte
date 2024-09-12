<script lang="ts">
  import { onMount } from "svelte";
  import { Grid, Area } from "$components/exploration";
  import Inventory from "$components/inventory";
  import { ItemUnlockScreen, ItemCard } from "$components/inventory";
  import { UpperOcean, LowerOcean, Shipwreck } from "./backgrounds";
  import Submarine from "$components/visual/Submarine.svelte";
  import { InfoMarker } from "$components/ui/buttons";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
  } from "$lib/stores/sub";
  import {
    xOffset,
    yOffset,
    moveScreen,
    moveSub,
  } from "$lib/stores/exploration";
  import { shellEncountered } from "../store";
  import { getGameApi } from "$apis/game.svelte";
  import { getInventoryApi } from "$apis/inventory.svelte";
  const gameApi = getGameApi();
  const inventoryApi = getInventoryApi();

  let initialSubCoords = {
    x: window.innerWidth / 2,
    y: 0,
  };
  if ($shellEncountered) {
    initialSubCoords = {
      x: window.innerWidth / 2 + 88,
      y: window.innerHeight - 88,
    };
  }

  setSubPosition(initialSubCoords);
  onMount(() => {
    // moveScreen(-1, -1);
    // activeArea = 3;
    setSubTarget({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    if ($shellEncountered) {
      if (!inventoryApi.isItemUnlocked("sm")) unlockSM = true;
    }
    inventoryApi.currentHintKey = "hint_1";
  });
  let activeArea = $state(0);

  let unlockSM = $state(false);
  let unlockShell = $state(false);
</script>

<Inventory />
<Grid
  xOffset={$xOffset}
  yOffset={$yOffset}
  class="grid-cols-2 grid-rows-2 w-[200%] h-[200%]"
>
  <div class="absolute top-0 w-full h-1/2">
    <UpperOcean />
  </div>
  <div class="absolute top-1/2 w-full h-1/2">
    <LowerOcean />
  </div>
  <Submarine class="z-10" />
  {#snippet areas()}
    <Area
      active={activeArea === 0}
      onRight={() => {
        activeArea = 1;
        moveScreen(-1, 0);
      }}
      onDown={() => {
        activeArea = 2;
        moveScreen(0, -1);
      }}
      showInstruction={true}
      onmousedown={moveSub}
    ></Area>
    <Area
      active={activeArea === 1}
      onLeft={() => {
        activeArea = 0;
        moveScreen(1, 0);
      }}
      onDown={() => {
        activeArea = 3;
        moveScreen(0, -1);
      }}
      showInstruction={false}
      onmousedown={moveSub}
    ></Area>
    <Area
      active={activeArea === 2}
      onRight={() => {
        activeArea = 3;
        moveScreen(-1, 0);
      }}
      onUp={() => {
        activeArea = 0;
        moveScreen(0, 1);
      }}
      onmousedown={moveSub}
    ></Area>
    <Area
      active={activeArea === 3}
      onLeft={() => {
        activeArea = 2;
        moveScreen(1, 0);
      }}
      onUp={() => {
        activeArea = 1;
        moveScreen(0, 1);
      }}
      onmousedown={moveSub}
    >
      <Shipwreck />
      {#if !$shellEncountered}
        <InfoMarker
          onclick={() => gameApi.fadeScene("/ch1_encounter_shell")}
          class="absolute w-[55px] h-[55px] bottom-[22%] right-[25%] z-20"
        />
      {/if}
    </Area>
  {/snippet}
</Grid>

<ItemUnlockScreen
  reveal={unlockSM}
  onclick={() => {
    inventoryApi.unlockItem("sm");
    unlockSM = false;
    unlockShell = true;
  }}
>
  <ItemCard id="sm" />
</ItemUnlockScreen>

<ItemUnlockScreen
  reveal={unlockShell}
  onclick={() => {
    inventoryApi.unlockItem("conch");
    unlockShell = false;
    inventoryApi.unlocked = true;
    inventoryApi.showHintDialog = true;
  }}
>
  <ItemCard id="conch" />
</ItemUnlockScreen>
