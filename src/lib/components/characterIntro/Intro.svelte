<script lang="ts">
  import { gsap } from "gsap";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    onclick,
    class: extraClass,
    nameKey,
    descKey,
  }: {
    onclick?: () => void;
    class?: string;
    nameKey: string;
    descKey: string;
  } = $props();

  $effect(() => {});
</script>

<button {onclick} class="absolute top-0 size-full {extraClass}">
  <p class="text-name text-6xl font-bold">{lolApi.getText(nameKey)}</p>
  <p class="text-desc text-4xl">{lolApi.getText(descKey)}</p>
</button>
