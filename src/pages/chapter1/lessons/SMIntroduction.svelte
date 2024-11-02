<script lang="ts">
  import { gsap } from "gsap";
  import { SMDiagram } from "$components/scientificMethod";
  import type { DialogKey } from "$components/dialog";
  import { Dialog } from "$components/dialog";
  import ocean1 from "$assets/chapter1/ocean_explore.jpg";
  import ocean2 from "$assets/chapter1/ocean_lively.jpg";
  import ocean3 from "$assets/chapter1/ocean_dark.jpg";
  import smile from "$assets/emoji/smile.svg";
  import neutral from "$assets/emoji/neutral.svg";
  import grin from "$assets/emoji/grin.svg";
  import shell from "$assets/avatars/shell.png";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

  const dialogKeysIntro = [
    {
      imgSrc: smile,
      name: "dialog-name_explorer",
      text: "ch1-dialog_2-1",
    },
    {
      imgSrc: shell,
      name: "dialog-name_shell",
      text: "ch1-dialog_2-2",
    },
  ];

  const dialogKeysSM = [
    {
      imgSrc: neutral,
      name: "dialog-name_explorer",
      text: "ch1-dialog_sm-1",
    },
    {
      imgSrc: neutral,
      name: "dialog-name_explorer",
      text: "ch1-dialog_sm-2",
    },
    {
      imgSrc: neutral,
      name: "dialog-name_explorer",
      text: "ch1-dialog_sm-3",
    },
    {
      imgSrc: neutral,
      name: "dialog-name_explorer",
      text: "ch1-dialog_sm-4",
    },
    {
      imgSrc: neutral,
      name: "dialog-name_explorer",
      text: "ch1-dialog_sm-5",
    },
    {
      imgSrc: neutral,
      name: "dialog-name_explorer",
      text: "ch1-dialog_sm-6",
    },
    {
      imgSrc: neutral,
      name: "dialog-name_explorer",
      text: "ch1-dialog_sm-7",
    },
    {
      imgSrc: shell,
      name: "dialog-name_shell",
      text: "ch1-dialog_sm-8",
    },
    {
      imgSrc: smile,
      name: "dialog-name_explorer",
      text: "ch1-dialog_sm-9",
    },
    {
      imgSrc: smile,
      name: "dialog-name_explorer",
      text: "ch1-dialog_sm-10",
    },
  ];

  const dialogKeysDiscovery = [
    {
      imgSrc: smile,
      name: "dialog-name_explorer",
      text: "ch1-dialog_3-1",
    },
    {
      imgSrc: smile,
      name: "dialog-name_explorer",
      text: "ch1-dialog_3-2",
    },
    {
      imgSrc: grin,
      name: "dialog-name_explorer",
      text: "ch1-dialog_3-3",
    },
    {
      imgSrc: shell,
      name: "dialog-name_shell",
      text: "ch1-dialog_3-4",
    },
  ];

  const dialogKeysGuide = [
    {
      imgSrc: shell,
      name: "dialog-name_shell",
      text: "ch1-dialog_4-1",
    },
    {
      imgSrc: grin,
      name: "dialog-name_explorer",
      text: "ch1-dialog_4-2",
    },
    {
      imgSrc: shell,
      name: "dialog-name_shell",
      text: "ch1-dialog_4-3",
    },
    {
      imgSrc: shell,
      name: "dialog-name_shell",
      text: "ch1-dialog_4-4",
    },
  ];

  let smStep = $state(-1);
  let startDialogSM = $state(false);
  let startDialogDiscovery = $state(false);
  let startDialogGuide = $state(false);

  let tlBg1: gsap.core.Timeline;
  let tlBg2: gsap.core.Timeline;
  let tlBg3: gsap.core.Timeline;
  $effect(() => {
    gsap.set("#ch1_ocean-1", { opacity: 0 });
    gsap.set("#ch1_ocean-2", { opacity: 0, scale: 1.2 });
    gsap.set("#ch1_ocean-3", { opacity: 0 });

    tlBg1 = gsap.timeline({ paused: false });
    tlBg1.to("#ch1_ocean-1", {
      opacity: 1,
      scale: 1.5,
      duration: 44,
    });

    tlBg2 = gsap.timeline({ paused: true });
    tlBg2.to("#ch1_ocean-2", {
      opacity: 1,
      duration: 2,
    });
    tlBg2.to("#ch1_ocean-2", {
      scale: 1,
      duration: 33,
    });

    tlBg3 = gsap.timeline({ paused: true });
    tlBg3.to("#ch1_ocean-3", {
      opacity: 1,
      duration: 2,
    });
    tlBg3.to("#ch1_ocean-3", {
      opacity: 1,
      y: -444,
      duration: 22,
    });
  });
</script>

<div class="relative size-full flex flex-col items-center bg-black">
  <img id="ch1_ocean-1" src={ocean1} alt="ocean1" class="absolute" />
  <img id="ch1_ocean-2" src={ocean2} alt="ocean2" class="absolute" />
  <img
    id="ch1_ocean-3"
    src={ocean3}
    alt="ocean3"
    class="absolute object-cover"
  />

  <SMDiagram
    visible={startDialogSM}
    activeIndex={smStep}
    class="w-[666px] h-[222px] mt-14 z-[1]"
    itemClass="h-[111px]"
  />
</div>
<Dialog
  keys={dialogKeysIntro}
  onFinished={() => {
    startDialogSM = true;
  }}
/>
{#if startDialogSM}
  <Dialog
    keys={dialogKeysSM}
    onProceed={() => {
      smStep += 1;
    }}
    onFinished={() => {
      startDialogSM = false;
      startDialogDiscovery = true;
      tlBg2.play();
    }}
  />
{/if}
{#if startDialogDiscovery}
  <Dialog
    keys={dialogKeysDiscovery}
    onFinished={() => {
      startDialogGuide = true;
      tlBg3.play();
    }}
  />
{/if}
{#if startDialogGuide}
  <Dialog
    keys={dialogKeysGuide}
    onFinished={() => {
      gameApi.fadeScene("/ch1_exploration_wrecks");
    }}
  />
{/if}
