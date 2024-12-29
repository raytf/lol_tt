<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import { Lol } from "$components/text";
  import { hideHeading, tlRevealHeading } from "./animations";

  let {
    title,
    class: extraClass,
    uiClass,
    children,
    ui,
  }: {
    title: string;
    class?: string;
    uiClass?: string;
    children?: Snippet;
    ui?: Snippet;
  } = $props();

  onMount(() => {
    hideHeading();

    const tlHeading = tlRevealHeading();
    setTimeout(() => {
      tlHeading.reverse();
    }, 2000);
  });
</script>

<div class="relative size-full {extraClass}">
  <div class="absolute size-full pointer-events-none {uiClass}">
    <div class="heading-location w-full text-center">
      <Lol key="location-{title}" class="text-3xl font-bold p-4" />
    </div>
    {@render ui?.()}
  </div>
  {@render children?.()}
</div>
