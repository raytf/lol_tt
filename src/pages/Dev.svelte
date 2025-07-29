<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { OceanFish } from "$components/visual/animations";
  import { gameApi } from "$apis";

  const grid = {
    width: $gameApi.windowWidth,
    height: $gameApi.windowHeight,
  };

  onMount(() => {});
</script>

<div class="size-full bg-blue-200">
  <OceanFish />
</div>
