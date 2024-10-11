<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    onclick,
    class: extraClass,
    avatar,
    name,
    text,
    italic = false,
    top = false,
    ...props
  }: {
    onclick: (e: MouseEvent) => void;
    class?: string;
    avatar: Snippet;
    name: Snippet;
    text: Snippet;
    italic?: boolean;
    top?: boolean;
  } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  {onclick}
  class="container {top ? 'items-start' : 'items-end'} {extraClass}"
  {...props}
>
  <div class="mr-2">
    {@render avatar()}
  </div>
  <div class="box w-[55%]">
    <div class="box-name text-2xl">
      <p>{@render name()}</p>
    </div>
    <p class="text-2xl {italic ? 'italic' : ''}">{@render text()}</p>
  </div>
</div>

<style>
  .container {
    cursor: pointer;
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    padding-top: 44px;
    padding-bottom: 22px;

    display: flex;
    justify-content: center;

    z-index: 10;
  }
  .box {
    position: relative;
    background: white;
    color: black;

    padding: 22px;

    border-radius: 22px;
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
