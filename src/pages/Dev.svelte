<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { gameApi, hudApi } from "$apis";

  onMount(() => {
    $hudApi.enabled = true;
    $hudApi.showMissionBrief = true;
  });
</script>

<div class="size-full"></div>
