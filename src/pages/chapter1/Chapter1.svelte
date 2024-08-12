<script>
  import LanguageLoader from "$lib/components/LanguageLoader.svelte";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

  $effect(() => {
    gameApi.fadeScene("/ch1_exploration_start");
  });
</script>

<LanguageLoader />
