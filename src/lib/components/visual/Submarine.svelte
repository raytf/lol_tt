<script>
  import sub from "$assets/sprites/sub.png";

  let { scaleX = 1, class: extraClass = "", ...props } = $props();
</script>

<div class="absolute {extraClass}" {...props}>
  <img
    src={sub}
    alt="sub"
    class="w-[111px] h-[111px]"
    style="transform: translate(-55px, -55px) scale({scaleX}, 1)"
  />
</div>
