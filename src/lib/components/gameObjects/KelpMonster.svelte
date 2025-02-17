<script lang="ts">
  import { Tween, Spring } from "svelte/motion";
  import { TurbulentImg } from "$components/ui/img";
  import kelp_monster from "$assets/characters/otter/kelp_monster.png";
  import { coords as subCoords } from "$stores/sub";

  let { startCoords = { x: 0, y: 0 }, activate, class: extraClass } = $props();

  const coords = new Spring(
    { x: startCoords.x, y: startCoords.y },
    { stiffness: 0.005, damping: 0.4 },
  );
  let direction = $state(1);

  $effect(() => {
    if (!activate) return;
    const x = subCoords.current.x;
    const y = subCoords.current.y;
    const deltaX = x - coords.current.x;
    if (deltaX > 100) {
      direction = -1;
    }
    if (deltaX < 0) {
      direction = 1;
    }

    const newX = x - 111;
    const newY = y - 222;
    if (newY < 1200) {
      coords.set({ x: x, y: y });
    } else {
      coords.set({ x: x, y: coords.current.y });
    }
  });
</script>

<div
  class="absolute pointer-events-none {extraClass} blur-[5px]"
  style="transform: translate({coords.current.x}px, {coords.current.y}px);"
>
  <TurbulentImg
    src={kelp_monster}
    duration={11}
    scale={11}
    class="!-top-[33%] !-left-[33%]"
    style="scale: {direction} 1"
  />
</div>
