<script lang="ts">
  import { onMount } from "svelte";
  import LanguageLoader from "$components/LanguageLoader.svelte";
  import { Area } from "$components/exploration";
  import { ItemUnlockScreen, ItemCard } from "$components/inventory";
  import Wrecks from "./areas/Wrecks.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  import { shellEncountered } from "../store";
  import { getGameApi } from "$apis/game.svelte";
  import { getInventoryApi, itemMap } from "$apis/inventory.svelte";
  const gameApi = getGameApi();
  const inventoryApi = getInventoryApi();

  let initialSubCoords = { x: 0, y: window.innerHeight / 2 };
  if ($shellEncountered) {
    initialSubCoords = {
      x: window.innerWidth / 2 + 88,
      y: window.innerHeight - 88,
    };
  }
  let subCoords = $state(initialSubCoords);

  function handleMouseDown(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;
    subCoords = { x: x, y: y };
  }
  onMount(() => {
    subCoords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    unlockShell = true;
    if ($shellEncountered) {
      unlockShell = true;
    }
  });

  let unlockShell = $state(false);
  let unlockSM = $state(false);
</script>

<LanguageLoader />
<Area
  onRight={$shellEncountered
    ? () => {
        gameApi.fadeScene("/ch1_exploration_kelp");
      }
    : undefined}
  showInstruction={!$shellEncountered}
  onmousedown={handleMouseDown}
>
  <Submarine
    targetPosition={subCoords}
    x={subCoords.x}
    y={subCoords.y}
    class="z-10"
  />
  <Wrecks />
  {#if !$shellEncountered}
    <button
      onclick={() => gameApi.fadeScene("/ch1_story_shell-encounter")}
      class="absolute w-[222px] h-[88px] bottom-[11%] right-[21%] z-20"
    >
      <p class="text-2xl">Wrecks</p>
    </button>
  {/if}
</Area>

<ItemUnlockScreen
  reveal={unlockShell}
  onclick={() => {
    inventoryApi.unlockItem("conch");
    unlockShell = false;
    unlockSM = true;
  }}
>
  <ItemCard
    imgSrc={itemMap["conch"].imgSrc}
    nameKey={itemMap["conch"].nameKey}
    descKey={itemMap["conch"].descKey}
    actionKey={itemMap["conch"].actionKey}
  />
</ItemUnlockScreen>

<ItemUnlockScreen
  reveal={unlockSM}
  onclick={() => {
    inventoryApi.unlockItem("sm");
    unlockSM = false;
    inventoryApi.unlocked = true;
  }}
>
  <ItemCard
    imgSrc={itemMap["sm"].imgSrc}
    nameKey={itemMap["sm"].nameKey}
    descKey={itemMap["sm"].descKey}
    actionKey={itemMap["sm"].actionKey}
  />
</ItemUnlockScreen>
