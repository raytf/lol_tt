<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { gsap } from "gsap";
  import { Area } from "$components/exploration";
  import { Dialog } from "$components/dialog";
  import { SkyOcean } from "$components/visual/scenery";
  import { Submarine } from "$components/gameObjects";
  import { moveSub } from "$lib/stores/exploration";
  import { ItemUnlockScreen, ItemCard } from "$components/inventory";
  import { missionBrief } from "./dialogue";
  import { windowWidth, windowHeight } from "$lib/stores/game";
  import { setPosition as setSubPosition } from "$lib/stores/sub";
  import { getLolApi, getAudioApi, getInventoryApi } from "$apis";
  const lolApi = getLolApi();
  const audioApi = getAudioApi();
  const inventoryApi = getInventoryApi();

  function revealHeading(vars?: gsap.TimelineVars) {
    const tl = gsap.timeline(vars);
    tl.to("#surface-heading", { opacity: 1, duration: 1 });
    return tl;
  }

  let surfaceSub = $state(false);
  let startDialog = $state(false);
  let tlHeading: GSAPTimeline;
  let initialSubCoords = {
    x: $windowWidth / 2,
    y: $windowHeight / 2 + 111,
  };
  setSubPosition(initialSubCoords);
  onMount(() => {
    gsap.set("#surface-heading", { opacity: 0 });
    audioApi.playTrack({
      src: "sound/ocean-loop.mp3",
      volume: 0.08,
      loop: true,
    });

    tlHeading = revealHeading();
    setTimeout(() => {
      surfaceSub = true;
      tlHeading.reverse();
      setTimeout(() => {
        startDialog = true;
      }, 1500);
    }, 1500);
  });

  let unlockRadio = $state(false);
  let unlockSM = $state(false);
</script>

{#if startDialog}
  <Dialog
    top={true}
    keys={missionBrief}
    onFinished={() => {
      inventoryApi.activated = true;
      unlockRadio = true;
    }}
  />
{/if}
<div class="relative size-full">
  <div class="absolute size-full z-[1]">
    <p id="surface-heading" class="text-3xl font-bold p-4">
      {lolApi.getText("surface-heading")}
    </p>
  </div>
  <SkyOcean start={true} />
  <div class="absolute w-full h-1/2 bottom-0 z-10">
    <Area onmousedown={moveSub}></Area>
  </div>
  <Submarine
    size={111}
    offset={{ x: 111 / 2, y: 111 }}
    class="overflow-hidden"
    imgClass="bottom-[-44%]"
    bob={true}
    reveal={surfaceSub}
  />
</div>

<ItemUnlockScreen
  reveal={unlockRadio}
  onclick={() => {
    inventoryApi.unlockItem("radio");
    unlockRadio = false;
    unlockSM = true;
  }}
>
  <ItemCard id="radio" />
</ItemUnlockScreen>
<ItemUnlockScreen
  reveal={unlockSM}
  onclick={() => {
    inventoryApi.unlockItem("sm");
    unlockSM = false;
  }}
>
  <ItemCard id="sm" />
</ItemUnlockScreen>
