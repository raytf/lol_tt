<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import { hudApi, dialogApi } from "$apis";

  let { class: extraClass }: { class?: string } = $props();
</script>

{#if $hudApi.showDialog}
  <Dialog
    top={true}
    keys={$dialogApi.currentDialog}
    onFinished={() => {
      $hudApi.showDialog = false;
      $dialogApi.resetDialog();
    }}
    class={extraClass}
  />
{/if}
