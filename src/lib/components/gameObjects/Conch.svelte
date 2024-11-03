<script lang="ts">
  import conch from "$assets/characters/conch.png";
  import conch_face from "$assets/characters/conch_face.png";
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
  <img src={conch} alt="conch" class="absolute bottom-0 object-fill z-0" />
  <img
    src={conch_face}
    alt="conch_face"
    class="conch-face absolute bottom-0 object-fill z-[1] {revealFace
      ? 'opacity-100'
      : 'opacity-0'}"
  />
</button>

<style>
  .conch-face {
    transition: opacity 1s;
  }
</style>
