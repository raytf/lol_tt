<script>
  import { SkyOcean } from "$components/visual/scenery";
  import sub from "$assets/sprites/sub.png";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();
</script>

<div id="page_title" class="size-full">
  <div id="ui" class="relative size-full flex flex-col items-center">
    <h1 class="text-title text-6xl font-bold mt-24">
      {lolApi.getText("title")}
    </h1>
    <p class="text-title text-4xl font-bold p-4">
      {lolApi.getText("subtitle")}
    </p>
  </div>
  <SkyOcean />
  <div
    class="absolute left-1/2 -translate-x-1/2 bottom-[22%] w-[111px] h-[111px] overflow-hidden"
  >
    <img id="sub-image" src={sub} alt="sub" class="absolute bottom-[-44%]" />
  </div>
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
  #sub-image {
    animation: bob 11s linear infinite;
  }
  @keyframes bob {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(-8deg);
    }
    100% {
      transform: rotate(0);
    }
  }
</style>
