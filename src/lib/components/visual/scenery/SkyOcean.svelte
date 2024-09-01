<div id="scenery">
  <div class="sky-container">
    <div class="sun"></div>
    <div class="ambient"></div>
  </div>
  <div class="ocean-container">
    <div class="sun-reflection">
      <div class="sun"></div>
    </div>
  </div>
</div>

<style>
  #scenery {
    /* --v1: #be91c6; */
    --v1: #61d0cf;
    /* --v2: #4bc7cf; */
    --v2: #12a1c0;
    --v3: #5e30d9;
    --transparentv3: #5e30d900;
    --v4: #3b1895;
    /* --s1: #fea798; */
    --s1: #efeebc;
    --s2: #fee154;
    --cloud: #fea798;

    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    background: linear-gradient(var(--v1), var(--s1), var(--v1));
  }
  #scenery * {
    position: absolute;
  }
  .sky-container {
    width: 100%;
    height: 50%;
  }
  .sun {
    top: 100%;
    right: 44%;

    background: white;
    border-radius: 50%;
    width: 88px;
    height: 88px;
    box-shadow: 0px 0px 11px 11px white;

    transform: translate3d(0, 0, 0);
    animation: rise 11s infinite;
  }
  .ambient {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 100%, var(--s2), transparent);
    mix-blend-mode: color-burn;

    animation: fade 11s infinite;
  }
  @keyframes fade {
    24% {
      opacity: 1;
    }
    66%,
    88% {
      opacity: 0;
    }
  }
  .ocean-container {
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(transparent, var(--v2));
    box-shadow: inset 0 1px 4px -3px white;
  }
  .sun-reflection {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, var(--s2), transparent);
    animation: fade 11s infinite;
  }
  .sun-reflection .sun {
    top: 0;
    filter: blur(4px);
    opacity: 0;

    transform: translate3d(0, -20vmin, 0);
    animation-name: rise-reflection;
  }
  @keyframes rise {
    0% {
      opacity: 0;
    }
    22% {
      opacity: 1;
    }
    100% {
      transform: translate3d(0, -88vmin, 20vmin);
    }
  }
  @keyframes rise-reflection {
    11% {
      opacity: 0;
    }
    22% {
      opacity: 0.44;
    }
    100% {
      transform: translate3d(0, 88vmin, 20vmin);
    }
  }
</style>
