<script lang="ts">
  import type { Snippet } from "svelte";
  import { Down } from "$components/svg/icons/caret";

  let {
    onclick,
    class: extraClass,
    style: extraStyle,
    avatar,
    name,
    text,
    underlay,
    options = false,
    top = false,
    ...props
  }: {
    onclick: (e: MouseEvent) => void;
    class?: string;
    style?: string;
    avatar: Snippet;
    name: Snippet;
    text: Snippet;
    underlay?: Snippet;
    options?: boolean;
    top?: boolean;
  } = $props();
</script>

<div
  class="container_dialog-box {top ? 'items-start' : 'items-end'} {extraClass}"
  style={extraStyle}
  {...props}
>
  <div class="absolute size-full pointer-events-none">
    {#if underlay}
      {@render underlay()}
    {/if}
  </div>
  <div class="mr-2 mt-[44px]">
    {@render avatar()}
  </div>
  <button {onclick} class="box w-[55%]">
    <div class="box-name text-2xl">
      <p>{@render name()}</p>
    </div>
    <p class="box-text text-2xl">
      {@render text()}
    </p>

    <div class="action">
      <Down class="absolute bottom-4 right-4 w-[24px] h-[24px]" />
    </div>
  </button>
</div>

<style>
  .container_dialog-box {
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    user-select: none;
  }
  .box {
    pointer-events: auto;
    cursor: pointer;
    position: relative;
    background: rgba(255, 255, 255, 0.88);
    color: black;
    text-align: left;
    margin-top: 44px;

    padding: 33px 22px 22px 22px;
    border-radius: 22px;
    transition: all 0.44s;
  }
  .box:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 22px rgba(44, 44, 44, 0.22);
  }
  .action {
    opacity: 0.44;
    transition: all 0.44s;
  }
  .box:hover .action {
    opacity: 1;
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
