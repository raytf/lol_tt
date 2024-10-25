<script>
  import { TitleIntro } from "$components/intro";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();
</script>

<TitleIntro
  titleKey="title_chapter-2"
  descKey="desc_chapter-2"
  onComplete={() => gameApi.fadeScene("/ch2_exploration_kelp")}
/>
