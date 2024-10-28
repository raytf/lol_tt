<script lang="ts">
  let {
    src,
    alt = "bg",
    class: extraClass,
  }: { src: string; alt?: string; class: string } = $props();
</script>

<img
  {src}
  {alt}
  class="absolute max-w-none pointer-events-none select-none {extraClass}"
/>
