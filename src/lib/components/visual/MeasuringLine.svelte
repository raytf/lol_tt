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
    offset = "right-[333px]",
  }: {
    reveal?: boolean;
    height?: number;
    values?: number[];
    unit?: string;
    class?: string;
    style?: string;
    offset?: string;
  } = $props();

  let lastIdx = values.length - 1;
  let max = values[lastIdx];
  let increment = 100 / lastIdx;
</script>

{#if reveal}
  <div
    transition:fade
    class={cn(
      "absolute w-full top-[5px] pointer-events-none select-none",
      extraClass,
    )}
    style="height: {height}px;{extraStyle}"
  >
    <div
      class={cn("absolute h-full border-l-4 border-black bottom-0", offset)}
    ></div>
    <div class="relative size-full">
      {#each values as value, i}
        <div
          class={cn("absolute w-[22px] border-b-4 border-black", offset)}
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
