<script lang="ts">
  import { getLolApi } from "$lib/lolapi.svelte";

  const lolApi = getLolApi();

  $effect(() => {
    lolApi.gameIsReady();
  });
</script>

<div class="size-full bg-blue-200">
  <h1>Init</h1>
  <p>{lolApi.languageLoaded}</p>
</div>
