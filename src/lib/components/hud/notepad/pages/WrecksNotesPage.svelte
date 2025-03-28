<script lang="ts">
  import { Lol } from "$components/text";
  import { SmButton } from "$components/hud/notepad";
  import { notepadApi, infoApi, objectivesApi } from "$apis";
  import wrecks from "$stores/wrecks.svelte";
</script>

{#if $notepadApi.currentPage.type === "custom"}
  <Lol key="np-wrecks-notes_title" class="font-bold underline" />

  <SmButton step="sm-o" />
  {#each $notepadApi.currentPage.lines as line}
    <Lol key={line} class="text-left" />
  {/each}

  {#if $wrecks.questionKey != ""}
    <SmButton step="sm-q" />
    <Lol key={$wrecks.questionKey} class="text-left" />
  {/if}

  {#if $wrecks.hypothesisKey != ""}
    <SmButton step="sm-h" />
    {#if $objectivesApi.hasCompleted("obj_wrecks-review")}
      <Lol
        key={$wrecks.hypothesisKey}
        class="text-left {$wrecks.hypothesisCorrect
          ? 'underline decoration-green-500'
          : 'line-through decoration-red-500'}"
      />
    {:else}
      <Lol key={$wrecks.hypothesisKey} class="text-left" />
    {/if}
  {/if}
{/if}
