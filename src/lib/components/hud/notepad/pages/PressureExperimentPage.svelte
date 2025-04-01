<script lang="ts">
  import { Lol } from "$components/text";
  import { SimpleButton, InfoButton } from "$components/ui/button";
  import { SmButton } from "$components/hud/notepad";
  import {
    infoApi,
    objectivesApi,
    inventoryApi,
    hudApi,
    notepadApi,
    lolApi,
  } from "$apis";
  import { tool } from "$dialog/chapter2";
  import { cn } from "$lib/utils";
</script>

{#if $notepadApi.currentPage.type === "table"}
  <div class="flex gap-2">
    <SmButton step="sm-e" />
    <Lol key="np-p-exp_title" class="font-bold underline" />
    {#if $objectivesApi.currentObjectiveIs("obj_pressure-experiment")}
      <SimpleButton class="pointer-events-auto">
        <Lol key="start" />
      </SimpleButton>
    {/if}
  </div>
  <div class="flex gap-2">
    <button
      onclick={() => {
        $infoApi.openModal({
          textKeys: ["ind-variable_desc-1", "ind-variable_desc-2"],
          onClose: () => {
            $objectivesApi.completeTask("task_review-ind");
          },
        });
      }}
      class="flex hover:font-bold pointer-events-auto"
    >
      <InfoButton /><Lol key="ind-variable" />:
    </button>
    <Lol key="depth" />
  </div>
  <div class="flex gap-2">
    <button
      onclick={() => {
        $infoApi.openModal({
          textKeys: ["dep-variable_desc-1", "dep-variable_desc-2"],
          onClose: () => {
            $objectivesApi.completeTask("task_review-dep");
            if (!$inventoryApi.isItemUnlocked("pg")) {
              $hudApi.startDialog({
                keys: tool,
              });
            }
          },
        });
      }}
      class="flex hover:font-bold pointer-events-auto"
    >
      <InfoButton /><Lol key="dep-variable" />:
    </button>
    <Lol key="pressure" />
  </div>
  {#if $objectivesApi.hasCompleted("obj_pressure-plan")}
    <table class="table-auto -mt-[4px] pointer-events-auto">
      <tbody>
        <tr>
          <th class="">{$lolApi.getText("depth")} (m)</th>
          <th class="">{$lolApi.getText("pressure")} (kPa)</th>
        </tr>
        {#each $notepadApi.currentPage.rows as row}
          <tr class={cn(row.class, "transition-[font-weight]")}>
            <td>{row.data[0]}</td>
            <td>{row.data[1]}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
{/if}

<style>
  th,
  td {
    border: 1px solid black;
    padding: 0 0.25em;
  }
</style>
