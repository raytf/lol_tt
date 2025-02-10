<script>
  import { Checkbox, Button } from "flowbite-svelte";
  import { Lol } from "$components/text";
  import { audioApi, gameApi } from "$apis";

  let playIntro = $state(true);

  function start() {
    console.log($audioApi.soundEnabled);
    console.log(playIntro);
    $gameApi.fadeScene(`/title${playIntro ? "?intro" : ""}`);
  }
</script>

<div class="size-full bg-black flex flex-col items-center">
  <div>dotdothorse</div>
  <div class="flex flex-col">
    <div class="flex gap-2">
      <Checkbox
        checked={$audioApi.soundEnabled}
        onchange={() => ($audioApi.soundEnabled = !$audioApi.soundEnabled)}
        ><Lol key="sound-enabled" class="text-white" /></Checkbox
      >
    </div>
    <div class="flex gap-2">
      <Checkbox checked={playIntro} onchange={() => (playIntro = !playIntro)}
        ><Lol key="play-intro" class="text-white" /></Checkbox
      >
    </div>
    <Button onclick={start}><Lol key="start" /></Button>
  </div>
</div>
