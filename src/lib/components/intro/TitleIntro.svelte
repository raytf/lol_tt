<script lang="ts">
  import { gsap } from "gsap";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

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

<div
  class="container-title size-full flex flex-col justify-center items-center"
>
  <h1 class="intro-title text-4xl m-4">{lolApi.getText(titleKey)}:</h1>
  <h2 class="intro-desc text-xl">{lolApi.getText(descKey)}</h2>
</div>
