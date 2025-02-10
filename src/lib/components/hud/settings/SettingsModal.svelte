<script>
  import { Modal, Checkbox, Button } from "flowbite-svelte";
  import { Lol } from "$components/text";
  import { openSettings } from "../settings";
  import { lolApi, audioApi, gameApi } from "$apis";
</script>

<Modal
  bind:open={$openSettings}
  title={$lolApi.getText("settings")}
  classDialog="absolute"
  class="pointer-events-auto"
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
