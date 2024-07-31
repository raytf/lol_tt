<script lang="ts">
  import { push } from "svelte-spa-router";
  import { gsap } from "gsap";
  import { TextPlugin } from "gsap/TextPlugin";
  // Apis
  import { getLolApi } from "$lib/apis/lol.svelte";
  import { getGameApi } from "$lib/apis/game.svelte";

  gsap.registerPlugin(TextPlugin);

  const lolApi = getLolApi();
  $effect(() => {
    lolApi.init();
    getGameApi().init();
  });

  $effect(() => {
    console.log(lolApi.languageLoaded);
    if (lolApi.languageLoaded) {
      push("/story/prologue");
    }
  });
</script>

<div class="size-full bg-blue-200">
  <h1>Init</h1>
</div>
