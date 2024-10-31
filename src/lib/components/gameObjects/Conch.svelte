<script lang="ts">
  import conch from "$assets/characters/conch.png";
  import conch_face from "$assets/characters/conch_face.png";
  let {
    class: extraClass,
    style: extraStyle,
  }: { class?: string; style?: string } = $props();

  let revealFace = $state(false);
</script>

<button
  class="absolute {extraClass}"
  style={extraStyle}
  onmouseenter={() => {
    console.log("conch");
    revealFace = true;
  }}
  onmouseleave={() => {
    console.log("conch leave");
    revealFace = false;
  }}
>
  <img src={conch} alt="conch" class="absolute object-fill z-0" />
  <img
    src={conch_face}
    alt="conch_face"
    class="conch-face absolute object-fill z-[1] {revealFace
      ? 'opacity-100'
      : 'opacity-0'}"
  />
</button>

<style>
  .conch-face {
    transition: opacity 1s;
  }
</style>
