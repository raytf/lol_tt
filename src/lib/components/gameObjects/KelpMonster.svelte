<script lang="ts">
  import { TurbulentImg } from "$components/ui/img";
  import kelp_monster from "$assets/characters/otter/kelp_monster.png";

  let { class: extraClass, coords = { x: 0, y: 0 } } = $props();
</script>

<div
  class="absolute pointer-events-none {extraClass} blur-[2px]"
  style="transform: translate({coords.x}px, {coords.y}px);"
>
  <TurbulentImg src={kelp_monster} duration={11} scale={11} />
</div>
