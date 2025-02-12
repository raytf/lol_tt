<script lang="ts">
  import { Modal, Checkbox, Button } from "flowbite-svelte";
  import { Lol } from "$components/text";
  import { hudApi, lolApi, audioApi, gameApi } from "$apis";

  let {
    dialogClass,
    backdropClass,
  }: {
    dialogClass?: string;
    backdropClass?: string;
  } = $props();
</script>

<Modal
  bind:open={$hudApi.openSettings}
  title={$lolApi.getText("settings")}
  placement="top-center"
  classDialog="absolute pointer-events-auto {dialogClass}"
  classBackdrop={backdropClass}
  autoclose
  outsideclose
>
  <Checkbox
    checked={$audioApi.soundEnabled}
    onchange={() => $audioApi.toggleSound()}
    ><Lol key="sound-enabled" /></Checkbox
  >
  <Checkbox
    checked={$lolApi.ttsEnabled}
    onchange={() => ($lolApi.ttsEnabled = !$lolApi.ttsEnabled)}
    ><Lol key="tts-enabled" /></Checkbox
  >
  {#if $gameApi.debugMode}
    <p>Debug Mode</p>
    <Button onclick={() => $lolApi.clearState()} class="pointer-events-auto"
      >Clear state</Button
    >
  {/if}
</Modal>
