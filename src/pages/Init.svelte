<script lang="ts">
  // Apis
  import { getLolApi } from "$apis/lol.svelte";
  import { getGameApi } from "$apis/game.svelte";
  import { getAudioApi } from "$apis/audio.svelte";
  const lolApi = getLolApi();
  const gameApi = getGameApi();
  const audioApi = getAudioApi();

  let { params }: { params: { from: string } } = $props();

  let audioLoaded = $state(false);
  $effect(() => {
    lolApi.init();
    gameApi.init();
    audioApi.loadTrack({
      src: "music/theme_main.mp3",
      onload: () => {
        audioLoaded = true;
      },
    });
  });

  $effect(() => {
    if (lolApi.languageLoaded && audioLoaded) {
      if (params && params.from) {
        console.log("Init from:", params.from);
        gameApi.fadeScene("/" + params.from);
      } else {
        gameApi.fadeScene("/intro");
      }
    }
  });
</script>

<div class="size-full">
  <p>Init</p>
</div>
