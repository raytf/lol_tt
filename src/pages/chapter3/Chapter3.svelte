<script>
  import { TitleIntro } from "$components/intro";
  import { gameApi } from "$apis";
</script>

<TitleIntro
  titleKey="title_chapter-3"
  descKey="desc_chapter-3"
  onComplete={() => $gameApi.fadeScene("/ch3_exploration_kelp")}
/>
