<script lang="ts">
  import { getLolApi } from "$lib/apis/lol.svelte";

  const lolApi = getLolApi();

  $effect(() => {
    lolApi.gameIsReady();
    lolApi.requestLoadState();
  });
</script>

<div class="size-full bg-blue-200">
  <h1>Init</h1>
  <p>{lolApi.languageLoaded}</p>
  <button onclick={() => lolApi.saveState()}>Save</button>
</div>
