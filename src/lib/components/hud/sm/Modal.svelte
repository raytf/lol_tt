<script lang="ts">
  import { fade } from "svelte/transition";
  import { SMDiagram } from "$components/scientificMethod";
  import { Close } from "$components/svg/icons";
  import { hudApi, objectivesApi } from "$apis";

  let { class: extraClass }: { class?: string } = $props();

  let activeIndex = $state(-1);
</script>

<div
  transition:fade|global={{ duration: 222 }}
  class="container-smModal {extraClass}"
>
  <button
    onclick={() => {
      $objectivesApi.completeTask("task_review-SM");
      $hudApi.showSmModal = false;
    }}
    class="absolute top-4 right-4"
  >
    <Close class="w-[55px] h-[55px] text-white" />
  </button>
  <SMDiagram
    {activeIndex}
    class="w-[666px] h-[222px] mt-14 z-[1]"
    itemClass="h-[111px]"
  />
</div>

<style>
  .container-smModal {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.88);
  }
</style>
