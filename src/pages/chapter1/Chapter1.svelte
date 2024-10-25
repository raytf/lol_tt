<script>
  import { onMount } from "svelte";
  import { TitleIntro } from "$components/intro";
  import { getGameApi } from "$apis/game.svelte";
  import { getAudioApi } from "$apis/audio.svelte";
  const gameApi = getGameApi();
  const audioApi = getAudioApi();

  onMount(() => {
    audioApi.playTrack({
      src: "music/deep-echoes.mp3",
      volume: 0.66,
      loop: true,
    });
  });
</script>

<TitleIntro
  titleKey="title_chapter-1"
  descKey="desc_chapter-1"
  onComplete={() => {
    gameApi.fadeScene("/ch1_exploration_wrecks");
  }}
/>
