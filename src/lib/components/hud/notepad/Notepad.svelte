<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { Close, NewPage } from "$components/svg/icons";
  import { Left, Right } from "$components/svg/icons/caret";
  import { notepadApi, hudApi, lolApi, objectivesApi } from "$apis";
  import Dive from "$components/svg/icons/Dive.svelte";

  let {
    class: extraClass,
  }: {
    class?: string;
  } = $props();

  const disabledClass = "pointer-events-none opacity-50";

  function onClose() {
    $hudApi.showNotepad = false;
  }

  function newPage() {
    if (!$objectivesApi.currentObjective) return;

    if ($objectivesApi.currentObjective.key === "obj_prepare") {
      if (!$objectivesApi.hasCompleted("obj_prepare")) {
        $notepadApi.startObservationsPage("notepad-title_observations");
        newPageEnabled = false;
      }
    }
  }

  onMount(() => {
    if (
      $objectivesApi.currentObjective &&
      $objectivesApi.currentObjective.key === "obj_prepare"
    ) {
      $objectivesApi.completeTask("task_open-notepad");
      newPageEnabled = true;
    }
  });

  let newPageEnabled = $state(false);
</script>

{#key $notepadApi.currentPage}
  <div class="absolute paper {extraClass}">
    <div class="absolute w-full h-[44px] pointer-events-auto">
      <button onclick={onClose} class="absolute top-1 left-1">
        <Close class="w-[33px] h-[33px] text-white" />
      </button>
      <div
        class="absolute top-1 left-[40%] flex justify-center items-center text-white"
      >
        <button
          onclick={() => $notepadApi.prevPage()}
          class="s {$notepadApi.currentPageIndex === 0 && disabledClass}"
        >
          <Left class="w-[33px] h-[33px] " />
        </button>
        <p>{$notepadApi.currentPageIndex + 1}/{$notepadApi.pages.length}</p>
        <button
          onclick={() => $notepadApi.nextPage()}
          class="s {$notepadApi.currentPageIndex ===
            $notepadApi.pages.length - 1 && disabledClass}"
        >
          <Right class="w-[33px] h-[33px] " />
        </button>
      </div>
      <button
        onclick={newPage}
        class="absolute top-1 right-1 {newPageEnabled && disabledClass}"
      >
        <NewPage class="w-[33px] h-[33px] text-white" />
      </button>
    </div>
    <div class="section-text size-full">
      {#if $notepadApi.currentPage.type === "cover"}
        {@render coverPage()}
      {:else if $notepadApi.currentPage.type === "text"}
        {@render textPage()}
      {/if}
    </div>
  </div>
{/key}

{#snippet coverPage()}
  <p class="mt-6 text-title text-center text-5xl">
    {$notepadApi.currentPage.title}
  </p>
  <br />
  {#each $notepadApi.currentPage.lines as line}
    <p class="absolute">{line}</p>
    <br />
    <br />
  {/each}
{/snippet}

{#snippet textPage()}
  <p class="mt-12 text-title">
    {$notepadApi.currentPage.title}
  </p>
  {#each $notepadApi.currentPage.lines as line}
    <p>{line}</p>
  {/each}
{/snippet}

<style>
  .paper {
    color: black;
    font-family: Caveat, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-size: 24px;
    user-select: none;

    background-image: linear-gradient(
        180deg,
        #6a2a1b,
        #6a2a1b 9%,
        transparent calc(9% + 2px)
      ),
      linear-gradient(
        90deg,
        transparent,
        transparent 12%,
        #f5c492 0,
        #f5c492 calc(12% + 2px),
        transparent calc(12% + 2px),
        transparent calc(12% + 6px),
        #f5c492 calc(12% + 6px),
        #f5c492 calc(12% + 8px),
        transparent calc(12% + 8px),
        transparent
      ),
      linear-gradient(180deg, #fbee9f 22%, transparent 0),
      repeating-linear-gradient(
        180deg,
        #c9d798,
        #c9d798 2px,
        transparent 0,
        transparent 36px
      ),
      linear-gradient(#fbee9f, #fbee9f);
  }
  .section-text {
    position: absolute;
    max-height: 100%;
    padding: 1em 1em 1em 3em;
    line-height: 1.5em;
    overflow: hidden;
    pointer-events: none;
  }
  .text-title {
    font-weight: 700;
    text-decoration: underline;
  }
</style>
