<script lang="ts">
  import { getLolApi } from "$apis";
  const lolApi = getLolApi();

  let { key, class: extraClass }: { key: string; class?: string } = $props();
  let text = $state(lolApi.getText(key));
</script>

<p class={extraClass}>{text}</p>
