<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { fade } from "svelte/transition";
  import { Chat, HandClick } from "$components/svg/icons";
  import { Down } from "$components/svg/icons/caret";

  let {
    onclick,
    class: extraClass,
    avatar,
    name,
    text,
    options = false,
    italic = false,
    top = false,
    ...props
  }: {
    onclick: (e: MouseEvent) => void;
    class?: string;
    avatar: Snippet;
    name: Snippet;
    text: Snippet;
    options?: boolean;
    italic?: boolean;
    top?: boolean;
  } = $props();

  onMount(() => {
    gsap.to(".container_dialog-box", {
      opacity: 1,
      duration: 1,
    });
  });
</script>

<div
  out:fade|global
  class="container_dialog-box {top ? 'items-start' : 'items-end'} {extraClass}"
  {...props}
>
  <div class="mr-2">
    {@render avatar()}
  </div>
  <button {onclick} class="box w-[55%]">
    <div class="box-name text-2xl">
      <p>{@render name()}</p>
    </div>
    <p class="text-2xl {italic ? 'italic' : ''}">{@render text()}</p>
    <Down class="absolute bottom-4 right-4 w-[24px] h-[24px]" />
  </button>
</div>

<style>
  .container_dialog-box {
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    padding-top: 44px;
    padding-bottom: 22px;

    display: flex;
    justify-content: center;
    user-select: none;

    z-index: 10;

    opacity: 0;
  }
  .box {
    cursor: pointer;
    position: relative;
    background: white;
    color: black;
    text-align: left;

    padding: 22px 22px 33px 22px;
    border-radius: 22px;
    transition: box-shadow 0.4s;
  }
  .box:hover {
    box-shadow: 0 0 22px rgba(44, 44, 44, 0.2);
  }
  .box-name {
    position: absolute;
    top: -33px;
    left: 11px;
    background: black;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 11px;

    border-radius: 22px;
  }
  p {
    user-select: none;
  }
</style>
