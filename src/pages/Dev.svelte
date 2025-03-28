<script lang="ts">
  import { onMount } from "svelte";
  import { hudApi, notepadApi } from "$apis";
  import { missionBrief } from "$dialog/radio";
  import { SmModal } from "$components/hud/sm";
  import { Notepad } from "$components/hud/notepad";
  import { Line } from "$components/ui/chart";

  let data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  let data2 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First Dataset",
        data: [3, 5, 6, 7],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const createData = (newPoint: number) => {
    dataPoints = [...dataPoints, newPoint];
    return {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First Dataset",
          data: $state.snapshot(dataPoints),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  };

  let dataPoints = $state([3, 5, 6]);
  let dataValue = $state.raw(createData(8));

  onMount(() => {
    // $notepadApi.addTableRow("depth-shallow", "o_sunlight-surface");
    // $notepadApi.addTableRow("depth-medium", "o_color-change");
    // $notepadApi.addTableRow("depth-deep", "o_darkness");
  });
</script>

<!-- <Notepad class="absolute w-[70%] h-[88%] bottom-2 right-2" /> -->
<button
  onclick={() => {
    dataValue = createData(7);
  }}>Click</button
>
<div class="absolute bottom-0 w-[88%] h-[80%] bg-blue-200">
  <Line data={dataValue} options={{}} />
</div>
