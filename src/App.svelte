<script lang="ts">
  import Router from "svelte-spa-router"
  import routes from "./routes"
</script>

<main>
  <div class="content">
    <Router {routes} />
  </div>
</main>

<style>
  main {
    position: relative;
    /* Magic css number for enforcing 16:9 aspect ratio */
    padding-bottom: 56.25%;
    overflow: hidden;
  }
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: 100vh;
  }
</style>