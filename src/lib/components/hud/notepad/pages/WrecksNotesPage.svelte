<script lang="ts">
  import { Lol } from "$components/text";
  import { Observation } from "$components/svg/icons/sm";
  import { SmButton } from "$components/hud/notepad";
  import { notepadApi, infoApi } from "$apis";
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
  {#if $notepadApi.currentPage.lines.length > 2}
    <br />
    <SmButton step="sm-h" />
    <Lol key={$notepadApi.currentPage.lines[2]} class="text-left" />
  {/if}
{/if}
