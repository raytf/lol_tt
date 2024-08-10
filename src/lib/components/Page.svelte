<script lang="ts">
  import type { Snippet } from "svelte";
  import { location } from "svelte-spa-router";
  import { getLolApi } from "$apis/lol.svelte";
  import { getGameApi } from "$apis/game.svelte";
  const lolApi = getLolApi();
  const gameApi = getGameApi();

  $effect(() => {
    if (!lolApi.languageLoaded) {
      console.log("page: language not loaded");
      gameApi.changeScene(`/init${$location}`);
    }
  });

  let { children, ...props }: { children: Snippet } = $props();
</script>

{@render children()}
