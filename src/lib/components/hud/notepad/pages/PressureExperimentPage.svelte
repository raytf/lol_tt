<script lang="ts">
  import { Lol } from "$components/text";
  import { SimpleButton, InfoButton } from "$components/ui/button";
  import { Line, Scatter } from "$components/ui/chart";
  import { SmButton } from "$components/hud/notepad";
  import {
    infoApi,
    objectivesApi,
    inventoryApi,
    hudApi,
    notepadApi,
    lolApi,
  } from "$apis";
  import {
    tool,
    analyze,
    hCorrect,
    hIncorrect,
    linear,
  } from "$dialog/chapter2";
  import { cn } from "$lib/utils";

  let data = {
    datasets: [
      {
        // label: $lolApi.getText("np-p-exp_title"),
        data: [
          { x: 101.33, y: 0 },
          { x: 607.95, y: 50 },
          { x: 1114.58, y: 100 },
          { x: 1621.21, y: 150 },
          { x: 2127.84, y: 200 },
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        trendlineLinear: {},
      },
    ],
  };
</script>

{#if $notepadApi.currentPage.type === "experiment"}
  <div class="flex gap-2">
    <SmButton step="sm-e" />
    <Lol key="np-p-exp_title" class="font-bold underline" />
  </div>
  <div class="grid grid-cols-3">
    <div class="col-span-1">
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

    <div class="col-span-2 flex flex-col items-center h-[252px]">
      {#if $objectivesApi.hasCompleted("obj_pressure-experiment")}
        <SmButton step="sm-a" class="mb-[6px]" />
        {#if $notepadApi.currentPage.showGraph}
          <Scatter
            {data}
            options={{
              elements: {
                point: {
                  radius: 4,
                  backgroundColor: "rgb(75, 192, 192)",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: `${$lolApi.getText("pressure")} (kPa)`,
                    font: { size: 22 },
                  },
                  position: "top",
                  // min: 0,
                  // max: 2000,
                },
                y: {
                  title: {
                    display: true,
                    text: `${$lolApi.getText("depth")} (m)`,
                    font: { size: 22 },
                  },
                  reverse: true,
                  min: 0,
                  max: 250,
                },
              },
              plugins: {
                legend: {
                  display: false,
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

              if ($notepadApi.currentPage.type === "experiment") {
                $notepadApi.seethrough = false;
                $notepadApi.opacity = 80;
              }
              $hudApi.startDialog({
                keys: [
                  ...analyze,
                  ...(hypothesisCorrect ? hCorrect : hIncorrect),
                  ...linear,
                ],
                onFinished: () => {
                  if ($notepadApi.currentPage.type === "experiment") {
                    $notepadApi.seethrough = true;
                  }
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
    <div class="text-center mt-2">
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
