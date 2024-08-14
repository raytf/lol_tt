<script>
  import LanguageLoader from "$components/LanguageLoader.svelte";
  import { TitleIntro } from "$components/intro";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();
</script>

<LanguageLoader />
<TitleIntro
  titleKey="title_chapter-1"
  descKey="desc_chapter-1"
  onComplete={() => gameApi.fadeScene("/ch1_exploration_start")}
/>
