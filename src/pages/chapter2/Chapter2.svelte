<script>
  import BackupInit from "$lib/components/BackupInit.svelte";
  import { TitleIntro } from "$components/intro";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();
</script>

<BackupInit />
<TitleIntro
  titleKey="title_chapter-2"
  descKey="desc_chapter-2"
  onComplete={() => gameApi.fadeScene("/ch2_exploration_kelp")}
/>
