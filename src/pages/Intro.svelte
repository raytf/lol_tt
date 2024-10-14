<script>
  import { gsap } from "gsap";
  import { TextOverlay } from "$lib/components/text";
  import TurbulentImg from "$components/exploration/TurbulentImg.svelte";
  import ocean from "$assets/prologue/tritons-triangle.jpg";
</script>

<div class="size-full">
  <TurbulentImg
    src={ocean}
    duration={22}
    minFrequency={[0.01, 0.01]}
    maxFrequency={[0.02, 0.02]}
    class="w-full h-full object-cover"
  />
  <div class="absolute size-full bg-black opacity-50"></div>
  <TextOverlay
    keys={["intro_1-1", "intro_1-2", "intro_1-3", "intro_1-4", "intro_1-5"]}
  />
</div>

<style>
</style>
