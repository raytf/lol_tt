<script>
  import sub from "$assets/sprites/sub.png";

  let { x = 0, y = 0, scaleX = 1, class: extraClass = "", ...props } = $props();
</script>

<div
  class="absolute {extraClass}"
  style="transform: translate({x}px, {y}px)"
  {...props}
>
  <img
    src={sub}
    alt="sub"
    class="select-none w-[111px] h-[111px]"
    style="transform: translate(-55px, -55px) scale({scaleX}, 1)"
  />
</div>
