<script>
  import { fade } from "svelte/transition";
  import { gsap } from "gsap";
  import { onMount } from "svelte";
  import { TurbulentImg } from "$components/ui/img";
  import ocean from "$assets/prologue/expedition_ocean.jpg";
  import ship from "$assets/prologue/expedition_ship.png";
  import shadow from "$assets/prologue/expedition_shadow.png";

  function tlShadowAppear() {
    gsap.to(".shadow", {
      opacity: 0.88,
      scale: 1.5,
      delay: 2,
      duration: 11,
      force3D: false,
    });
  }

  onMount(() => {
    gsap.set(".shadow", { opacity: 0 });
    gsap.set("#story_missing-crew", { scale: 1.4 });
    gsap.to("#story_missing-crew", {
      scale: 1,
      duration: 44,
      force3D: false,
    });

    tlShadowAppear();
  });
</script>

<div
  in:fade={{ duration: 2222 }}
  out:fade={{ delay: 2222, duration: 2222 }}
  id="story_missing-crew"
  class="absolute top-[-1%] w-full h-[101%]"
>
  <TurbulentImg
    src={ocean}
    duration={44}
    minFrequency={[0.01, 0.01]}
    maxFrequency={[0.015, 0.02]}
    yoyo={true}
    class="w-full h-full object-cover"
  />
  <img
    src={shadow}
    alt="shadow"
    class="shadow absolute size-full blur-[14px] z-[1]"
  />
  <img src={ship} alt="ship" class="anim-bob absolute size-full z-[2]" />
</div>

<style>
  .anim-bob {
    animation: bob 44s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
  }
</style>
