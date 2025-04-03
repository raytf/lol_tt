<script lang="ts">
  import { Chart, Tooltip, type ChartData, type ChartOptions } from "chart.js";
  import chartTrendline from "chartjs-plugin-trendline";
  import type { HTMLCanvasAttributes } from "svelte/elements";

  import "chart.js/auto";

  interface Props extends HTMLCanvasAttributes {
    data: ChartData<"scatter", { x: number; y: number }[], string>;
    options: ChartOptions<"scatter">;
  }

  const { data, options, ...rest }: Props = $props();

  Chart.register(Tooltip);
  Chart.register(chartTrendline);

  let canvasElem: HTMLCanvasElement;
  let chart: Chart;

  $effect(() => {
    chart = new Chart(canvasElem, {
      type: "scatter",
      data,
      options,
    });

    return () => {
      chart.destroy();
    };
  });

  $effect(() => {
    if (chart) {
      chart.data = data;
      chart.update();
    }
  });
</script>

<canvas bind:this={canvasElem} {...rest}></canvas>
