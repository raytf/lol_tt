<script lang="ts">
  import { gsap } from "gsap";
  import { TextPlugin } from "gsap/TextPlugin";
  // Apis
  import { getLolApi } from "$apis/lol.svelte";
  import { getGameApi } from "$apis/game.svelte";

  gsap.registerPlugin(TextPlugin);

  const lolApi = getLolApi();
  const gameApi = getGameApi();
  $effect(() => {
    lolApi.init();
    gameApi.init();
  });

  $effect(() => {
    if (lolApi.languageLoaded) {
      gameApi.fadeScene("/story/prologue");
    }
  });
</script>

<div class="size-full">
  <p>Init</p>
</div>
