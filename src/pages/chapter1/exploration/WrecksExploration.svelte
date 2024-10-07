<script lang="ts">
  import { onMount } from "svelte";
  import { Grid, Area, TurbulentImg } from "$components/exploration";
  import Inventory, { ItemUnlockScreen, ItemCard } from "$components/inventory";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
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
  import { windowWidth, windowHeight } from "$lib/stores/game";
  import { shellEncountered } from "../store";
  import underwater from "$assets/underwater_surface.jpg";
  import { getGameApi } from "$apis/game.svelte";
  import { getInventoryApi } from "$apis/inventory.svelte";
  const gameApi = getGameApi();
  const inventoryApi = getInventoryApi();

  let initialSubCoords = {
    x: $windowWidth / 2,
    y: 0,
  };
  if ($shellEncountered) {
    initialSubCoords = {
      x: $windowWidth / 2 + 88,
      y: $windowHeight - 88,
    };
  }

  let activeArea = $state(0);
  if (!$shellEncountered) {
    setSubPosition(initialSubCoords);
  }
  onMount(() => {
    setSubTarget({
      x: $windowWidth / 2 - $xOffset,
      y: $windowHeight / 2 - $yOffset,
    });

    if ($shellEncountered) {
      activeArea = 1;
      if (!inventoryApi.isItemUnlocked("sm")) unlockSM = true;
    }
    inventoryApi.currentHintKey = "hint_1";
  });

  let unlockSM = $state(false);
  let unlockShell = $state(false);
</script>

<Inventory />
<Grid
  xOffset={$xOffset}
  yOffset={$yOffset}
  class="grid-cols-1 grid-rows-3 w-full h-[300%]"
>
  <TurbulentImg src={underwater} class="opacity-20 z-[1]" />

  <Submarine class="z-10" />
  {#snippet areas()}
    <Area
      active={activeArea === 0}
      onDown={() => {
        activeArea = 1;
        moveScreen(0, -1);
      }}
      showInstruction={true}
      onmousedown={moveSub}
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#03E5B7"
        --color-bottom="#00C1EF"
      />
    </Area>
    <Area
      active={activeArea === 1}
      onUp={() => {
        activeArea = 0;
        moveScreen(0, 1);
      }}
      onDown={() => {
        activeArea = 2;
        moveScreen(0, -1);
      }}
      onmousedown={moveSub}
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#00C1EF"
        --color-bottom="#037ADE"
      />
    </Area>
    <Area
      active={activeArea === 2}
      onUp={() => {
        activeArea = 1;
        moveScreen(0, 1);
      }}
      onmousedown={moveSub}
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#037ADE"
        --color-bottom="#182B3A"
      />
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
