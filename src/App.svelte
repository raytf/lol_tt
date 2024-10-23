<script lang="ts">
  import Router from "svelte-spa-router";
  // Components
  import Fader from "$components/ui/Fader.svelte";
  import Inventory from "$components/inventory";
  import { ScientificMethodModal } from "$components/scientificMethod";
  import { HintDialog } from "$components/dialog";
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

  const lolApi = createLolApi();
  createGameApi();
  createAudioApi();
  createInventoryApi();

  lolApi.init();
</script>

<main>
  <div class="container">
    <div class="content">
      <Fader />
      <Inventory />
      <ScientificMethodModal />
      <HintDialog />
      <Router {routes} />
    </div>
  </div>
</main>

<style>
  main {
    position: relative;
    /* Magic css number for enforcing 16:9 aspect ratio */
    /* padding-bottom: 56.25%; */
    width: 1024px;
    height: 576px;
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
