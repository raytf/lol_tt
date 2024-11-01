<script lang="ts">
  import { fade } from "svelte/transition";
  import { ScientificMethodDiagram } from "$components/scientificMethod";
  import { Close } from "$components/svg/icons";
  import { inventoryApi, hudApi } from "$apis";

  let activeIndex = $state(-1);
</script>

{#if $inventoryApi.showSmModal}
  <div transition:fade={{ duration: 444 }} class="container-smModal">
    <button
      onclick={() => {
        $hudApi.completeTask("task_review-SM");
        $inventoryApi.showSmModal = false;
      }}
      class="absolute top-4 right-4"
    >
      <Close class="w-[55px] h-[55px] text-white" />
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
    background: rgba(0, 0, 0, 0.88);
    z-index: 101;
  }
</style>
