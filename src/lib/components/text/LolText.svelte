<script lang="ts">
  import { getLolApi } from "$apis";
  const lolApi = getLolApi();

  let { key, class: extraClass }: { key: string; class?: string } = $props();
</script>

<p class={extraClass}>{lolApi.getText(key)}</p>
