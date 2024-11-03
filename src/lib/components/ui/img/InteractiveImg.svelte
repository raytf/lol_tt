<script lang="ts">
  let {
    src,
    alt = "interactive",
    onmouseenter,
    onmouseleave,
    class: extraClass,
    style: extraStyle,
  }: {
    src: string;
    alt?: string;
    onmouseenter?: () => void;
    onmouseleave?: () => void;
    class?: string;
    style?: string;
  } = $props();
</script>

<img
  {src}
  {alt}
  class="absolute max-w-none select-none {extraClass}"
  style={extraStyle}
  {onmouseenter}
  {onmouseleave}
/>
