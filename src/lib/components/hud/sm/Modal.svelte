<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { fade } from "svelte/transition";
  import { SMDiagram } from "$components/scientificMethod";
  import { Close } from "$components/svg/icons";
  import { hudApi, objectivesApi } from "$apis";

  let {
    activeIndex = -1,
    closable = true,
    class: extraClass,
  }: { activeIndex?: number; closable?: boolean; class?: string } = $props();

  onMount(() => {
    gsap.set(".container-smModal", { opacity: 0 });
    gsap.to(".container-smModal", { opacity: 1, duration: 1 });
  });
</script>

<div
  transition:fade|global={{ duration: 222 }}
  class="container-smModal {extraClass}"
>
  {#if closable}
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
    padding-top: 111px;
  }
</style>
