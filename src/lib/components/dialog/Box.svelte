<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    onclick,
    class: extraClass,
    avatar,
    name,
    text,
    ...props
  }: {
    onclick: (e: MouseEvent) => void;
    class?: string;
    avatar: Snippet;
    name: Snippet;
    text: Snippet;
  } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div {onclick} class="container size-full {extraClass}" {...props}>
  <div class="mr-2">
    {@render avatar()}
  </div>
  <div class="box w-[55%]">
    <div class="box-name text-2xl">
      <p>{@render name()}</p>
    </div>
    <p class="text-2xl">{@render text()}</p>
  </div>
</div>

<style>
  .container {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    padding-bottom: 22px;

    display: flex;
    justify-content: center;
    align-items: flex-end;

    z-index: 10;
  }
  .box {
    position: relative;
    background: white;
    color: black;

    padding-top: 22px;
    padding-bottom: 22px;
    padding-left: 22px;
    padding-right: 22px;

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
</style>
