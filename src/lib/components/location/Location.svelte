<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { Lol } from "$components/text";
  import { hideHeading, tlRevealHeading } from "./animations";
  import { hudApi, gameApi, objectivesApi } from "$apis";

  let {
    titleKey,
    showTitle = true,
    class: extraClass,
    uiClass,
    children,
    ui,
  }: {
    titleKey: string;
    showTitle?: boolean;
    class?: string;
    uiClass?: string;
    children?: Snippet;
    ui?: Snippet;
  } = $props();

  onMount(() => {
    // if ($gameApi.debugMode) {
    //   $objectivesApi.completedChapters = ["tutorial", "chapter1", "chapter2"];
    //   $objectivesApi.completedObjectives = [
    //     "obj_explore-deep",
    //     "obj_temp-plan",
    //     "obj_temp-experiment",
    //     "obj_temp-experiment-2",
    //     "obj_temp-analysis",
    //   ];
    //   $objectivesApi.recallCompletedChapters();
    // }

    $gameApi.startedGame = true;
    $hudApi.enabled = true;
    // hideHeading();

    // const tlHeading = tlRevealHeading();
    // setTimeout(() => {
    //   tlHeading.reverse();
    //   $hudApi.enabled = true;
    // }, 2000);
  });
</script>

<div class="relative size-full {extraClass}">
  <div class="absolute size-full pointer-events-none {uiClass}">
    <div class="heading-location w-full text-center">
      {#if titleKey && showTitle}
        <div
          in:fade={{ duration: 2000 }}
          out:fade={{ delay: 2000, duration: 2000 }}
          onintroend={() => {
            showTitle = false;
          }}
        >
          <Lol key={titleKey} class="text-4xl font-bold p-4" />
        </div>
      {/if}
    </div>
    {@render ui?.()}
  </div>
  {@render children?.()}
</div>
