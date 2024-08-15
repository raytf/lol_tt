<script lang="ts">
  import Router from "svelte-spa-router";
  // Components
  import Fader from "$components/ui/Fader.svelte";
  import Inventory from "$components/inventory";
  // Apis
  import { createLolApi } from "$apis/lol.svelte";
  import { createGameApi } from "$apis/game.svelte";
  import { createAudioApi } from "$apis/audio.svelte";
  import { createInventoryApi } from "$apis/inventory.svelte";
  import routes from "./routes";

  import { gsap } from "gsap";
  import { SplitText } from "gsap/SplitText";
  import { TextPlugin } from "gsap/TextPlugin";

  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(TextPlugin);

  createLolApi();
  createGameApi();
  createAudioApi();
  createInventoryApi();
</script>

<main>
  <div class="container">
    <div class="content">
      <Fader />
      <Inventory />
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
