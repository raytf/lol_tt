<script lang="ts">
  import { TitleIntro } from "$components/intro";
  import { gameApi } from "$apis";
</script>

<TitleIntro
  titleKey="intro-surface"
  onComplete={() => {
    $gameApi.fadeScene("/surface");
  }}
/>
