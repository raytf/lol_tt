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
    <Lol key="np-t-exp_title" class="font-bold underline" />
  </div>
  <div class="">
    <div class="flex flex-col">
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
    </div>

    <div class="">
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
