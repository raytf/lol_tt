<script>
  let { class: extraClass = "", ...props } = $props();
</script>

<div class="underwater {extraClass}" {...props}></div>

<style>
  .underwater {
    --color-top: #03e5b7;
    --color-bottom: #037ade;
    /* background: linear-gradient(0deg, #182b3a 0%, #20a4f3 100%); */
    background: linear-gradient(
      0deg,
      var(--color-bottom) 0%,
      var(--color-top) 100%
    );
  }

  .underwater::before {
    content: "";
    position: absolute;
    background: linear-gradient(0deg, var(--color-bottom), var(--color-top));
    translate: -99% 0;
    rotate: 44deg;
    filter: blur(44px) brightness(1.1);
    width: 111%;
    height: 111%;
    border-radius: 50%;
    animation: yoyo-x 11s alternate infinite ease-in-out;
    transform-origin: 60%;
  }

  .underwater::after {
    content: "";
    position: absolute;
    background: linear-gradient(0deg, var(--color-bottom), var(--color-top));
    translate: -99% 0;
    rotate: -44deg;
    filter: blur(44px) brightness(0.9);
    width: 111%;
    height: 111%;
    border-radius: 50%;
    animation: yoyo-x 22s alternate infinite ease-in-out;
    /* animation-delay: 8s; */
    transform-origin: 60%;
  }

  @keyframes -global-yoyo-x {
    0% {
      translate: -111% 0;
    }
    100% {
      translate: 111% 0;
    }
  }
</style>
