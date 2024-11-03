<script lang="ts">
  import { onMount } from "svelte";
  import { SmPuzzle } from "$components/hud/sm";
  import { hudApi, inventoryApi } from "$apis";
  import { missionBrief } from "./surface/dialogue";

  onMount(() => {
    // $inventoryApi.unlockItem("radio");

    $hudApi.activated = true;
    // $hudApi.showInventory = true;

    // $hudApi.showSmPuzzle = true;
    $hudApi.startDialog({
      keys: missionBrief,
      onFinished: () => {
        console.log("done");
      },
    });
  });
</script>

<div class="size-full flex flex-col items-center bg-blue-200"></div>
