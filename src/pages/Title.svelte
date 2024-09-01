<script>
  import { SkyOcean } from "$components/visual/scenery";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();
</script>

<div id="page_title" class="size-full">
  <div id="ui" class="relative size-full flex justify-center">
    <h1 class="text-title text-6xl font-bold mt-24 p-4">
      {lolApi.getText("title")}
    </h1>
  </div>
  <SkyOcean />
</div>

<style>
  #ui {
    width: 100%;
    height: 100%;

    z-index: 1;
  }
  .text-title {
    text-shadow: 1px 1px 2px black;
  }
</style>
