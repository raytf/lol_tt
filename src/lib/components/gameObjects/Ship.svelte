<script lang="ts">
  import ship from "$assets/sprites/ship.png";
  import { InfoMarker } from "$components/ui/button";
  import { infoApi } from "$apis";

  let {
    class: extraClass = "",
  }: {
    class?: string;
  } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<button
  onclick={() => {
    $infoApi.openModal({
      textKey: "i_ship",
    });
  }}
  class="container-ship w-[500px] h-[250px] {extraClass}"
>
  <img
    src={ship}
    alt="ship"
    class="absolute -bottom-[10px] left-[55px] w-3/4 h-auto select-none anim-bob"
  />
  <InfoMarker class="absolute left-[222px] top-[160px] w-[55px] h-[55px]" />
</button>

<style>
  .container-ship {
    position: absolute;
    overflow: hidden;
  }

  /* .container-ship img {
    transition: filter 1s;
  } */

  .container-ship:hover img {
    filter: drop-shadow(0 0 4px white);
  }

  .anim-bob {
    animation: bob 22s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
  }
  @keyframes bob {
    0% {
      rotate: 0deg;
    }
    25% {
      rotate: 2deg;
    }
    50% {
      rotate: 0deg;
    }
    75% {
      rotate: -2deg;
    }
  }
</style>
