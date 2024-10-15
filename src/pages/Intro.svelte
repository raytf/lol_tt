<script>
  import { gsap } from "gsap";
  import { TextOverlay } from "$lib/components/text";
  import { TurbulentImg } from "$components/ui/img";
  import ocean from "$assets/prologue/tritons-triangle.jpg";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();
</script>

<div class="size-full">
  <TurbulentImg
    src={ocean}
    duration={44}
    minFrequency={[0.01, 0.01]}
    maxFrequency={[0.012, 0.012]}
    yoyo={true}
    class="w-full h-full object-cover"
  />
  <div class="absolute size-full bg-black opacity-20"></div>
  <TextOverlay
    keys={[
      "intro_1-1",
      "intro_1-2",
      "intro_1-3",
      "intro_1-4",
      "intro_1-5",
      "intro_1-6",
    ]}
    onFinished={() => gameApi.fadeScene("/title")}
  />
</div>

<style>
</style>
