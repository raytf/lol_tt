<script lang="ts">
  import { Lol } from "$components/text";
  import { SmButton } from "$components/hud/notepad";
  import { notepadApi, infoApi, objectivesApi } from "$apis";
  import { cn } from "$lib/utils";
</script>

{#if $notepadApi.currentPage.type === "sm"}
  <Lol key="np-forest-notes_title" class="font-bold underline" />

  <SmButton step="sm-o" />
  {#each $notepadApi.currentPage.observations as observation}
    <Lol key={observation} class="text-left" />
  {/each}

  {#if $notepadApi.currentPage.question}
    <SmButton step="sm-q" />
    <Lol key={$notepadApi.currentPage.question} class="text-left" />
  {/if}

  {#if $notepadApi.currentPage.hypothesis}
    <SmButton step="sm-h" />
    <Lol key={$notepadApi.currentPage.hypothesis} class="text-left" />
  {/if}
{/if}
