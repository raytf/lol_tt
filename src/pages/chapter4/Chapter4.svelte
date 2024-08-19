<script>
  import BackupInit from "$lib/components/BackupInit.svelte";
  import { TitleIntro } from "$components/intro";
  import { nearVent, coords } from "$lib/stores/sub";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

  coords.set({ x: window.innerWidth / 2, y: 0 });
  $nearVent = false;
</script>

<BackupInit />
<TitleIntro
  titleKey="title_chapter-4"
  descKey="desc_chapter-4"
  onComplete={() => gameApi.fadeScene("/ch4_exploration")}
/>
