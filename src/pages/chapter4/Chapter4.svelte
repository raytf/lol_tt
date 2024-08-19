<script>
  import BackupInit from "$lib/components/BackupInit.svelte";
  import { TitleIntro } from "$components/intro";
  import { nearVent } from "$lib/stores/sub";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

  $nearVent = false;
</script>

<BackupInit />
<TitleIntro
  titleKey="title_chapter-4"
  descKey="desc_chapter-4"
  onComplete={() => gameApi.fadeScene("/ch4_exploration")}
/>
