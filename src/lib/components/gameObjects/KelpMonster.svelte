<script lang="ts">
  import { spring } from "svelte/motion";
  import { TurbulentImg } from "$components/ui/img";
  import kelp_monster from "$assets/characters/otter/kelp_monster.png";
  import { coords as subCoords } from "$stores/sub";

  let { startCoords = { x: 0, y: 0 }, class: extraClass } = $props();

  const coords = spring(
    { x: startCoords.x, y: startCoords.y },
    { stiffness: 0.005, damping: 0.4 },
  );
  let direction = $state(1);
  subCoords.subscribe(({ x, y }) => {
    const deltaX = x - $coords.x;
    if (deltaX > 333) {
      direction = -1;
    }
    if (deltaX < 0) {
      direction = 1;
    }

    const newX = x - 111;
    const newY = y - 222;
    if (newY < 1200) {
      coords.set({ x: x - 111, y: y - 222 });
    } else {
      coords.update((prev) => {
        return { x: x - 111, y: prev.y };
      });
    }
  });
</script>

<div
  class="absolute pointer-events-none {extraClass} blur-[5px]"
  style="transform: translate({$coords.x}px, {$coords.y}px);"
>
  <TurbulentImg
    src={kelp_monster}
    duration={11}
    scale={11}
    style="scale: {direction} 1"
  />
</div>
