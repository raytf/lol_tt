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

  let increment = 100 / (values.length - 1);
</script>

{#if reveal}
  <div
    transition:fade
    class="absolute w-full h-[{height - 4}px] bottom-0 z-[2]"
  >
    <div
      class="absolute h-full border-l-4 border-black bottom-0 right-[222px]"
    ></div>
    <div class="absolute size-full">
      {#each values as value, i}
        <div
          class="absolute w-[22px] border-b-4 border-black bottom-[{i *
            increment}%] right-[222px]"
        >
          <p
            class="absolute right-4 {i === 0
              ? 'bottom-0'
              : 'top-0'} text-black text-lg font-bold"
          >
            {value}{unit}
          </p>
        </div>
      {/each}
    </div>
  </div>
{/if}
