<script lang="ts">
  import type { Snippet } from "svelte";
  import { BgImg, TurbulentImg } from "$components/ui/img";
  import { Area } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import relics2 from "$assets/relics/relics_2.svg";
  import relics3 from "$assets/relics/relics_3.svg";
  import underwater from "$assets/underwater_surface.jpg";
</script>

<div class="absolute size-full">
  <div class="absolute h-full w-[88%] overflow-hidden">
    <BgImg
      src={relics2}
      alt="relics-2"
      class="w-[155%] left-[-25%] bottom-[-22%] z-[11]"
    />
  </div>
  <BgImg
    src={relics3}
    alt="relics-3"
    class="bottom-[-22%] left-[-66%] w-[333%] blur-[2px] z-[1]"
  />
  <BgImg
    src={relics2}
    alt="relics-2"
    class="w-[111%] left-[88%] bottom-[-68%] z-[11]"
  />
  <!-- <BgImg src={relics2} alt="relics-2" class="w-[111%] z-[11]" /> -->
</div>
