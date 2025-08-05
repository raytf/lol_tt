<script lang="ts">
  import { onMount } from "svelte";
  import { querystring } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import { Dialog } from "$components/hud/dialog";
  import { TurbulentImg } from "$components/ui/img";
  import { SimpleButton } from "$components/ui/button";
  import ocean from "$assets/title/tritons-triangle.jpg";
  import { gameApi, lolApi, audioApi, hudApi } from "$apis";
  import { tlSlowRevealBackground } from "./animations";
  import { intro } from "./dialog";

  onMount(() => {});

  function onPlay() {
    tlSlowRevealBackground(4);
    $gameApi.fadeScene("/surface?title", 2, 2);
  }
</script>

<div id="pg-title" class="size-full">
  <TurbulentImg
    src={ocean}
    duration={44}
    minFrequency={[0.01, 0.01]}
    maxFrequency={[0.012, 0.012]}
    yoyo={true}
    class="title_bg w-full h-full object-cover"
  />
  <div
    in:fade={{ duration: 1000 }}
    class="absolute w-full flex justify-center bottom-0"
  >
    <SimpleButton onclick={onPlay} class="text-center p-12 pointer-events-auto">
      <p class="text-2xl">
        {$lolApi.getText("click-to-start")}
      </p>
    </SimpleButton>
  </div>
</div>

<style>
</style>
