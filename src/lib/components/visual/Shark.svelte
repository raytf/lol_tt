<script>
  import shark from "$assets/sprites/shark.png";

  let { x = 0, y = 0, scaleX = 1, class: extraClass = "", ...props } = $props();
</script>

<div
  class="absolute {extraClass} pointer-events-none"
  style="transform: translate({x}px, {y}px)"
  {...props}
>
  <img
    src={shark}
    alt="shark"
    class="select-none w-[222px] h-[222px]"
    style="transform: translate(0px, -111px) scale({scaleX}, 1)"
  />
</div>
