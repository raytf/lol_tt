<script lang="ts">
  import { Lol } from "$components/text";
  import {Observation} from "$components/svg/icons/sm"
  import {SmButton} from "$components/hud/notepad";
  import {notepadApi, infoApi} from "$apis";
</script>

{#if $notepadApi.currentPage.type === "custom"}
  <Lol key="np-wrecks_title" class="font-bold underline" />
  {#if $notepadApi.currentPage.lines.length > 0}
  <div class="flex">
    <SmButton step="sm-o" />
    <Lol key={$notepadApi.currentPage.lines[0]} class="text-left" />
  </div>
  {/if}
{/if}