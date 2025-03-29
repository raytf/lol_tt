<script lang="ts">
  import ItemCard from "./ItemCard.svelte";
  import { Lol } from "$components/text";
  import { lolApi, inventoryApi } from "$apis";

  let {
    item,
    onFinish,
    class: extraClass,
  }: {
    item: ItemDetails;
    onFinish?: () => void;
    class?: string;
  } = $props();

  function onClick() {
    onFinish?.();
  }
</script>

<button onclick={onClick} class="container-unlock {extraClass}">
  <Lol
    key={$inventoryApi.unlockTitleKey}
    class="text-6xl font-bold uppercase p-14"
  />
  <ItemCard {item} />
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
  }
</style>
