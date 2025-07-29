<script lang="ts">
  import { cn } from "$lib/utils";
  import { Lol } from "$components/text";
  import { lolApi, hudApi, objectivesApi } from "$apis";

  let { class: extraClass = "" } = $props();
</script>

<div
  class={cn(
    "absolute size-full flex justify-center items-center",
    "py-8 px-16",
    extraClass,
  )}
>
  <button
    aria-label="close"
    onclick={() => {
      if ($objectivesApi.currentObjectiveIs("obj_mission")) {
        $objectivesApi.completeTask("task_mission-brief");
      }
      $hudApi.showMissionBrief = false;
    }}
    class="absolute size-full bg-black/50"
  ></button>
  <div
    class={cn(
      "absolute w-[80%] bg-blue-200/20 text-start",
      "p-8 rounded-t-2xl border border-white",
    )}
  >
    <Lol key="mission-brief_title" class="text-4xl" />
    <Lol key="mission-brief_location" class="text-xl" />
    <div class={cn("py-4 text-lg", "text-start")}>
      {#each [1, 2, 3] as idx}
        <Lol key="mission-brief-{idx}" />
      {/each}
    </div>
  </div>
</div>
