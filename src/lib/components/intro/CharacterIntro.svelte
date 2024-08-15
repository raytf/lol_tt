<script lang="ts">
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    activate = false,
    onclick,
    class: extraClass,
    nameKey,
    descKey,
  }: {
    activate?: boolean;
    onclick?: () => void;
    class?: string;
    nameKey: string;
    descKey: string;
  } = $props();
</script>

<button
  {onclick}
  class="absolute top-0 size-full flex flex-col select-none {activate
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none'} {extraClass}"
>
  <p class="text-name text-7xl font-bold">{lolApi.getText(nameKey)}</p>
  <p class="text-desc text-4xl py-4">{@html lolApi.getText(descKey)}</p>
</button>

<style>
  button {
    transition: opacity 1s;
  }
</style>
