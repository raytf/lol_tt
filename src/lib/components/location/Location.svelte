<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import { Lol } from "$components/text";
  import { hideHeading, tlRevealHeading } from "./animations";
  import { hudApi, gameApi, objectivesApi } from "$apis";

  let {
    titleKey,
    class: extraClass,
    uiClass,
    children,
    ui,
  }: {
    titleKey: string;
    class?: string;
    uiClass?: string;
    children?: Snippet;
    ui?: Snippet;
  } = $props();

  onMount(() => {
    if ($gameApi.debugMode) {
      $objectivesApi.completedChapters = ["tutorial", "chapter1", "chapter2"];
      $objectivesApi.completedObjectives = [
        "obj_explore-deep",
        "obj_temp-plan",
        "obj_temp-experiment",
        "obj_temp-experiment-2",
        "obj_temp-analysis",
      ];
      $objectivesApi.recallCompletedChapters();
    }

    $gameApi.startedGame = true;
    hideHeading();

    const tlHeading = tlRevealHeading();
    setTimeout(() => {
      tlHeading.reverse();
      $hudApi.enabled = true;
    }, 2000);
  });
</script>

<div class="relative size-full {extraClass}">
  <div class="absolute size-full pointer-events-none {uiClass}">
    <div class="heading-location w-full text-center">
      <Lol key={titleKey} class="text-4xl font-bold p-4" />
    </div>
    {@render ui?.()}
  </div>
  {@render children?.()}
</div>
