<script lang="ts">
  import { SMDiagram } from "$components/scientificMethod";
  import { Close } from "$components/svg/icons";
  import { hudApi, objectivesApi } from "$apis";

  let {
    activeIndex = -1,
    interactable = true,
    class: extraClass,
  }: {
    activeIndex?: number;
    interactable?: boolean;
    class?: string;
  } = $props();
</script>

<div class="container-smModal {extraClass}">
  {#if interactable}
    <button
      onclick={() => {
        $objectivesApi.completeTask("task_review-SM");
        $hudApi.showSmModal = false;
      }}
      class="absolute top-4 right-4"
    >
      <Close class="w-[55px] h-[55px] text-black" />
    </button>
  {/if}
  <SMDiagram
    {activeIndex}
    class="w-[666px] h-[222px] mt-24 z-[1]"
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
    background: rgba(0, 0, 0, 0.55);
  }
</style>
