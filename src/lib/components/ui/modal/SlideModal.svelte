<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade, fly } from "svelte/transition";

  let {
    class: extraClass = "",
    onClose,
    children,
    ...restProps
  }: { class: string; onClose?: () => void; children?: Snippet } = $props();
</script>

<div
  transition:fade
  class={[
    "absolute size-full flex justify-center items-center",
    "py-8 px-16",
    extraClass,
  ]}
  {...restProps}
>
  <button
    aria-label="close"
    onclick={() => onClose?.()}
    class="absolute size-full bg-black/80"
  >
  </button>
  <div
    transition:fly={{ y: 555 }}
    class={[
      "absolute bottom-0 h-[95%] w-[80%] bg-blue-200/20 text-start",
      "px-12 py-4 rounded-t-2xl border border-b-0 border-white",
    ]}
  >
    {@render children?.()}
  </div>
</div>
