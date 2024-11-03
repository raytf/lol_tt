<script lang="ts">
  import { onMount } from "svelte";
  import { SmPuzzle } from "$components/hud/sm";
  import { hudApi, inventoryApi } from "$apis";
  import { missionBrief } from "./surface/dialogue";

  console.log(missionBrief);
  onMount(() => {
    //$inventoryApi.unlockItem("radio");

    $hudApi.activated = true;
    //$hudApi.showInventory = true;
    $hudApi.startDialog({
      keys: missionBrief,
    });

    // $hudApi.showSmPuzzle = true;
  });
</script>

<div class="size-full flex flex-col items-center bg-blue-200"></div>
