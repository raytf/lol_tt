<script lang="ts">
  import { lolApi } from "$apis";
  import { cn } from "$lib/utils";

  let {
    key,
    class: extraClass,
    shadow = false,
  }: { key: string; class?: string; shadow?: boolean } = $props();
  let text = $state($lolApi.getText(key));
</script>

<p class={cn(shadow && "shadow", extraClass)}>{@html text}</p>

<style>
  .shadow {
    text-shadow: 1px 1px 1px #000000;
  }
</style>
