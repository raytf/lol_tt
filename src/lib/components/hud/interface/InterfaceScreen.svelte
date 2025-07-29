<script lang="ts">
  import { fade } from "svelte/transition";
  import { Lol } from "$components/text";
  import { Warning } from "$components/svg/icons";
  import { cn } from "$lib/utils";
  import { interfaceApi } from "$apis";
  import { coords } from "$stores/sub";

  let {
    class: extraClass,
  }: {
    class?: string;
  } = $props();
</script>

<div class={cn("absolute size-full", extraClass)}>
  <div class="bottom-0 right-0">
    <p>{coords.current.x}</p>
    <p>{coords.current.y}</p>
  </div>
  {#if $interfaceApi.revealWarning}
    <div
      transition:fade
      class={cn(
        "absolute w-full bottom-[4%]",
        "flex flex-col justify-center items-center gap-2",
      )}
    >
      <div
        class={cn(
          "flex items-center gap-1",
          $interfaceApi.currentLevel === "warning" && "text-yellow-400",
          $interfaceApi.currentLevel === "danger" && "text-red-500",
        )}
      >
        <Warning />
        <Lol
          key={$interfaceApi.currentLevel}
          class={cn("uppercase text-2xl")}
        />
      </div>
      {#each $interfaceApi.warningList as warning}
        <div transition:fade>
          <Lol
            key={warning.text}
            class={cn(
              "text-xl",
              warning.level === "warning" && "text-yellow-400",
              warning.level === "danger" && "text-red-500",
            )}
          />
        </div>
      {/each}
    </div>
  {/if}
</div>
