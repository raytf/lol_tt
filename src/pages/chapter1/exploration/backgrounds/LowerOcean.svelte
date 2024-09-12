<script lang="ts">
  import { BgImg, TurbulentImg } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import underwater from "$assets/underwater_swirls.jpg";
  import relics2 from "$assets/relics/relics_2.svg";
  import relics3 from "$assets/relics/relics_3.svg";
</script>

<UnderwaterGradient
  class="absolute size-full"
  --color-top="#0271c2"
  --color-bottom="#182B3A"
/>
<!-- <TurbulentImg src={underwater} class="opacity-20" /> -->
<!-- <BgImg
  src={relics3}
  alt="relics-3"
  class="bottom-[-55%] right-[0%] w-[144%] z-[1]"
/> -->
<!-- <BgImg
  src={relics2}
  alt="relics-2"
  class="w-[100%] left-[-11%] bottom-[-44%] z-[11]"
/> -->
