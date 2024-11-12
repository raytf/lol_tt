<script lang="ts">
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";

  import { Notepad } from "$components/hud/notepad";

  onMount(() => {});
</script>

<div class="size-full bg-blue-200 flex justify-center items-center">
  <p class="font-bold">test tiel</p>
  <Notepad
    title="Observations"
    lines={["test", "anudda one", "another one"]}
    class="absolute w-[33%] h-3/4 bottom-4 right-4"
  />
</div>
