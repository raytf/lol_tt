<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { Confetti } from "svelte-confetti";
  import Todo from "./Todo.svelte";
  import { Goal } from "$components/svg/icons/hud";
  import { Lol } from "$components/text";
  import { hudApi } from "$apis";

  let { class: extraClass }: { class?: string } = $props();

  let showTodos = $state(true);
</script>

{#if $hudApi.getCurrentObjective()}
  <div transition:fade class="hud-objectives {extraClass}">
    <Lol key={$hudApi.currentChapter} class="text-4xl font-bold p-2" />

    {#key $hudApi.getCurrentObjective()}
      <div
        transition:fly={{ x: -55, duration: 555 }}
        class="absolute size-full"
      >
        <button
          onclick={() => (showTodos = !showTodos)}
          class="button-hud flex flex-row"
        >
          <Goal class="w-[33px] h-[33px]" />
          {#if $hudApi.getCurrentObjective().completed}
            <Confetti y={[-0.5, 0.5]} x={[0, 2]} amount={111} />
          {/if}
          <Lol
            key={$hudApi.getCurrentObjective().key}
            class="text-2xl mx-2 {$hudApi.getCurrentObjective().completed
              ? 'line-through'
              : ''}"
          />
        </button>
        <ul class="p-2">
          {#if showTodos}
            {#each $hudApi.currentTasks as task}
              <Todo {task} />
            {/each}
          {/if}
        </ul>
      </div>
    {/key}
  </div>
{/if}

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
