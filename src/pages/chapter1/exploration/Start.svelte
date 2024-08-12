<script lang="ts">
  import { onMount } from "svelte";
  import { spring } from "svelte/motion";
  import { Area } from "$components/exploration";
  import Wrecks from "./areas/Wrecks.svelte";
  import Submarine from "$components/visual/Submarine.svelte";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

  let subDirection = $state(1);
  const defaultCoords = { x: 0, y: window.innerHeight / 2 };
  let subCoords = spring(
    { x: defaultCoords.x, y: defaultCoords.y },
    {
      stiffness: 0.01,
      damping: 0.8,
    },
  );

  function moveSub(x: number, y: number) {
    subCoords.set({ x: x, y: y });

    const dx = x - $subCoords.x;
    subDirection = dx <= 0 ? -1 : 1;
  }

  function handleMouseDown(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;
    moveSub(x, y);
  }

  onMount(() => {
    moveSub(window.innerWidth / 2, window.innerHeight / 2);
  });
</script>

<Area showInstruction={true} onmousedown={handleMouseDown}>
  <Submarine
    x={$subCoords.x}
    y={$subCoords.y}
    scaleX={subDirection}
    class="z-[1]"
  />

  <button
    onclick={() => gameApi.fadeScene("/ch1_story_shell-encounter")}
    class="absolute w-[222px] h-[88px] bottom-[14%] right-[21%] z-[1]"
  >
    <p class="text-2xl">Wrecks</p>
  </button>
  <Wrecks />
</Area>
