<script lang="ts">
  import conch from "$assets/characters/conch/shell.png";
  import conch_smile from "$assets/characters/conch/shell_smile.png";
  let {
    class: extraClass,
    style: extraStyle,
    onmouseenter,
    onmouseleave,
  }: {
    class?: string;
    style?: string;
    onmouseenter?: () => void;
    onmouseleave?: () => void;
  } = $props();

  let revealFace = $state(false);
</script>

<button
  class="absolute {extraClass}"
  style={extraStyle}
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
    src={conch_smile}
    alt="conch_smile"
    class="conch-face absolute bottom-0 size-full z-[1] {revealFace
      ? 'opacity-100'
      : 'opacity-0'}"
  />
</button>

<style>
  .conch-face {
    transition: opacity 1s;
  }
</style>
