<script lang="ts">
  import { lolApi } from "$apis";

  let { key, class: extraClass }: { key: string; class?: string } = $props();
  let text = $state($lolApi.getText(key));
</script>

<p class={extraClass}>{text}</p>
