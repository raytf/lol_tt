<script>
  import { TitleIntro } from "$components/intro";
  import { nearVent, coords } from "$lib/stores/sub";
  import { gameApi } from "$apis/game.svelte";

  coords.set({ x: window.innerWidth / 2, y: 0 });
  $nearVent = false;
</script>

<TitleIntro
  titleKey="title_chapter-4"
  descKey="desc_chapter-4"
  onComplete={() => $gameApi.fadeScene("/ch4_exploration")}
/>
