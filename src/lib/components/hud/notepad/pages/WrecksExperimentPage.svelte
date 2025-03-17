<script lang="ts">
  import { Lol } from "$components/text";
  import { Observation } from "$components/svg/icons/sm";
  import { SmButton } from "$components/hud/notepad";
  import { notepadApi, infoApi } from "$apis";
</script>

{#if $notepadApi.currentPage.type === "table"}
<Lol key="np-wrecks-experiment_title" class="font-bold underline" />
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
{/if}

<style>
    th,
  td {
    border: 1px solid black;
    padding: 0 0.25em;
  }
</style>