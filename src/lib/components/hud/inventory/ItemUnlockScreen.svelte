<script lang="ts">
  import ItemCard from "./ItemCard.svelte";
  import { lolApi } from "$apis";

  let {
    itemId,
    onFinish,
    class: extraClass,
  }: {
    itemId: string;
    onFinish?: () => void;
    class?: string;
  } = $props();
</script>

<button onclick={onFinish} class="container-unlock {extraClass}">
  <h1 class="text-6xl font-bold uppercase p-14">
    {$lolApi.getText("item-unlocked")}
  </h1>
  <ItemCard id={itemId} />
</button>

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
