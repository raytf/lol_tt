<script>
  import { fade } from "svelte/transition";
  import { grinOpen } from "$assets/emoji/round";
  import sub from "$assets/sprites/sub_old.jpg";
  import { Blackdrop } from "$components/ui";
  import { Lol } from "$components/text";
  import { lolApi, gameApi } from "$apis";

  let index = $state(0);
  let blackdropOpacity = $state(0);

  const lolKeys = ["newspaper-text-1"];

  function onProceed() {
    if (index < 0) return;

    if (index < lolKeys.length) {
      $lolApi.speakText(lolKeys[index]);
      index++;
      return;
    }

    index = -1;
    $lolApi.speakText("years-later");
    blackdropOpacity = 100;
    setTimeout(() => {
      $gameApi.fadeScene("/surface?start");
    }, 2222);
  }
</script>

{#if index <= 3}
  <button onclick={onProceed} class="size-full py-2 px-8 font-serif">
    <div class="size-full bg-white text-black flex flex-col items-center">
      <div class="h-4 w-3/4 bg-red-500 m-2"></div>
      <Lol key="newspaper-heading" class="text-6xl m-2" />
      <Lol key="newspaper-subheading" class="text-4xl m-2" />
      <div class="grid grid-cols-2 gap-8">
        <div class="flex flex-col items-end gap-1">
          <div class="w-[300px] h-[300px] border border-black bg-blue-200 p-2">
            <img src={grinOpen} alt="missing" class="size-full" />
          </div>
        </div>
        <div class="flex overflow-scroll-y">
          <div class="max-w-[400px] flex flex-col gap-1 text-left">
            {#each lolKeys as key, i}
              {#if index > i}
                <div transition:fade>
                  <Lol {key} class="text-xl" />
                </div>
                <div
                  in:fade={{ delay: 1000 }}
                  class="w-[111px] h-[111px] border border-black"
                >
                  <img src={sub} alt="missing" class="size-full" />
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </button>
{/if}
<Blackdrop
  opacity={blackdropOpacity}
  transitionDuration={2}
  class="top-0 flex items-center justify-center pointer-events-none"
>
  <Lol key="years-later" class="text-4xl" />
</Blackdrop>
