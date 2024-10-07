<script lang="ts">
  import { gsap } from "gsap";
  import { Dialog } from "$components/dialog";
  import { CharacterIntro } from "$lib/components/intro";
  import BackupInit from "$lib/components/BackupInit.svelte";
  import encounterShell from "$assets/chapter1/encounter_shell.jpg";
  import introShell from "$assets/chapter1/intro_shell.jpg";
  import neutral from "$assets/emoji/neutral.svg";
  import tongue from "$assets/emoji/tongue.svg";
  import astonished from "$assets/emoji/astonished.svg";
  import grin from "$assets/emoji/grin.svg";
  import shell from "$assets/avatars/shell.png";
  import { shellEncountered } from "../store";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

  const dialogKeys1 = [
    {
      text: "ch1-dialog_1-1",
    },
    {
      imgSrc: neutral,
      name: "dialog-name_explorer",
      text: "ch1-dialog_1-2",
    },
    {
      text: "ch1-dialog_1-3",
    },
    {
      imgSrc: tongue,
      name: "dialog-name_explorer",
      text: "ch1-dialog_1-4",
    },
    {
      text: "ch1-dialog_1-5",
    },
    {
      imgSrc: astonished,
      name: "dialog-name_explorer",
      text: "ch1-dialog_1-6",
    },
  ];

  const dialogKeys2 = [
    {
      imgSrc: shell,
      name: "dialog-name_shell",
      text: "ch1-dialog_1-7",
    },
    {
      imgSrc: shell,
      name: "dialog-name_shell",
      text: "ch1-dialog_1-8",
    },
  ];

  let panTl: gsap.core.Timeline = gsap.timeline({ paused: true });
  let introTl: gsap.core.Timeline = gsap.timeline({
    paused: true,
    onComplete: () => {
      revealIntroText = true;
    },
  });
  $effect(() => {
    gsap.set(".bg-image", { scale: 1.2 });
    gsap.set(".intro-shell", { opacity: 0 });

    gsap.to(".bg-image", {
      scale: 1,
      duration: 4,
    });

    panTl.to(".bg-image", { y: -500, duration: 4 }, 0);

    introTl.to(".intro-shell", { opacity: 1, duration: 1 });
  });

  let startedPan = $state(false);
  let revealIntroText = $state(false);
  let startDialogue2 = $state(false);
</script>

<BackupInit />
<div class="bg-image absolute top-0 size-full z-[1]">
  <img src={encounterShell} alt="background" class="absolute w-full" />
  <img src={introShell} alt="background" class="intro-shell absolute w-full" />
</div>
<CharacterIntro
  nameKey="name_shell"
  descKey="desc_shell"
  activate={revealIntroText}
  onclick={() => {
    introTl.reverse();
    revealIntroText = false;
    startDialogue2 = true;
  }}
  class="text-left p-12 z-[2]"
/>
<Dialog
  keys={dialogKeys1}
  onProceed={() => {
    if (startedPan) return;
    panTl.play();
    startedPan = true;
  }}
  onFinished={() => {
    introTl.play();
  }}
/>
{#if startDialogue2}
  <Dialog
    keys={dialogKeys2}
    onFinished={() => {
      $shellEncountered = true;
      gameApi.fadeScene("/ch1_lesson_sm-intro");
    }}
  />
{/if}

<style>
</style>
