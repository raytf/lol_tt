<script lang="ts">
  import { fade } from "svelte/transition";
  import { cn } from "$lib/utils";

  let {
    reveal = true,
    height = 576,
    values = [0, 50, 100],
    unit = "m",
    class: extraClass,
    style: extraStyle = "",
  }: {
    reveal?: boolean;
    height?: number;
    values?: number[];
    unit?: string;
    class?: string;
    style?: string;
  } = $props();

  let lastIdx = values.length - 1;
  let max = values[lastIdx];
  let increment = 100 / lastIdx;
</script>

{#if reveal}
  <div
    transition:fade
    class={cn(
      "absolute w-full top-[10px] pointer-events-none select-none",
      extraClass,
    )}
    style="height: {height}px;{extraStyle}"
  >
    <div
      class="absolute h-full border-l-4 border-black bottom-0 right-[333px]"
    ></div>
    <div class="relative size-full">
      {#each values as value, i}
        <div
          class="absolute w-[22px] border-b-4 border-black right-[333px]"
          style="bottom: {i * increment}%;"
        >
          <p
            class={cn(
              "absolute right-8 top-[-11px] text-black text-lg font-bold",
              i === lastIdx && "top-0",
              i === 0 && "top-[-22px]",
            )}
          >
            {value}{unit}
          </p>
        </div>
      {/each}
    </div>
  </div>
{/if}
