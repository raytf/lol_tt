<script lang="ts">
  import { cn } from "$lib/utils";
  import { fade } from "svelte/transition";
  import { Lol } from "$components/text";
  import { lolApi, hudApi, objectivesApi } from "$apis";
  import { Eyes, Ruler, BeakerQuestion } from "$components/svg/icons";
  import { Left, Right } from "$components/svg/icons/caret";
  import tritons_triangle from "$assets/title/tritons-triangle.jpg";
  import rov_1 from "$assets/story/rov_underwater.jpg";
  import abyss from "$assets/story/abyss.jpg";
  import no_signal from "$assets/story/no_signal.jpg";
  import heatmap from "$assets/story/heatmap.jpg";

  let { class: extraClass = "" } = $props();

  const numPages = 6;
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
      if ($objectivesApi.currentObjectiveIs("obj_check-equipment")) {
        $hudApi.startItemUnlock({
          itemId: "sm",
          onFinished: () => {
            $hudApi.startItemUnlock({
              itemId: "notepad",
            });
          },
        });
      }

      $hudApi.showMissionBrief = false;
    }}
    class="absolute size-full bg-black/80"
  ></button>
  <div
    class={cn(
      "absolute bottom-0 h-[95%] w-[80%] bg-blue-200/20 text-start",
      "px-12 py-4 rounded-t-2xl border border-b-0 border-white",
    )}
  >
    <div class="absolute top-0 left-0 size-full pointer-events-none">
      {#if $hudApi.missionBriefIndex !== 0}
        <button
          onclick={() => {
            $hudApi.missionBriefIndex--;
          }}
          class="absolute left-2 top-1/2 pointer-events-auto"
          ><Left class="hover:text-yellow-200" width="2em" height="2em" />
        </button>
      {/if}
      {#if $hudApi.missionBriefIndex < numPages - 1}
        <button
          onclick={() => {
            $hudApi.missionBriefIndex++;
            if ($hudApi.missionBriefIndex === 5) {
              $objectivesApi.completeTask("task_mission-brief");
            }
          }}
          class="absolute right-2 top-1/2 pointer-events-auto"
          ><Right class="hover:text-yellow-200" width="2em" height="2em" />
        </button>
      {/if}
    </div>

    <div class="border-b">
      <Lol type="span" key="mission-brief_title" class="text-4xl" />
      <span class="text-2xl">({$hudApi.missionBriefIndex + 1}/{numPages})</span>
    </div>

    <div class="relative h-[95%] flex flex-col justify-center items-center">
      {#if $hudApi.missionBriefIndex === 0}
        <div transition:fade class="absolute">
          <Lol key="mission-brief_1-1" class="text-xl py-2" />
          <img
            alt="tritons_triangle"
            src={tritons_triangle}
            class="h-[350px] w-full object-cover"
          />
        </div>
      {:else if $hudApi.missionBriefIndex === 1}
        <div transition:fade class="absolute">
          <Lol key="mission-brief_1-2" class="text-xl py-2" />
          <img
            alt="rov_underwater"
            src={rov_1}
            class="h-[350px] w-full object-cover"
          />
        </div>
      {:else if $hudApi.missionBriefIndex === 2}
        <div transition:fade class="absolute">
          <Lol key="mission-brief_1-3" class="text-xl py-2" />
          <img alt="abyss" src={abyss} class="h-[350px] w-full object-cover" />
        </div>
      {:else if $hudApi.missionBriefIndex === 3}
        <div transition:fade class="absolute">
          <Lol key="mission-brief_1-4" class="text-xl py-2" />
          <img
            alt="no_signal"
            src={no_signal}
            class="h-[350px] w-full object-contain"
          />
        </div>
      {:else if $hudApi.missionBriefIndex === 4}
        <div transition:fade class="absolute">
          <Lol key="mission-brief_1-5" class="text-xl py-2" />
          <img
            alt="heatmap"
            src={heatmap}
            class="h-[350px] w-full object-cover"
          />
        </div>
      {:else if $hudApi.missionBriefIndex === 5}
        <div transition:fade class="absolute">
          <Lol key="your-mission" class="underline text-2xl py-1" />
          <Lol key="mission-brief_1-6" class="text-xl py-2" />
          <Lol
            key="mission-brief_tips"
            class="text-center underline text-xl p-2"
          />
          <div class="grid grid-cols-3 gap-2">
            {#each [1, 2, 3] as idx}
              <div
                class={cn(
                  "flex flex-col items-center gap-1",
                  "border border-white rounded-2xl px-4 py-2",
                )}
              >
                {#if idx === 1}
                  <BeakerQuestion width={80} />
                {:else if idx === 2}
                  <Eyes width={80} />
                {:else if idx === 3}
                  <Ruler width={80} />
                {/if}
                <Lol key="mission-brief_tip-{idx}" class="mt-1" />
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- <Lol key="mission-brief_location" class="text-xl" />
    <div class={cn("pt-4 text-lg", "text-start")}>
      {#each [1, 2, 3] as idx}
        <Lol key="mission-brief-{idx}" />
      {/each}
    </div> -->
  </div>
</div>
