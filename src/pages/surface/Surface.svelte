<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { gsap } from "gsap";
  import { Dialog } from "$components/dialog";
  import { SkyOcean } from "$components/visual/scenery";
  import sub from "$assets/sprites/sub.png";
  import { missionBrief } from "./dialogue";
  import { getLolApi, getAudioApi } from "$apis";
  const lolApi = getLolApi();
  const audioApi = getAudioApi();

  function revealHeading(vars?: gsap.TimelineVars) {
    const tl = gsap.timeline(vars);
    tl.to("#surface-heading", { opacity: 1, duration: 1 });
    return tl;
  }

  function surfaceSub(vars?: gsap.TimelineVars) {
    const subTl = gsap.timeline(vars);
    subTl.to("#sub-image", {
      bottom: "-44%",
      duration: 1,
      ease: "back.out",
    });
    return subTl;
  }

  let startDialog = $state(false);
  let tlHeading: GSAPTimeline;
  onMount(() => {
    gsap.set("#surface-heading", { opacity: 0 });
    audioApi.playTrack({
      src: "sound/ocean-loop.mp3",
      volume: 0.08,
      loop: true,
    });

    tlHeading = revealHeading();
    surfaceSub({
      delay: 1,
      onComplete: () => {
        tlHeading.reverse();
        setTimeout(() => {
          startDialog = true;
        }, 1000);
      },
    });
  });
</script>

{#if startDialog}
  <div transition:fade>
    <Dialog top={true} keys={missionBrief} />
  </div>
{/if}
<div class="relative size-full">
  <div class="absolute size-full z-[1]">
    <p id="surface-heading" class="text-2xl font-bold p-4">
      {lolApi.getText("surface-heading")}
    </p>
  </div>
  <SkyOcean start={true} />
  <div
    class="absolute left-1/2 -translate-x-1/2 bottom-[22%] w-[111px] h-[111px] overflow-hidden"
  >
    <img id="sub-image" src={sub} alt="sub" class="absolute" />
  </div>
</div>

<style>
  #sub-image {
    bottom: -100%;
    animation: bob 11s linear infinite;
  }
  @keyframes bob {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(-8deg);
    }
    100% {
      transform: rotate(0);
    }
  }
</style>
