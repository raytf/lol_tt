<script lang="ts">
  import conch from "$assets/conch/conch.png";
  import devious from "$assets/conch/conch_devious.png";
  import smile from "$assets/characters/conch/smile.png";
  import scary from "$assets/characters/conch/scary.png";
  import { showConchFace, conchLightRadius } from "$stores/conch";
  import { cn } from "$lib/utils";
  let {
    class: extraClass,
    style: extraStyle,
    onclick,
    onmouseenter,
    onmouseleave,
  }: {
    class?: string;
    style?: string;
    onclick?: () => void;
    onmouseenter?: () => void;
    onmouseleave?: () => void;
  } = $props();
</script>

<button
  class={extraClass}
  style={extraStyle}
  {onclick}
  onmouseenter={() => {
    $showConchFace = true;
    $conchLightRadius = 8;
    onmouseenter && onmouseenter();
  }}
  onmouseleave={() => {
    $showConchFace = false;
    $conchLightRadius = 0;
    onmouseleave && onmouseleave();
  }}
>
  <img
    src={conch}
    alt="conch"
    class="absolute bottom-0 size-full select-none brightness-[20%] z-0"
  />
  <img
    src={devious}
    alt="conch_smile"
    class={cn(
      "conch-face absolute bottom-0 size-full z-[1] select-none",
      $showConchFace ? "opacity-100" : "opacity-0",
    )}
  />
</button>

<style>
  .conch-face {
    transition: opacity 1s;
  }
</style>
