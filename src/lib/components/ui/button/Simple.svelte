<script lang="ts">
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let { key, onclick }: { key: string; onclick: () => void } = $props();
</script>

<button
  {onclick}
  class="m-4 p-4 border-4 rounded-full font-bold border-black bg-black text-white pointer-events-auto"
  >{lolApi.getText(key)}
</button>
