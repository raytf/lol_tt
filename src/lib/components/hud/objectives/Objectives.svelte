<script lang="ts">
  import Todo from "./Todo.svelte";
  import { Goal } from "$components/svg/icons/hud";
  import { Lol } from "$components/text";
  import { hudApi } from "$apis";

  let { class: extraClass }: { class?: string } = $props();

  let showTodos = $state(true);
</script>

{#if $hudApi.currentObjective}
  <div class="hud-objectives {extraClass}">
    <button
      onclick={() => (showTodos = !showTodos)}
      class="button-hud flex flex-row"
    >
      <Goal class="w-[33px] h-[33px]" />
      <Lol
        key={$hudApi.currentObjective.key}
        class="text-bold text-2xl mx-2 {$hudApi.currentObjective.completed
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
{/if}

<style>
  button {
    pointer-events: auto;
  }
  .hud-objectives {
    position: absolute;
    padding: 0.44em;
  }
</style>
