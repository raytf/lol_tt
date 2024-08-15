<script lang="ts">
  import { blur } from "svelte/transition";
  import type { Snippet } from "svelte";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    reveal = true,
    children: item,
    onclick,
    class: extraClass,
  }: {
    reveal?: boolean;
    children: Snippet;
    onclick?: () => void;
    class?: string;
  } = $props();
</script>

{#if reveal}
  <button transition:blur {onclick} class="container-unlock {extraClass}">
    <h1 class="text-6xl font-bold uppercase p-14">
      {lolApi.getText("item-unlocked")}
    </h1>
    {@render item()}
  </button>
{/if}

<style>
  .container-unlock {
    cursor: pointer;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.88);

    display: flex;
    flex-direction: column;
    align-items: center;

    z-index: 100;
  }
</style>
