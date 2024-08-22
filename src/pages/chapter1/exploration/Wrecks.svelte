<script lang="ts">
  import { onMount } from "svelte";
  import BackupInit from "$lib/components/BackupInit.svelte";
  import { Area } from "$components/exploration";
  import Inventory from "$components/inventory";
  import { ItemUnlockScreen, ItemCard } from "$components/inventory";
  import Wrecks from "./areas/Wrecks.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  import { InfoMarker } from "$components/ui/buttons";
  import { shellEncountered } from "../store";
  import { getGameApi } from "$apis/game.svelte";
  import { getInventoryApi } from "$apis/inventory.svelte";
  const gameApi = getGameApi();
  const inventoryApi = getInventoryApi();

  const width = 1024;
  const height = 576;

  let initialSubCoords = { x: 0, y: height / 2 };
  if ($shellEncountered) {
    initialSubCoords = {
      x: width / 2 + 88,
      y: height - 88,
    };
  }
  let subCoords = $state(initialSubCoords);

  function handleMouseDown(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;
    subCoords = { x: x, y: y };
  }
  onMount(() => {
    subCoords = { x: width / 2, y: height / 2 };
    if ($shellEncountered) {
      if (!inventoryApi.isItemUnlocked("sm")) unlockSM = true;
    }
    inventoryApi.currentHintKey = "hint_1";
  });

  let unlockSM = $state(false);
  let unlockShell = $state(false);
</script>

<BackupInit />
<Inventory />
<Area
  onRight={$shellEncountered
    ? () => {
        gameApi.fadeScene("/ch2");
      }
    : undefined}
  showInstruction={!$shellEncountered}
  onmousedown={handleMouseDown}
>
  <Submarine targetPosition={subCoords} class="z-10" />
  <Wrecks />
  {#if !$shellEncountered}
    <InfoMarker
      onclick={() => gameApi.fadeScene("/ch1_encounter_shell")}
      class="absolute w-[55px] h-[55px] bottom-[15%] right-[30%] z-20"
    />
  {/if}
</Area>

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
