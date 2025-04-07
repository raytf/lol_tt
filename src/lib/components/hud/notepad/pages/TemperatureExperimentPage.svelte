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
  import { analysis } from "$dialog/chapter3";

  const datasets2 = [
    {
      // label: $lolApi.getText("np-p-exp_title"),
      data: [
        { x: 6.59, y: 300 },
        { x: 4.63, y: 800 },
        { x: 3.66, y: 1300 },
        { x: 3.01, y: 1800 },
        { x: 2.52, y: 2300 },
      ],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      // label: $lolApi.getText("np-p-exp_title"),
      data: [
        { x: 6.64, y: 300 },
        { x: 4.59, y: 800 },
        { x: 3.73, y: 1300 },
        { x: 2.95, y: 1800 },
        { x: 2.69, y: 2300 },
      ],
      fill: false,
      borderColor: "rgb(255, 99, 132)",
      tension: 0.1,
    },
  ];

  const datasets3 = [
    ...datasets2,
    {
      // label: $lolApi.getText("np-p-exp_title"),
      data: [
        { x: 6.7, y: 300 },
        { x: 4.69, y: 800 },
        { x: 3.77, y: 1300 },
        { x: 9.09, y: 1800 },
        { x: 12.55, y: 2300 },
      ],
      fill: false,
      borderColor: "rgb(255, 69, 0)",
      tension: 0.1,
    },
  ];

  let data = {
    datasets: datasets2,
  };

  let data3 = {
    datasets: datasets3,
  };
</script>

{#if $notepadApi.currentPage.type === "experiment"}
  <div class="flex gap-2">
    <SmButton step="sm-e" />
    <Lol key="np-t-exp_title" class="font-bold underline" />
  </div>
  <div class="grid grid-cols-3">
    <div class="col-span-1">
      <div class="flex gap-2">
        <button
          onclick={() => {
            $infoApi.openModal({
              textKeys: ["ind-variable_desc-1"],
              onClose: () => {},
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
              textKeys: ["dep-variable_desc-1"],
              onClose: () => {},
            });
          }}
          class="flex hover:font-bold pointer-events-auto"
        >
          <InfoButton /><Lol key="dep-variable" />:
        </button>
        <Lol key="temperature" />
      </div>

      {#if $objectivesApi.hasCompleted("obj_pressure-plan")}
        <table class="table-auto -mt-[4px] pointer-events-auto">
          <tbody>
            <tr>
              <th class="">{$lolApi.getText("depth")} (m)</th>
              <th class="" colspan="3">{$lolApi.getText("temperature")} (°C)</th
              >
            </tr>
            <tr>
              <th></th>
              <th class="">{$lolApi.getText("trial")} 1</th>
              <th class="">{$lolApi.getText("trial")} 2</th>
              <th class="">{$lolApi.getText("trial")} 2</th>
            </tr>
            {#each $notepadApi.currentPage.rows as row}
              <tr class={cn(row.class, "transition-[font-weight]")}>
                <td>{row.data[0]}</td>
                <td>{row.data[1]}</td>
                <td>{row.data[2]}</td>
                <td>{row.data[3]}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>

    <div class="col-span-2 flex flex-col items-center h-[252px]">
      {#if $objectivesApi.hasCompleted("obj_temp-experiment-2")}
        <SmButton step="sm-a" class="mb-[6px]" />
        {#if $notepadApi.currentPage.showGraph}
          <Scatter
            data={$objectivesApi.hasCompleted("obj_temp-experiment-3")
              ? data3
              : data}
            options={{
              showLine: true,
              elements: {
                point: {
                  radius: 4,
                  // backgroundColor: "rgb(75, 192, 192)",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: `${$lolApi.getText("temperature")} (°C)`,
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
              if ($notepadApi.currentPage.type === "experiment") {
                $notepadApi.currentPage.showGraph = true;
                $hudApi.startDialog({
                  keys: analysis,
                  onFinished: () => {
                    $objectivesApi.completeTask("task_temp-analysis");
                  },
                });
              }
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
