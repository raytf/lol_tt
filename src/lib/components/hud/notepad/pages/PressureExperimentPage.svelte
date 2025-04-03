<script lang="ts">
  import { Lol } from "$components/text";
  import { SimpleButton, InfoButton } from "$components/ui/button";
  import { Line } from "$components/ui/chart";
  import { SmButton } from "$components/hud/notepad";
  import {
    infoApi,
    objectivesApi,
    inventoryApi,
    hudApi,
    notepadApi,
    lolApi,
  } from "$apis";
  import { tool, analyze, hCorrect, hIncorrect } from "$dialog/chapter2";
  import { cn } from "$lib/utils";

  let data = {
    labels: ["0", "50", "100", "150"],
    datasets: [
      {
        label: $lolApi.getText("np-p-exp_title"),
        data: [101.33, 607.95, 1114.58, 1621.21],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
</script>

{#if $notepadApi.currentPage.type === "experiment"}
  <div class="grid grid-cols-3">
    <div class="col-span-1">
      <div class="flex gap-2">
        <SmButton step="sm-e" />
        <Lol key="np-p-exp_title" class="font-bold underline" />
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
    </div>

    <div class="col-span-2 flex flex-col items-center h-[265px]">
      {#if $objectivesApi.hasCompleted("obj_pressure-experiment")}
        <SmButton step="sm-a" />
        {#if $notepadApi.currentPage.showGraph}
          <Line
            {data}
            options={{
              scales: {
                y: {
                  title: {
                    display: true,
                    text: `${$lolApi.getText("pressure")} (kPa)`,
                    font: { size: 22 },
                  },
                  min: 0,
                  max: 2000,
                },
                x: {
                  title: {
                    display: true,
                    text: `${$lolApi.getText("depth")} (m)`,
                    font: { size: 22 },
                  },
                },
              },
            }}
            class="pointer-events-auto"
          />
        {:else}
          <SimpleButton
            onclick={() => {
              const hypothesis = (
                $notepadApi.getPage("forest-notes") as SMPageData
              ).hypothesis;
              const hypothesisCorrect = hypothesis === "ch2_pressure-h1";

              $hudApi.startDialog({
                keys: [
                  ...analyze,
                  ...(hypothesisCorrect ? hCorrect : hIncorrect),
                ],
                onFinished: () => {
                  $objectivesApi.completeTask("task_pressure-conclusion");
                },
              });
            }}
            class="pointer-events-auto"
            >{$lolApi.getText("analyze-data")}
          </SimpleButton>
        {/if}
      {/if}
    </div>
  </div>
  {#if $notepadApi.currentPage.showConclusion}
    <div class="text-center">
      <br />
      <div class="flex justify-center gap-2">
        <SmButton step="sm-c" />
      </div>
      <Lol key="ch2_conclusion" />
    </div>
  {/if}
{/if}

<style>
  th,
  td {
    border: 1px solid black;
    padding: 0 0.25em;
  }
</style>
