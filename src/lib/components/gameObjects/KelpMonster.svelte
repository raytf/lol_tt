<script lang="ts">
  import { Tween, Spring } from "svelte/motion";
  import { TurbulentImg } from "$components/ui/img";
  import kelp_monster from "$assets/characters/otter/kelp_monster.png";
  import { coords as subCoords } from "$stores/sub";

  let { coords = { x: 0, y: 0 }, direction = 1, class: extraClass } = $props();
</script>

<div
  class="absolute pointer-events-none {extraClass} blur-[5px]"
  style="transform: translate({coords.x}px, {coords.y}px);"
>
  <TurbulentImg
    src={kelp_monster}
    duration={11}
    scale={11}
    class="!-top-[33%] !-left-[33%]"
    style="scale: {direction} 1"
  />
</div>
