<script lang="ts">
  import { onMount } from "svelte";
  import { hudApi, notepadApi } from "$apis";
  import { missionBrief } from "$dialog/radio";
  import { SmModal } from "$components/hud/sm";
  import { Notepad } from "$components/hud/notepad";

  onMount(() => {
    $notepadApi.addTableRow("depth-shallow", "o_sunlight-surface");
    $notepadApi.addTableRow("depth-medium", "o_color-change");
    $notepadApi.addTableRow("depth-deep", "o_darkness");
  });
</script>

<Notepad class="absolute w-[44%] h-[88%] bottom-2 right-2 size-full" />
