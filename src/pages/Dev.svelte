<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { gameApi, hudApi, lolApi } from "$apis";
  import { Button, SimpleButton } from "$components/ui/button";

  onMount(() => {
    $gameApi.startedGame = true;

    $hudApi.enabled = true;
    $hudApi.enableInventory = true;
    $hudApi.showMissionBrief = true;
  });
</script>

<div class="size-full bg-blue-200"></div>
