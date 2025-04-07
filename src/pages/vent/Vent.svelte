<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { gameApi, audioApi, hudApi } from "$apis";
  import { ventDescription } from "$dialog/chapter3";

  let videoElement: HTMLVideoElement;

  onMount(() => {
    $audioApi.playTrack({
      src: "music/theme.mp3",
      loop: true,
      volume: 0.5,
    });

    $hudApi.showGaugeScreen = false;
    //$hudApi.showInterface = false;
    $hudApi.showNotepad = false;
    $hudApi.enabled = true;

    $hudApi.startDialog({
      keys: ventDescription,
      onFinished: () => {
        $gameApi.fadeScene("/");
      },
    });

    videoElement.play();
  });

  onDestroy(() => {
    $audioApi.stopTrack({ src: "music/theme.mp3" });
  });

  function onVideoEnded() {
    videoElement.currentTime = 2;
    videoElement.play();
    console.log("video ended");
  }
</script>

<!-- <button
  onclick={() => {
    $gameApi.fadeScene("/abyss");
  }}
  class="absolute top-4 left-4 pointer-events-auto z-[10]"
>
  Back
</button> -->
<video
  bind:this={videoElement}
  onended={onVideoEnded}
  src="tt_vent.mp4"
  class="size-full"
>
  <track kind="captions" />
</video>
