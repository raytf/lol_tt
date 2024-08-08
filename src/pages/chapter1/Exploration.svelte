<script lang="ts">
  import { spring } from "svelte/motion";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";

  let subDirection = $state(1);
  let subCoords = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.01,
      damping: 0.8,
    },
  );

  function handleMouseDown(event: MouseEvent) {
    subCoords.set({ x: event.clientX, y: event.clientY });

    const dx = event.clientX - $subCoords.x;
    subDirection = dx <= 0 ? 1 : -1;
  }
</script>

<div
  class="relative size-full"
  onmousedown={handleMouseDown}
  role="button"
  tabindex="0"
>
  <UnderwaterGradient class="absolute size-full z-[-1]" />

  <Submarine
    scaleX={subDirection}
    style="transform: translate({$subCoords.x}px, {$subCoords.y}px)"
  />
</div>
