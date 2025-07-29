<script lang="ts">
  import { cn } from "$lib/utils";
  import { Lol } from "$components/text";
  import { lolApi, hudApi, objectivesApi } from "$apis";
  import { Eyes, Ruler, BeakerQuestion } from "$components/svg/icons";

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
    class="absolute size-full bg-black/80"
  ></button>
  <div
    class={cn(
      "absolute bottom-0 w-[80%] bg-blue-200/20 text-start",
      "p-8 rounded-t-2xl border border-b-0 border-white",
    )}
  >
    <Lol key="mission-brief_title" class="text-4xl underline" />
    <Lol key="mission-brief_location" class="text-xl" />
    <div class={cn("pt-4 text-lg", "text-start")}>
      {#each [1, 2, 3] as idx}
        <Lol key="mission-brief-{idx}" />
      {/each}
    </div>
    <Lol key="mission-brief_tips" class="text-center underline text-xl p-2" />
    <div class="grid grid-cols-3 gap-2">
      {#each [1, 2, 3] as idx}
        <div
          class={cn(
            "flex flex-col items-center gap-1",
            "border border-white rounded-2xl px-4 py-2",
          )}
        >
          {#if idx === 1}
            <Eyes width={50} />
          {:else if idx === 2}
            <Ruler width={50} />
          {:else if idx === 3}
            <BeakerQuestion width={50} />
          {/if}
          <Lol key="mission-brief_tip-{idx}" />
        </div>
      {/each}
    </div>
  </div>
</div>
