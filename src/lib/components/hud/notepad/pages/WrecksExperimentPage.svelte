<script lang="ts">
  import { Lol } from "$components/text";
  import { SmButton } from "$components/hud/notepad";
  import { notepadApi, infoApi, hudApi, objectivesApi } from "$apis";
  import {
    wrecksAnalysis,
    wrecksCorrect,
    wrecksIncorrect,
  } from "$dialog/chapter1";
  import wrecks from "$stores/wrecks.svelte";
  import { cn } from "$lib/utils";
</script>

{#if $notepadApi.currentPage.type === "table"}
  <div class="flex gap-2">
    <SmButton step="sm-e" />
    <Lol key="np-wrecks-experiment_title" class="font-bold underline" />
  </div>

  <table class="table-auto w-full">
    <tbody>
      <tr>
        <th><Lol key="np-wrecks-experiment_header-depth" /></th>
        <th><Lol key="np-wrecks-experiment_header-color" /></th>
      </tr>
      {#each $notepadApi.currentPage.rows as row}
        <tr class={cn(row.class, "transition-[font-weight]")}>
          <td><Lol key={row.data[0]} /></td>
          <td><Lol key={row.data[1]} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
  {#if $notepadApi.currentPage.rows.length === 3}
    <div class="flex gap-2">
      <SmButton step="sm-a" />
      <button
        onclick={() => {
          $objectivesApi.completeTask("task_wrecks-analysis");
          $hudApi.startDialog({
            keys: [
              ...wrecksAnalysis,
              ...($wrecks.hypothesisCorrect ? wrecksCorrect : wrecksIncorrect),
            ],
            onFinished: () => {
              $notepadApi.addLine("ch1_conclusion");
              $objectivesApi.completeTask("task_wrecks-conclusion");
            },
          });
        }}
        class={cn(
          "border border-black rounded pl-1 pr-2",
          "hover:bg-black hover:text-white",
          "pointer-events-auto",
        )}
      >
        <Lol key="start" />
      </button>
    </div>
  {/if}
  {#if $notepadApi.currentPage?.lines.length > 0}
    <SmButton step="sm-c" />
    <Lol key={$notepadApi.currentPage?.lines[0]} class="text-left" />
  {/if}
{/if}

<style>
  th,
  td {
    border: 1px solid black;
    padding: 0 0.25em;
  }
</style>
