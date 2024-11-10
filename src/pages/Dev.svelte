<script lang="ts">
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { SmPuzzle } from "$components/hud/sm";
  import { hudApi, inventoryApi } from "$apis";
  import { missionBrief } from "$dialog/surface";
  import { SmLogBook } from "$components/hud/sm";
  import { BgImg } from "$components/ui/img";
  import relics_2 from "$assets/relics/relics_2.svg";

  onMount(() => {});
</script>

<div class="size-full bg-blue-200">
  <button onclick={() => toast.push("hello")}>Click me</button>
</div>
