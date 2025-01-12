<script lang="ts">
  import { onMount } from "svelte";
  import { hudApi } from "$apis";
  import { missionBrief } from "$dialog/radio";

  onMount(() => {
    $hudApi.startDialog({
      keys: missionBrief,
      disabledOptions: ["tut_brief-2_o2", "tut_brief-2_o3"],
      onFinished: () => {
        console.log("hello");
      },
    });
  });
</script>

<div class="size-full bg-blue-200 flex justify-center items-center"></div>
