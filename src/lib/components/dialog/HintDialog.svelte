<script>
  import Dialog from "./Dialog.svelte";
  import shell from "$assets/avatars/shell.png";
  import { inventoryApi } from "$apis";
</script>

{#if $inventoryApi.showHintDialog}
  <div class="absolute size-full z-[22]">
    <Dialog
      keys={[
        {
          imgSrc: shell,
          name: "dialog-name_shell",
          text: $inventoryApi.currentHintKey,
        },
      ]}
      onFinished={() => {
        $inventoryApi.showHintDialog = false;
      }}
      hint={true}
    />
  </div>
{/if}
