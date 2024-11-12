<script lang="ts">
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";

  import { Notepad } from "$components/hud/notepad";
  import { SMDiagram } from "$components/scientificMethod";

  onMount(() => {});
</script>

<div class="size-full bg-blue-200 flex justify-center items-center">
  <!-- <Notepad /> -->
  <SMDiagram activeIndex={-1} class="w-[222px] h-[222px]" />
</div>
