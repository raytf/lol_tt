<script>
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();
</script>

<div class="size-full flex flex-col justify-center items-center">
  <button onclick={() => gameApi.fadeScene("/story/prologue")}>Back</button>

  <h1>Triton's Treasure</h1>
</div>
