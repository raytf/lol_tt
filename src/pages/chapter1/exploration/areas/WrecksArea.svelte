<script lang="ts">
  import type { Snippet } from "svelte";
  import { Area, BgImg, TurbulentImg } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import relics2 from "$assets/relics/relics_2.svg";
  import relics3 from "$assets/relics/relics_3.svg";
  import underwater from "$assets/underwater_surface.jpg";

  let {
    active,
    showInstruction = false,
    onmousedown,
    children,
    ...props
  }: {
    active?: boolean;
    showInstruction?: boolean;
    onmousedown?: (event: MouseEvent) => void;
    children?: Snippet;
  } = $props();
</script>

<Area {...props}>
  <BgImg
    src={relics3}
    alt="relics-3"
    class="bottom-[-5%] right-[-11%] w-[144%] z-[1]"
  />
  <BgImg src={relics2} alt="relics-2" class="bottom-[-15%] z-[11]" />

  {#if children}
    {@render children()}
  {/if}
</Area>
