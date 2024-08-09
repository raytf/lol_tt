<script lang="ts">
  import Router from "svelte-spa-router";
  // Components
  import Fader from "$components/ui/Fader.svelte";
  // Apis
  import { createLolApi } from "$apis/lol.svelte";
  import { createGameApi } from "$apis/game.svelte";
  import { createAudioApi } from "$apis/audio.svelte";
  import routes from "./routes";

  createLolApi();
  createGameApi();
  createAudioApi();
</script>

<main>
  <div class="container">
    <div class="content">
      <Fader />
      <Router {routes} />
    </div>
  </div>
</main>

<style>
  main {
    position: relative;
    /* Magic css number for enforcing 16:9 aspect ratio */
    padding-bottom: 56.25%;
    overflow: hidden;
  }
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: 100vh;
  }
  .content {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
