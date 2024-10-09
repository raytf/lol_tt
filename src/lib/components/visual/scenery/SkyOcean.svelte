<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import ocean from "$assets/ocean_waves.jpg";

  let { start = false } = $props();

  const sunRiseTl = gsap.timeline({ paused: true });
  onMount(() => {
    sunRiseTl.to(
      ".ambient",
      {
        opacity: 1,
        duration: 11,
      },
      0,
    );
    sunRiseTl.to(
      ".sky-container .sun",
      {
        x: 0,
        y: "-88vmin",
        z: "20vmin",
        duration: 11,
      },
      0,
    );
    sunRiseTl.to(
      ".sun-reflection .sun",
      {
        x: 0,
        y: "88vmin",
        z: "20vmin",
        duration: 11,
      },
      0,
    );
    sunRiseTl.to(
      ".sun-reflection .sun",
      {
        opacity: 0.22,
        duration: 2,
      },
      1,
    );
  });

  $effect(() => {
    if (start) {
      sunRiseTl.play();
    }
  });
</script>

<div id="scenery">
  <div class="sky-container">
    <div class="sun"></div>
    <div class="ambient"></div>
  </div>
  <div class="ocean-container">
    <div class="sun-reflection">
      <div class="sun"></div>
    </div>
    <img id="ocean-image" src={ocean} alt="ocean" />
    <svg>
      <filter id="turbulence" x="0" y="0" width="100%" height="100%">
        <feTurbulence
          id="ocean-filter"
          numOctaves="3"
          seed="2"
          baseFrequency="0.02 0.05"
        />
        <feDisplacementMap scale="20" in="SourceGraphic" />
        <animate
          xlink:href="#ocean-filter"
          attributeName="baseFrequency"
          dur="11s"
          keyTimes="0;1"
          values="0.02 0.06;0.04 0.08"
          repeatCount="indefinite"
        />
      </filter>
    </svg>
  </div>
</div>

<style>
  #scenery {
    --v1: #61d0cf;
    --v2: #12a1c0;
    --v3: #5e30d9;
    --transparentv3: #5e30d900;
    --v4: #3b1895;
    --s1: #efeebc;
    --s2: #e8ed92;
    --cloud: #fea798;

    /* --n-sky1: #5b2c83;
    --n-sky2: #d1628b; */

    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    background: linear-gradient(var(--v1), var(--s1), var(--v1));
    /* background: linear-gradient(var(--n-sky1), var(--n-sky2), var(--n-sky1)); */
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
    left: 50%;
    translate: -50% 10%;

    background: #ffe;
    border-radius: 50%;
    width: 88px;
    height: 88px;
    box-shadow: 0px 0px 11px 11px #ffe;

    transform: translate3d(0, 0, 0);
  }
  .ambient {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 100%, var(--s2), transparent);
    mix-blend-mode: color-burn;
    opacity: 0;
  }
  .ocean-container {
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(#98b0fe55, var(--v2));
    box-shadow: inset 0 1px 4px -3px white;
  }
  #ocean-image {
    left: -1%;
    top: -1%;
    max-width: none;
    width: 102%;
    height: 102%;
    opacity: 0.1;
    filter: url(#turbulence);
  }
  .sun-reflection {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, var(--s2), transparent);
  }
  .sun-reflection .sun {
    top: 0;
    filter: blur(4px);
    opacity: 0;

    transform: translate3d(0, -20vmin, 0);
  }
</style>
