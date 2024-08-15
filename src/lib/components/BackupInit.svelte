<script lang="ts">
  import { location } from "svelte-spa-router";
  import { getLolApi } from "$apis/lol.svelte";
  import { getInventoryApi } from "$apis/inventory.svelte";
  import { getGameApi } from "$apis/game.svelte";
  const lolApi = getLolApi();
  const inventoryApi = getInventoryApi();
  const gameApi = getGameApi();

  let { inventory = false }: { inventory?: boolean } = $props();

  $effect(() => {
    if (!lolApi.languageLoaded) {
      //console.log("page: language not loaded", $location);
      //gameApi.changeScene(`/init${$location}`);
      console.log("Loading backup language file");
      loadBackupLanguage();
    }

    if (inventory) {
      inventoryApi.unlocked = true;
      inventoryApi.unlockItem("sm");
      inventoryApi.unlockItem("conch");
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
