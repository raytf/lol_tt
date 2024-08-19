<script>
  let { animated = false, class: extraClass = "", ...props } = $props();
</script>

<div class="underwater {extraClass}" {...props}>
  {#if animated}
    <div class="animated-water"></div>
    <div class="animated-water2"></div>
  {/if}
</div>

<style>
  .underwater {
    --default-top: #20a4f3;
    --default-bottom: #182b3a;
    background: linear-gradient(
      0deg,
      var(--color-bottom, --default-bottom),
      var(--color-top, --default-top)
    );
  }

  .animated-water {
    content: "";
    position: absolute;
    background: linear-gradient(
      0deg,
      var(--color-bottom, --default-bottom),
      var(--color-top, --default-top)
    );
    translate: -99% 44%;
    rotate: 44deg;
    filter: blur(44px) brightness(1.1);
    width: 44%;
    height: 44%;
    border-radius: 50%;
    animation: yoyo-x 11s alternate infinite ease-in-out;
    transform-origin: 60%;
  }

  .animated-water2 {
    content: "";
    position: absolute;
    background: linear-gradient(
      0deg,
      var(--color-bottom, --default-bottom),
      var(--color-top, --default-top)
    );
    translate: -99% 44%;
    rotate: -44deg;
    filter: blur(44px) brightness(0.9);
    width: 44%;
    height: 44%;
    border-radius: 50%;
    animation: yoyo-x 22s alternate infinite ease-in-out;
    transform-origin: 60%;
  }

  @keyframes -global-yoyo-x {
    0% {
      translate: 11% 44%;
    }
    100% {
      translate: 88% 44%;
    }
  }
</style>
