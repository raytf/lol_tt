<script lang="ts">
  import { location } from "svelte-spa-router";
  import { getLolApi } from "$apis/lol.svelte";
  import { getGameApi } from "$apis/game.svelte";
  const lolApi = getLolApi();
  const gameApi = getGameApi();

  $effect(() => {
    if (!lolApi.languageLoaded) {
      //console.log("page: language not loaded", $location);
      //gameApi.changeScene(`/init${$location}`);
      console.log("Loading backup language file");
      loadBackupLanguage();
    }
  });

  function loadBackupLanguage() {
    fetch("language.json")
      .then((response) => response.json())
      .then((payload) => {
        lolApi.languageData = payload["en"];
        lolApi.languageLoaded = true;
      });
  }
</script>
