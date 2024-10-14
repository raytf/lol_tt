<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { SplitText } from "gsap/SplitText";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    keys,
    class: extraClass = "",
    onFinished,
  }: {
    keys: string[];
    class?: string;
    onFinished?: () => void;
  } = $props();

  const tls: gsap.core.Timeline[] = [];
  let textIndex = $state(0);

  onMount(() => {
    const paragraphs = document.querySelectorAll(".text-overlay");
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
    playLine();
  });

  function playLine() {
    if (textIndex < keys.length) {
      tls[textIndex].play();
      lolApi.speakText(keys[textIndex]);
    } else {
      if (onFinished) onFinished();
    }
  }
</script>

<button
  onclick={() => {
    textIndex++;
    playLine();
  }}
  class="absolute size-full"
>
  <div class="container-text {extraClass}">
    {#each keys as key, i}
      <p id="text-overlay_{i}" class="text-overlay text-xl p-4">
        {lolApi.getText(key)}
      </p>
    {/each}
  </div>
</button>

<style>
  .container-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
  }
</style>
