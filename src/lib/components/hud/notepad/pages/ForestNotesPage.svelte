<script lang="ts">
  import { Lol } from "$components/text";
  import { SmButton } from "$components/hud/notepad";
  import { notepadApi, infoApi, objectivesApi } from "$apis";
  import forest from "$stores/forest.svelte";
  import { cn } from "$lib/utils";
</script>

{#if $notepadApi.currentPage.type === "custom"}
  <Lol key="np-forest-notes_title" class="font-bold underline" />

  <SmButton step="sm-o" />
  {#each $notepadApi.currentPage.lines as line}
    <Lol key={line} class="text-left" />
  {/each}

  {#if $forest.questionKey != ""}
    <SmButton step="sm-q" />
    <Lol key={$forest.questionKey} class="text-left" />
  {/if}

  {#if $forest.hypothesisKey != ""}
    <SmButton step="sm-h" />
    <Lol key={$forest.hypothesisKey} class="text-left" />
  {/if}
{/if}
