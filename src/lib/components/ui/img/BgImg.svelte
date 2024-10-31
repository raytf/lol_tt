<script lang="ts">
  let {
    src,
    alt = "bg",
    class: extraClass,
    style: extraStyle,
  }: { src: string; alt?: string; class?: string; style?: string } = $props();
</script>

<img
  {src}
  {alt}
  class="absolute max-w-none pointer-events-none select-none {extraClass}"
  style={extraStyle}
/>
