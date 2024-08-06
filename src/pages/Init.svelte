<script lang="ts">
  import { gsap } from "gsap";
  import { TextPlugin } from "gsap/TextPlugin";
  // Apis
  import { getLolApi } from "$apis/lol.svelte";
  import { getGameApi } from "$apis/game.svelte";
  import { getAudioApi } from "$apis/audio.svelte";

  gsap.registerPlugin(TextPlugin);

  const lolApi = getLolApi();
  const gameApi = getGameApi();
  const audioApi = getAudioApi();
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
      gameApi.fadeScene("/prologue");
    }
  });
</script>

<div class="size-full">
  <p>Init</p>
</div>
