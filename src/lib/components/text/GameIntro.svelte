<script lang="ts">
  import { gsap } from "gsap";
  import { SplitText } from "gsap/SplitText";
  import { getLolApi } from "$apis/lol.svelte";
  import { getGameApi } from "$apis/game.svelte";
  import { Next } from "$components/svg/icons";
  const lolApi = getLolApi();

  let {
    class: extraClass = "",
    textIndex,
    onFinished,
  }: { class: string; textIndex: number; onFinished: () => void } = $props();

  const textKeys = [
    "intro_1",
    "intro_2",
    "intro_3",
    "intro_4",
    "intro_5",
    "intro_6",
  ];

  const tls: gsap.core.Timeline[] = [];
  $effect(() => {
    const paragraphs = document.querySelectorAll(".text-intro");
    paragraphs.forEach((paragraph) => {
      const split = new SplitText(paragraph, { type: "chars,words" });
      const tl = gsap.timeline({ paused: true });
      tl.from(split.chars, {
        duration: 1,
        y: 11,
        opacity: 0,
        stagger: 0.04,
      });
      tls.push(tl);
    });
  });

  $effect(() => {
    if (textIndex < 0) return;
    if (textIndex < textKeys.length) {
      tls[textIndex].play();
      lolApi.speakText(textKeys[textIndex]);
    } else {
      onFinished();
    }
  });
</script>

<div class="container-text {extraClass}">
  {#each textKeys as key, i}
    <p
      id="text-intro_{i}"
      class="text-intro {i === textKeys.length - 1
        ? 'text-2xl font-bold'
        : 'text-xl'} p-4"
    >
      {lolApi.getText(key)}
    </p>
  {/each}
  <!-- <Next class="button-next m-4 w-[44px] h-[44px] opacity-0" /> -->
</div>

<style>
  .container-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
