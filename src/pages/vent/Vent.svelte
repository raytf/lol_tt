<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { gameApi, audioApi } from "$apis";

  onMount(() => {
    $audioApi.playTrack({
      src: "music/theme.mp3",
      loop: true,
      volume: 0.5,
    });
  });

  onDestroy(() => {
    $audioApi.stopTrack({ src: "music/theme.mp3" });
  });
</script>

<button
  onclick={() => {
    $gameApi.fadeScene("/abyss");
  }}
  class="absolute top-4 left-4 pointer-events-auto z-[10]"
>
  Back
</button>
<video src="tt_vent.mp4" class="size-full" autoplay loop>
  <track kind="captions" />
</video>
