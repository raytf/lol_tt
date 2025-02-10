<script lang="ts">
  import ship from "$assets/sprites/ship.png";

  let {
    class: extraClass = "",
  }: {
    class?: string;
  } = $props();

  let hovered = $state(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<button
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
  class="container-ship w-[500px] h-[250px] {extraClass}"
>
  <img
    src={ship}
    alt="ship"
    class="absolute -bottom-[10px] left-[55px] w-3/4 h-auto select-none anim-bob filter {hovered &&
      'highlight'} transition-all"
  />
</button>

<style>
  .container-ship {
    position: absolute;
    overflow: hidden;
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
