<script lang="ts">
  import { fade } from "svelte/transition";

  let {
    reveal = true,
    height = 576,
    values = [0, 50, 100],
    unit = "m",
  }: {
    reveal?: boolean;
    height?: number;
    values?: number[];
    unit?: string;
  } = $props();

  let lastIdx = values.length - 1;
  let max = values[lastIdx];
  let increment = 100 / lastIdx;
</script>

{#if reveal}
  <div
    transition:fade
    class="absolute w-full top-[11px] pointer-events-none select-none z-[2]"
    style="height: {height}px;"
  >
    <div
      class="absolute h-full border-l-4 border-black bottom-0 right-[222px]"
    ></div>
    <div class="relative size-full">
      {#each values as value, i}
        <div
          class="absolute w-[22px] border-b-4 border-black right-[222px]"
          style="bottom: {i * increment}%;"
        >
          <p class="absolute right-8 top-[-11px] text-black text-lg font-bold">
            {value}{unit}
          </p>
        </div>
      {/each}
    </div>
  </div>
{/if}
