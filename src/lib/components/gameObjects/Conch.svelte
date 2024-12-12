<script lang="ts">
  import conch from "$assets/characters/conch/shell.png";
  import smile from "$assets/characters/conch/smile.png";
  import scary from "$assets/characters/conch/scary.png";
  let {
    class: extraClass,
    style: extraStyle,
    onclick,
    onmouseenter,
    onmouseleave,
    faceRevealed = false,
  }: {
    class?: string;
    style?: string;
    onclick?: () => void;
    onmouseenter?: () => void;
    onmouseleave?: () => void;
    faceRevealed?: boolean;
  } = $props();

  let revealFace = $state(false);
</script>

<button
  class={extraClass}
  style={extraStyle}
  {onclick}
  onmouseenter={() => {
    revealFace = true;
    onmouseenter && onmouseenter();
  }}
  onmouseleave={() => {
    revealFace = false;
    onmouseleave && onmouseleave();
  }}
>
  <img src={conch} alt="conch" class="absolute bottom-0 size-full z-0" />
  <img
    src={scary}
    alt="conch_smile"
    class="conch-face absolute bottom-0 size-full z-[1] {faceRevealed ||
    revealFace
      ? 'opacity-100'
      : 'opacity-0'}"
  />
</button>

<style>
  .conch-face {
    transition: opacity 1s;
  }
</style>
