<script lang="ts">
  import { Tween, Spring } from "svelte/motion";
  import { TurbulentImg } from "$components/ui/img";
  import kelp_monster from "$assets/characters/otter/kelp_monster.png";
  import otter from "$assets/characters/otter/otter.png";
  import { cn } from "$lib/utils";

  let { coords = { x: 0, y: 0 }, direction = 1, class: extraClass } = $props();
</script>

<div
  class={cn("absolute pointer-events-none blur-[1px]", extraClass)}
  style="transform: translate({coords.x}px, {coords.y}px);"
>
  <!-- <img
    src={otter}
    class="absolute !-top-[11%] !-left-[22%] z-[1] h-[111px] w-[111px]"
    style="scale: {direction} 1"
  /> -->
  <TurbulentImg
    src={kelp_monster}
    duration={11}
    scale={11}
    class="!-top-[33%] !-left-[33%]"
    style="scale: {direction} 1"
  />
</div>
