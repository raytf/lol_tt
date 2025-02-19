<script lang="ts">
  import { gameApi } from "$apis";
</script>

<button
  onclick={() => {
    $gameApi.fadeScene("/abyss");
  }}
  class="absolute top-4 left-4 pointer-events-auto z-[10]"
>
  Back
</button>
<video src="tt_vent.mp4" class="size-full" autoplay loop>
  <track kind="captions" />
</video>
