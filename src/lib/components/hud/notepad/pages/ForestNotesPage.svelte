<script lang="ts">
  import { Lol } from "$components/text";
  import { SmButton } from "$components/hud/notepad";
  import { notepadApi, infoApi, objectivesApi } from "$apis";
  import forest from "$stores/forest.svelte";
</script>

{#if $notepadApi.currentPage.type === "custom"}
  <Lol key="np-forest-notes_title" class="font-bold underline" />
  {#if $notepadApi.currentPage.lines.length > 0}
    <SmButton step="sm-o" />
    <Lol key={$notepadApi.currentPage.lines[0]} class="text-left" />
  {/if}
  {#if $notepadApi.currentPage.lines.length > 1}
    <br />
    <SmButton step="sm-q" />
    <Lol key={$notepadApi.currentPage.lines[1]} class="text-left" />
  {/if}
{/if}
