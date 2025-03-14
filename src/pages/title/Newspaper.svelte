<script lang="ts">
  import { fade } from "svelte/transition";
  import { Lol } from "$components/text";
  import { lolApi, gameApi } from "$apis";
  import {gsap} from "gsap";
  import ocean from "$assets/title/tritons-triangle.jpg";

  let active = $state(true);
  let index = $state(-1);

  const lolKeys = [
    "newspaper-text-1",
    "newspaper-text-2",
    "newspaper-text-3",
    "newspaper-text-4",
  ];

  function onProceed() {
    if (!active) return;

    index++;
    if (index < lolKeys.length) {
      $lolApi.speakText(lolKeys[index]);
      return;
    }

    gsap.to(".container-text", {
      scale: 2.2,
      top: "-20px",
      left: "-500px",
      duration: 2.5
    })
    $gameApi.fadeScene("/title", 2, 0.22);
  }
</script>

<button onclick={onProceed} class="size-full bg-white py-2 px-8 font-serif">
  {#if active}
  <div transition:fade class="container-text absolute top-0 left-0 size-full text-black flex flex-col">
    <div class="flex flex-col items-center">
      <Lol key="newspaper-heading" class="text-6xl m-2" />
      <div class="h-4 w-5/6 bg-red-500 m-2"></div>
      <Lol key="newspaper-subheading" class="text-4xl m-2" />
    </div>
    <div class="grid grid-cols-2 gap-4 px-8 py-2 text-left flex-1">
      <div class="flex flex-col gap-1">
        {#each lolKeys as key, i}
          {#if i <= index}
            <div transition:fade class="break-inside-avoid">
              <Lol {key} class="text-xl" />
            </div>
          {/if}
        {/each}
      </div>
      <div class="right relative h-full">
        {#if index >= 0}
          <img
            transition:fade={{ duration: 2000 }}
            src={ocean}
            alt="ocean"
            class="w-[444px]"
          />
        {/if}
      </div>
    </div>
  </div>
  {/if}
</button>
<!-- <Blackdrop
  opacity={blackdropOpacity}
  transitionDuration={2}
  class="top-0 flex items-center justify-center pointer-events-none"
>
  <Lol key="years-later" class="text-4xl" />
</Blackdrop> -->
