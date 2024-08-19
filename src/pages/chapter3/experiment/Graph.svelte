<script>
  import { draw } from "svelte/transition";
  import { onMount } from "svelte";

  let show = $state(false);
  onMount(() => {
    show = true;
  });
</script>

<svg width="555" height="222">
  <!-- x axis -->
  <line x1="0" x2="300" y1="300" y2="300"></line>
  <g class="x" transform="translate(0,320)">
    <text x="0">0</text>
    <text x="75">50</text>
    <text x="150">100</text>
    <text x="225">150</text>
    <text x="300">200</text>
  </g>
  <text x="120" y="350">Depth (m)</text>

  <!-- y axis -->
  <line x1="0" x2="0" y1="0" y2="300"></line>
  <g class="y" transform="translate(-10,0)">
    <text y="300">0</text>
    <text y="240">5</text>
    <text y="180">10</text>
    <text y="120">15</text>
    <text y="60">20</text>
    <text y="0">25</text>
  </g>
  <text x="-200" y="-40" transform="rotate(270)">Pressure (atm)</text>

  <!-- data -->
  {#if show}
    <polyline
      transition:draw={{ duration: 2000 }}
      style="stroke: red; stroke-width: 2"
      points="
		0,288
		75,228
		150,168
		225,108
		300,48
	"
    ></polyline>
  {/if}
</svg>

<style>
  svg {
    overflow: visible;
    margin: 3em;
  }

  line,
  polyline {
    fill: none;
    stroke: black;
  }

  .x text {
    text-anchor: middle;
  }

  .y text {
    text-anchor: end;
  }
</style>
