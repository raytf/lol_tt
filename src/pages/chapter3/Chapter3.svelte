<script>
  import { TitleIntro } from "$components/intro";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();
</script>

<TitleIntro
  titleKey="title_chapter-3"
  descKey="desc_chapter-3"
  onComplete={() => gameApi.fadeScene("/ch3_exploration_kelp")}
/>
