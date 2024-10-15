<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { TextOverlay } from "$components/text";
  import { getGameApi, getLolApi, getAudioApi } from "$apis";
  const gameApi = getGameApi();
  const lolApi = getLolApi();
  const audioApi = getAudioApi();

  onMount(() => {
    audioApi.loadTrack({
      src: "music/theme_song.mp3",
    });
  });
</script>

<div id="title-screen" class="size-full"></div>

<style>
</style>
