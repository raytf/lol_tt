<script lang="ts">
  import { Close } from "$components/svg/icons";
  let {
    title = "",
    lines = [],
    onClose,
    class: extraClass,
  }: {
    title?: string;
    lines?: string[];
    onClose?: () => void;
    class?: string;
  } = $props();
</script>

<div class="paper {extraClass}">
  <button onclick={onClose} class="absolute top-1 right-1">
    <Close class="w-[33px] h-[33px] text-white" />
  </button>

  <div class="section-text">
    <p class="text-title">
      {title}
    </p>
    {#each lines as line}
      <p>{line}</p>
    {/each}
  </div>
</div>

<style>
  .paper {
    color: black;
    font-family: Caveat, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-size: 24px;

    background-image: linear-gradient(
        180deg,
        #6a2a1b,
        #6a2a1b 9%,
        transparent calc(9% + 2px)
      ),
      linear-gradient(
        90deg,
        transparent,
        transparent 12%,
        #f5c492 0,
        #f5c492 calc(12% + 2px),
        transparent calc(12% + 2px),
        transparent calc(12% + 6px),
        #f5c492 calc(12% + 6px),
        #f5c492 calc(12% + 8px),
        transparent calc(12% + 8px),
        transparent
      ),
      linear-gradient(180deg, #fbee9f 22%, transparent 0),
      repeating-linear-gradient(
        180deg,
        #c9d798,
        #c9d798 2px,
        transparent 0,
        transparent 36px
      ),
      linear-gradient(#fbee9f, #fbee9f);
  }
  .section-text {
    position: absolute;
    max-height: 100%;
    padding: 3em 2.2em;
    line-height: 1.5em;
    overflow: hidden;
    pointer-events: none;
  }
  .text-title {
    font-weight: 700;
    text-decoration: underline;
  }
</style>
