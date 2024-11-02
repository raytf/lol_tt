<script lang="ts">
  import { gsap } from "gsap";
  import { lolApi } from "$apis/lol.svelte";

  let {
    titleKey,
    descKey,
    onComplete,
  }: {
    titleKey: string;
    descKey: string;
    onComplete: () => void;
  } = $props();

  let tl = gsap.timeline({ onComplete: onComplete });
  $effect(() => {
    gsap.set([".intro-title", ".intro-desc"], { opacity: 0 });
    tl.to(
      ".intro-title",
      { opacity: 1, scale: 1.2, duration: 3, ease: "power2.inout" },
      0,
    );
    tl.to(
      ".intro-desc",
      { opacity: 1, scale: 1.2, duration: 2, ease: "power2.inout" },
      1,
    );
  });
</script>

<div class="container-title">
  <h1 class="intro-title text-4xl m-4">{$lolApi.getText(titleKey)}:</h1>
  <h2 class="intro-desc text-xl">{$lolApi.getText(descKey)}</h2>
</div>

<style>
  .container-title {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: black;
    z-index: 1000;
  }
</style>
