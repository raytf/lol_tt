<script lang="ts">
  import { gsap } from "gsap";
  import LanguageLoader from "$components/LanguageLoader.svelte";
  import Dialog from "$components/dialog/Dialog.svelte";
  import { CharacterIntro } from "$lib/components/intro";
  import encounterShark from "$assets/chapter1/encounter_shark.jpg";
  import introShark from "$assets/chapter1/intro_shark.jpg";
  import shark from "$assets/avatars/shark.png";
  import shell from "$assets/avatars/shell.png";
  import fearful from "$assets/emoji/fearful.svg";
  import { getGameApi } from "$lib/apis/game.svelte";
  const gameApi = getGameApi();

  let panTl: gsap.core.Timeline = gsap.timeline();
  let introTl: gsap.core.Timeline = gsap.timeline();
  $effect(() => {
    gsap.set("#intro-shark", { opacity: 0 });
    panTl.to(".bg-image", { scale: 1.5, duration: 4 });

    introTl.to(
      "#intro-shark",
      {
        opacity: 1,
        duration: 1,
        onComplete: () => {
          revealIntroText = true;
        },
      },
      2,
    );
  });

  let revealIntroText = $state(false);
  let startDialog = $state(false);
</script>

<LanguageLoader />
<div class="bg-image absolute top-0 size-full z-[1]">
  <img
    src={encounterShark}
    alt="encounter-shark"
    class="absolute object-cover h-full w-full"
  />
  <img
    id="intro-shark"
    src={introShark}
    alt="intro-shark"
    class="absolute object-cover h-full w-full z-[1]"
  />
</div>
<CharacterIntro
  nameKey="name_shark"
  descKey="desc_shark"
  activate={revealIntroText}
  onclick={() => {
    revealIntroText = false;
    introTl.reverse();
    startDialog = true;
  }}
  class="flex p-8 z-[2]"
/>
{#if startDialog}
  <Dialog
    onFinished={() => {
      gameApi.fadeScene("/ch1_exploration_shark");
    }}
    keys={[
      {
        imgSrc: shark,
        name: "dialog-name_shark",
        text: "ch1-dialog_shark_2-1",
      },
      {
        imgSrc: shell,
        name: "dialog-name_shell",
        text: "ch1-dialog_shark_2-2",
      },
      {
        imgSrc: shark,
        name: "dialog-name_shark",
        text: "ch1-dialog_shark_2-3",
      },
      {
        imgSrc: fearful,
        name: "dialog-name_explorer",
        text: "ch1-dialog_shark_2-4",
      },
      {
        imgSrc: shell,
        name: "dialog-name_shell",
        text: "ch1-dialog_shark_2-5",
      },
    ]}
  />
{/if}
