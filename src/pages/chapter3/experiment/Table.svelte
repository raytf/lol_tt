<script>
  // @ts-nocheck

  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";

  let { data, extraClass } = $props();
</script>

<Table divClass="select-none {extraClass}">
  <TableHead>
    <TableHeadCell>Depth (m)</TableHeadCell>
    <TableHeadCell>Pressure (atm)</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each data as { depth, pressure }}
      <TableBodyRow>
        <TableBodyCell>{depth}</TableBodyCell>
        <TableBodyCell>{pressure}</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
