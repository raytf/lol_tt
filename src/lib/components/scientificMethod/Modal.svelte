<script lang="ts">
  import { ScientificMethodDiagram } from "$components/scientificMethod";
  import close from "$assets/icons/close.svg";
  import { getInventoryApi } from "$apis/inventory.svelte";
  const inventoryApi = getInventoryApi();

  let activeIndex = $state(-1);
</script>

{#if inventoryApi.showSmModal}
  <div class="container-smModal">
    <button
      onclick={() => (inventoryApi.showSmModal = false)}
      class="absolute top-4 right-4"
    >
      <img
        src={close}
        alt="close"
        class="w-[55px] h-[55px]"
        style="color:white;"
      />
    </button>
    <ScientificMethodDiagram
      {activeIndex}
      class="w-[666px] h-[222px] mt-14 z-[1]"
      itemClass="h-[111px]"
    />
  </div>
{/if}

<style>
  .container-smModal {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.66);
    z-index: 101;
  }
</style>
