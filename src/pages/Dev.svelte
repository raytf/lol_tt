<script lang="ts">
  import { onMount } from "svelte";
  import { SmPuzzle } from "$components/hud/sm";
  import { hudApi, inventoryApi } from "$apis";
  import { missionBrief } from "./surface/dialogue";
  import { SmLogBook } from "$components/hud/sm";
  import { BgImg } from "$components/ui/img";
  import relics_2 from "$assets/relics/relics_2.svg";

  onMount(() => {});
</script>

<div class="size-full bg-blue-200">
  <SmLogBook />
</div>
