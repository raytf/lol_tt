<script lang="ts">
  import { onMount, untrack } from "svelte";
  import { gsap } from "gsap";
  import { SplitText } from "gsap/SplitText";
  import { lolApi } from "$apis/lol.svelte";

  let {
    active = true,
    keys,
    class: extraClass = "",
    onFinished,
  }: {
    active?: boolean;
    keys: string[];
    class?: string;
    onFinished?: () => void;
  } = $props();

  const tls: gsap.core.Timeline[] = [];
  let textIndex = $state(0);
  let rootElement: HTMLElement;

  onMount(() => {
    const paragraphs = rootElement.querySelectorAll(".text-overlay");
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

  function playLine() {
    if (textIndex < keys.length) {
      tls[textIndex].play();
      $lolApi.speakText(keys[textIndex]);
    } else {
      if (onFinished) {
        active = false;
        onFinished();
      }
    }
  }

  $effect(() => {
    if (active) {
      untrack(() => playLine());
    }
  });
</script>

<button
  bind:this={rootElement}
  onclick={() => {
    textIndex++;
    playLine();
  }}
  class="container-text {extraClass} {active
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none'}"
>
  {#each keys as key, i}
    <p id="text-overlay_{i}" class="text-overlay text-2xl p-4">
      {$lolApi.getText(key)}
    </p>
  {/each}
</button>

<style>
  .container-text {
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;

    padding: 4em;
    transition: opacity 1s;
  }
  .text-overlay {
    text-shadow: 1px 1px 2px black;
  }
</style>
