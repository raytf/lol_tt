<script lang="ts">
  import { gsap } from "gsap";
  import { CharacterIntro } from "$components/intro";
  import { Dialog } from "$components/hud/dialog";
  import encounterOtter from "$assets/chapter2/encounter_otter.jpg";
  import introOtter from "$assets/chapter2/intro_otter.jpg";
  import otter from "$assets/avatars/otter.png";
  import smile from "$assets/emoji/smile.svg";
  import { otterEncountered } from "../store";
  import { gameApi } from "$apis";

  let panTl: gsap.core.Timeline = gsap.timeline();
  let introTl: gsap.core.Timeline = gsap.timeline({
    onComplete: () => {
      revealIntroText = true;
    },
  });
  $effect(() => {
    gsap.set("#intro-otter", { opacity: 0 });
    gsap.set(".encounter-bg", { scale: 1, y: 111 });

    panTl.to(".encounter-bg", {
      y: 622,
      scale: 1,
      duration: 2,
    });

    introTl.to("#intro-otter", { opacity: 1, duration: 1 }, 1);
  });

  let revealIntroText = $state(false);
  let startDialog = $state(false);
</script>

<div class="encounter-bg">
  <img
    src={encounterOtter}
    alt="encounter-otter"
    class="absolute w-full bottom-0"
  />
  <img
    id="intro-otter"
    src={introOtter}
    alt="intro-otter"
    class="absolute w-full bottom-0 z-[1]"
  />
</div>
<CharacterIntro
  nameKey="name_otter"
  descKey="desc_otter"
  activate={revealIntroText}
  onclick={() => {
    introTl.reverse();
    revealIntroText = false;
    startDialog = true;
  }}
  class="text-left p-8 z-[2]"
/>
{#if startDialog}
  <Dialog
    keys={[
      {
        imgSrc: otter,
        name: "dialog-name_otter",
        text: "ch2-dialog_1-1",
      },
      {
        imgSrc: smile,
        name: "dialog-name_explorer",
        text: "ch2-dialog_1-2",
      },
      {
        imgSrc: otter,
        name: "dialog-name_otter",
        text: "ch2-dialog_1-3",
      },
    ]}
    onFinished={() => {
      otterEncountered.set(true);
      $gameApi.fadeScene("/ch2_exploration_kelp");
    }}
  />
{/if}

<style>
  .encounter-bg {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
</style>
