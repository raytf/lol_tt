<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { Confetti } from "svelte-confetti";
  import Todo from "./Todo.svelte";
  import { Celebrate } from "$components/svg/icons";
  import { Goal } from "$components/svg/icons/hud";
  import { Lol } from "$components/text";
  import { objectivesApi } from "$apis";

  let { class: extraClass }: { class?: string } = $props();

  let showTodos = $state(true);
</script>

<div transition:fade|global class="hud-objectives {extraClass}">
  <div class="flex flex-row items-center text-4xl font-bold">
    <Lol key={$objectivesApi.currentChapter} class="p-2" />
    {#if $objectivesApi.chapterFinished}
      <Lol key="complete" />
      <Celebrate class="w-[55px] h-[55px]" />
    {:else}
      <p class="text-3xl">
        ({$objectivesApi.currentObjectiveIndex + 1}/{$objectivesApi
          .currentObjectives.length})
      </p>
    {/if}
  </div>
  {#if $objectivesApi.currentObjective}
    {#key $objectivesApi.currentObjective}
      <div
        transition:fly={{ x: -55, duration: 555 }}
        class="absolute size-full"
      >
        <button
          onclick={() => (showTodos = !showTodos)}
          class="button-hud flex flex-row"
        >
          <Goal class="w-[33px] h-[33px]" />
          {#if $objectivesApi.currentObjective.completed}
            <Confetti y={[-0.5, 0.5]} x={[0, 2]} amount={111} />
          {/if}
          <Lol
            key={$objectivesApi.currentObjective.key}
            class="text-2xl mx-2 {$objectivesApi.currentObjective.completed
              ? 'line-through'
              : ''}"
          />
        </button>
        <ul class="p-2">
          {#if showTodos}
            {#each $objectivesApi.currentTasks as task}
              <Todo {task} />
            {/each}
          {/if}
        </ul>
      </div>
    {/key}
  {/if}
</div>

<style>
  button {
    pointer-events: auto;
  }
  .hud-objectives {
    position: absolute;
    width: 50%;
    height: 50%;
    padding: 0.44em;
  }
</style>
