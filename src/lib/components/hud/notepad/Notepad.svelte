<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { Close, NewPage } from "$components/svg/icons";
  import { Lol } from "$components/text";
  import { Left, Right } from "$components/svg/icons/caret";
  import { InfoButton } from "$components/ui/button";
  import { notepadApi, hudApi, lolApi, objectivesApi, infoApi } from "$apis";
  import Dive from "$components/svg/icons/Dive.svelte";

  let {
    class: extraClass,
  }: {
    class?: string;
  } = $props();

  const disabledClass = "pointer-events-none opacity-50";

  function onClose() {
    if ($objectivesApi.currentObjectiveIs("obj_prepare-dive")) {
      $objectivesApi.completeTask("task_review-notes");
    }
    $hudApi.showNotepad = false;
  }

  function newPage() {
    if (!$objectivesApi.currentObjective) return;

    if ($objectivesApi.currentObjectiveIs("obj_prepare-notes")) {
      $notepadApi.newPage({
        type: "text",
        titleKey: "notepad-title_wrecks-o",
        lines: [],
        delimiter: "- ",
      });
      $objectivesApi.completeTask("task_new-page");
      newPageEnabled = false;
    }
  }

  onMount(() => {
    if ($objectivesApi.currentObjectiveIs("obj_prepare-notes")) {
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
        onclick={() => newPage()}
        class="absolute top-1 right-1 {!newPageEnabled && disabledClass}"
      >
        <NewPage class="w-[33px] h-[33px] text-white" />
      </button>
    </div>
    <div class="section-text size-full">
      {#if $notepadApi.currentPage.type === "cover"}
        {@render coverPage()}
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
      {/if}
    </div>
  </div>
{/key}

{#snippet coverPage()}
  <Lol key="notepad-title_mission" class="font-bold underline" />
  <!-- <Lol key="notepad-line_look-clues" /> -->
  <Lol key="notepad-line_explore-depths" />
  <button
    onclick={() => {
      $infoApi.openModal({
        textKeys: ["tut_data.ql-1", "tut_data.ql-2"],
      });
    }}
    class="flex hover:font-bold pointer-events-auto"
  >
    <InfoButton /><Lol key="ql-data" />
  </button>
  <button
    onclick={() => {
      $infoApi.openModal({
        textKeys: ["tut_data.qn-1", "tut_data.qn-2"],
      });
    }}
    class="flex hover:font-bold pointer-events-auto"
  >
    <InfoButton /><Lol key="qn-data" />
  </button>
  <!-- <Lol key="notepad-line_ee-1" class="inline-block" /> -->
  <p class="inline-block">
    {$lolApi.getText("notepad-line_ee-1")}
    <button
      onclick={() => {
        $infoApi.openModal({
          textKeys: ["ee_desc-1", "ee_desc-2"],
        });
      }}
      class="inline-block hover:font-bold pointer-events-auto"
    >
      <InfoButton />{$lolApi.getText("ee_name")}
    </button>
  </p>
  <br />
  <br />
  <Lol key="notepad-line_ee-2" />
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
    line-height: 1.5em;
    overflow: hidden;
    pointer-events: none;
  }
</style>
