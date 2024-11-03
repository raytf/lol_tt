<script>
  import { TitleIntro } from "$components/intro";
  import { gameApi } from "$apis";
</script>

<TitleIntro
  titleKey="title_chapter-2"
  descKey="desc_chapter-2"
  onComplete={() => $gameApi.fadeScene("/ch2_exploration_kelp")}
/>
