<script lang="ts">
  import { gsap } from "gsap";
  import { Dialog } from "$components/dialog";
  import Intro from "$components/characterIntro/Intro.svelte";
  import LanguageLoader from "$components/LanguageLoader.svelte";
  import encounterShell from "$assets/chapter1/encounter_shell.jpg";
  import introShell from "$assets/chapter1/intro_shell.jpg";
  import neutral from "$assets/emoji/neutral.svg";
  import tongue from "$assets/emoji/tongue.svg";
  import astonished from "$assets/emoji/astonished.svg";
  import grin from "$assets/emoji/grin.svg";
  import shell from "$assets/avatars/shell.png";
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
    {
      imgSrc: grin,
      name: "dialog-name_explorer",
      text: "ch1-dialog_1-9",
    },
    {
      imgSrc: shell,
      name: "dialog-name_shell",
      text: "ch1-dialog_1-10",
    },
  ];

  let panTl: gsap.core.Timeline;
  let introTl: gsap.core.Timeline;
  $effect(() => {
    gsap.set(".bg-image", { scale: 1.2 });
    gsap.set(".intro-shell", { opacity: 0 });

    gsap.to(".bg-image", {
      scale: 1,
      duration: 10,
    });

    panTl = gsap.timeline({ paused: true });
    panTl.to(".bg-image", { y: -500, duration: 10 }, 0);

    introTl = gsap.timeline({
      paused: true,
      onComplete: () => {
        revealIntro = true;
      },
    });
    introTl.to(".intro-shell", { opacity: 1, duration: 1 });
  });

  let startedPan = $state(false);
  let revealIntro = $state(false);
  let startDialogue2 = $state(false);
</script>

<LanguageLoader />
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  onclick={() => console.log("done")}
  class="bg-image absolute top-0 size-full cursor-pointer z-[1]"
>
  <img src={encounterShell} alt="background" class="absolute w-full" />
  <img src={introShell} alt="background" class="intro-shell absolute w-full" />
</div>
{#if revealIntro}
  <Intro
    onclick={() => {
      introTl.reverse();
      revealIntro = false;
      startDialogue2 = true;
    }}
    class="flex flex-col p-12 z-[2]"
    nameKey="name_triton"
    descKey="desc_triton"
  />
{/if}
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
      gameApi.fadeScene("/ch1_lesson_sm-intro");
    }}
  />
{/if}

<style>
</style>
