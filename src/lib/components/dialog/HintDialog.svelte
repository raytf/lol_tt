<script>
  import Dialog from "./Dialog.svelte";
  import shell from "$assets/avatars/shell.png";
  import { getInventoryApi } from "$apis/inventory.svelte";
  import { getGameApi } from "$apis/game.svelte";
  const inventoryApi = getInventoryApi();
  const gameApi = getGameApi();
</script>

{#if inventoryApi.showHintDialog}
  <Dialog
    keys={[
      {
        imgSrc: shell,
        name: "dialog-name_shell",
        text: `hint_${inventoryApi.currentHintIndex}`,
      },
    ]}
    onFinished={() => {
      inventoryApi.showHintDialog = false;
    }}
  />
{/if}
