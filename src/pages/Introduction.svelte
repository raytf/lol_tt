<script lang="ts">
  import { gsap } from "gsap";
  import { SplitText } from "gsap/SplitText";
  import { getLolApi } from "$apis/lol.svelte";
  import { getGameApi } from "$apis/game.svelte";
  import LanguageLoader from "$lib/components/LanguageLoader.svelte";
  import { Next } from "$components/svg/icons";
  import ocean from "$assets/ocean.jpg";

  const lolApi = getLolApi();
  const gameApi = getGameApi();

  const textKeys = ["intro_1", "intro_2", "intro_3", "intro_4", "intro_5"];
  let textIndex = $state(0);

  $effect(() => {
    gsap.set(".bg-image", { scale: 1.5 });

    const tlReveal = gsap.timeline();
    tlReveal.to(
      ".bg-shadow",
      {
        opacity: 0.4,
        duration: 44,
      },
      0,
    );
    tlReveal.to(".button-next", { opacity: 1, duration: 1 }, 1);
    tlReveal
      .to(
        ".bg-image",
        {
          scale: 1,
          duration: 44,
        },
        0,
      )
      .to(".bg-image", {
        scale: 1.02,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
  });

  const tls: gsap.core.Timeline[] = [];
  $effect(() => {
    const paragraphs = document.querySelectorAll(".text-intro");
    paragraphs.forEach((paragraph) => {
      const split = new SplitText(paragraph, { type: "chars" });
      const tl = gsap.timeline({ paused: true });
      tl.from(split.chars, {
        duration: 1,
        y: 11,
        opacity: 0,
        stagger: 0.05,
      });
      tls.push(tl);
    });
  });

  $effect(() => {
    if (textIndex < textKeys.length) {
      tls[textIndex].play();
    } else {
      gameApi.fadeScene("/title");
    }
  });
</script>

<LanguageLoader />
<button onclick={() => (textIndex += 1)} class="size-full">
  <img src={ocean} alt="ocean" class="bg-image size-full" />
  <div class="bg-shadow size-full"></div>
  <div class="container-text size-full">
    {#each textKeys as key, i}
      <p
        id="text-intro_{i}"
        class="text-intro {i === 4 ? 'text-2xl font-bold' : 'text-xl'} p-4"
      >
        {lolApi.getText(key)}
      </p>
    {/each}
    <Next class="button-next m-4 w-[44px] h-[44px] opacity-0" />
  </div>
</button>

<style>
  .bg-image {
    position: absolute;
    z-index: -2;
  }
  .bg-shadow {
    position: absolute;
    background: black;
    z-index: -1;
  }
  .container-text {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
