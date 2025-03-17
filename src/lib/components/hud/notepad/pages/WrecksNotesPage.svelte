<script lang="ts">
  import { Lol } from "$components/text";
  import { SmButton } from "$components/hud/notepad";
  import { notepadApi, infoApi, objectivesApi } from "$apis";
  import wrecks from "$stores/wrecks.svelte";
</script>

{#if $notepadApi.currentPage.type === "custom"}
  <Lol key="np-wrecks-notes_title" class="font-bold underline" />
  {#if $notepadApi.currentPage.lines.length > 0}
    <SmButton step="sm-o" />
    <Lol key={$notepadApi.currentPage.lines[0]} class="text-left" />
  {/if}
  {#if $notepadApi.currentPage.lines.length > 1}
    <br />
    <SmButton step="sm-q" />
    <Lol key={$notepadApi.currentPage.lines[1]} class="text-left" />
  {/if}
  {#if $wrecks.hypothesisKey != ""}
    <br />
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
