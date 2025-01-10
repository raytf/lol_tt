<script lang="ts">
  import { lolApi } from "$apis";

  let {
    key,
    class: extraClass,
    shadow = false,
  }: { key: string; class?: string; shadow?: boolean } = $props();
  let text = $state($lolApi.getText(key));
</script>

<p class="{shadow && 'shadow'} {extraClass}">{@html text}</p>

<style>
  .shadow {
    text-shadow: 1px 1px 1px #000000;
  }
</style>
