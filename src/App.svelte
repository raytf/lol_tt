<script lang="ts">
  import Router from "svelte-spa-router";
  // Components
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import Fader from "$components/ui/Fader.svelte";
  import { Hud } from "$components/hud";
  import routes from "./routes";

  import { gsap } from "gsap";
  import { SplitText } from "gsap/SplitText";
  import { TextPlugin } from "gsap/TextPlugin";
  import { Flip } from "gsap/Flip";
  import { CustomEase } from "gsap/CustomEase";
  import { CustomWiggle } from "gsap/CustomWiggle";

  gsap.registerPlugin(SplitText, TextPlugin, Flip, CustomEase, CustomWiggle);
</script>

<main>
  <div class="container">
    <div class="content">
      <SvelteToast options={{ intro: { x: -111 } }} />
      <Fader />
      <Hud />
      <Router {routes} />
    </div>
  </div>
</main>

<style>
  :global(._toastContainer) {
    position: absolute !important;
    --toastContainerLeft: 1rem;
    --toastContainerRight: auto;
  }
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
