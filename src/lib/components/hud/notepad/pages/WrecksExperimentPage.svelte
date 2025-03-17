<script lang="ts">
  import { Lol } from "$components/text";
  import { SmButton } from "$components/hud/notepad";
  import { notepadApi, infoApi } from "$apis";
</script>

{#if $notepadApi.currentPage.type === "table"}
  <div class="flex gap-2">
    <SmButton step="sm-e" />
    <Lol key="np-wrecks-experiment_title" class="font-bold underline" />
  </div>

  <table class="table-auto w-full">
    <tbody>
      <tr>
        <th><Lol key="np-wrecks-experiment_header-depth" /></th>
        <th><Lol key="np-wrecks-experiment_header-color" /></th>
      </tr>
      {#each $notepadApi.currentPage.rows as row}
        <tr>
          <td><Lol key={row[0]} /></td>
          <td><Lol key={row[1]} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
  {#if $notepadApi.currentPage.rows.length === 3}
    <div class="flex gap-2">
      <SmButton step="sm-a" /><Lol key="analyze" />
    </div>
  {/if}
{/if}

<style>
  th,
  td {
    border: 1px solid black;
    padding: 0 0.25em;
  }
</style>
