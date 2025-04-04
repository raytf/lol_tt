<script lang="ts">
  import { SMDiagram } from "$components/scientificMethod";
  import { Lol } from "$components/text";
  import { Close } from "$components/svg/icons";
  import { hudApi, objectivesApi, infoApi } from "$apis";
  import { cn } from "$lib/utils";

  let {
    activeIndex = -1,
    interactable = true,
    class: extraClass,
  }: {
    activeIndex?: number;
    interactable?: boolean;
    class?: string;
  } = $props();

  function onClickStep(step: SMStep) {
    $infoApi.openModal({
      infoType: step.label as SM,
      textKeys: [`${step.titleKey}_desc`],
    });

    if (step.label === "sm-o") {
      $objectivesApi.completeTask("task_review-o");
    }
  }

  function onClose() {
    $objectivesApi.completeTask("task_review-SM");
    $hudApi.showSmModal = false;
  }
</script>

<div class={cn("container-smModal", extraClass)}>
  {#if interactable}
    <button onclick={onClose} class="absolute top-4 right-4">
      <Close
        class="w-[55px] h-[55px] text-white hover:text-white transition-colors"
      />
    </button>
    <Lol key="sm-heading" shadow={true} class="text-4xl mt-24" />
    <Lol key="sm-subheading" />
  {/if}

  <SMDiagram
    {activeIndex}
    {onClickStep}
    class="w-[666px] h-[222px] mt-4 z-[1]"
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
    flex-direction: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.55);
  }
</style>
