<script lang="ts">
  import { onMount } from "svelte";
  import { Area } from "$components/exploration";
  import Wrecks from "./areas/Wrecks.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  import { shellEncountered } from "../store";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

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
  });
</script>

<Area
  onRight={$shellEncountered
    ? () => {
        console.log("yee");
        // Go to Kelp exploration
      }
    : undefined}
  showInstruction={true}
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
