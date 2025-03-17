<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { Close, NewPage } from "$components/svg/icons";
  import { Lol } from "$components/text";
  import { Left, Right } from "$components/svg/icons/caret";
  import { CoverPage, WrecksPage } from "../notepad";
  import {
    notepadApi,
    hudApi,
    lolApi,
    objectivesApi,
    infoApi,
    gameApi,
  } from "$apis";

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

    if ($objectivesApi.hasCompleted("obj_explore-wrecks")) {
      $notepadApi.newPage("observations-depth", {
        type: "table",
        titleKey: "notepad-title_depth-o",
        header: ["th_depth-level", "th_observation"],
        rows: [],
      });
    } else {
      $notepadApi.newPage("wrecks", {
        type: "custom",
        name: "wrecks",
        lines: [],
      });
    }

    $objectivesApi.completeTask("task_new-page");
    newPageEnabled = false;
  }

  onMount(() => {
    if (
      $objectivesApi.currentObjectiveIs("obj_explore-wrecks") ||
      $objectivesApi.currentObjectiveIs("obj_prepare-notepad")
    ) {
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
        <p>{$notepadApi.currentPageIndex + 1}/{$notepadApi.numPages}</p>
        <button
          onclick={() => $notepadApi.nextPage()}
          class="s {$notepadApi.currentPageIndex === $notepadApi.numPages - 1 &&
            disabledClass}"
        >
          <Right class="w-[33px] h-[33px] " />
        </button>
      </div>
      <button
        onclick={() => newPage()}
        class="absolute top-1 right-1 {!newPageEnabled && disabledClass}"
      >
        <NewPage class="w-[33px] h-[33px] text-white" />
      </button>
    </div>
    <div class="section-text size-full">
      {#if $notepadApi.currentPage.type === "custom"}
        {#if $notepadApi.currentPage.name === "cover"}
          <CoverPage />
        {/if}
        {#if $notepadApi.currentPage.name === "wrecks"}
          <WrecksPage />
        {/if}
      {:else if $notepadApi.currentPage.type === "text"}
        <Lol
          key={$notepadApi.currentPage.titleKey}
          class="font-bold underline"
        />
        {#each $notepadApi.currentPage.lines as line}
          <div class="flex">
            {$notepadApi.currentPage?.delimiter}<Lol key={line} />
          </div>
        {/each}
      {:else if $notepadApi.currentPage.type === "table"}
        <Lol
          key={$notepadApi.currentPage.titleKey}
          class="font-bold underline"
        />
        <table class="table-auto w-full">
          <tbody>
            <tr>
              <th><Lol key={$notepadApi.currentPage.header[0]} /></th>
              <th><Lol key={$notepadApi.currentPage.header[1]} /></th>
            </tr>
            {#each $notepadApi.currentPage.rows as row}
              <tr>
                <td><Lol key={row[0]} /></td>
                <td><Lol key={row[1]} /></td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>
  </div>
{/key}

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
        transparent 8%,
        #f5c492 0,
        #f5c492 calc(8% + 2px),
        transparent calc(8% + 2px),
        transparent calc(8% + 6px),
        #f5c492 calc(8% + 6px),
        #f5c492 calc(8% + 8px),
        transparent calc(8% + 8px),
        transparent
      ),
      linear-gradient(180deg, #fbee9f 20%, transparent 0),
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
    padding: 3.3em 1em 1em 3em;
    line-height: 1.45em;
    overflow: hidden;
    pointer-events: none;
  }

  th,
  td {
    border: 1px solid black;
    padding: 0 0.25em;
  }
</style>
