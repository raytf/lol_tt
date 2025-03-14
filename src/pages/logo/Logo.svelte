<script>
  import { Checkbox, Button } from "flowbite-svelte";
  import { Lol } from "$components/text";
  import { audioApi, gameApi } from "$apis";

  let playIntro = $state(true);

  function start() {
    if (playIntro) {
      $gameApi.fadeScene("/newspaper");
    } else {
      $gameApi.fadeScene("/title");
    }
  }
</script>

<div class="size-full bg-black flex flex-col justify-center items-center">
  <div>dotdothorse</div>
  <div class="flex flex-col gap-2">
    <Checkbox checked={playIntro} onchange={() => (playIntro = !playIntro)}
      ><Lol key="play-intro" class="text-white" /></Checkbox
    >
    <Button onclick={start}><Lol key="start" /></Button>
  </div>
</div>
