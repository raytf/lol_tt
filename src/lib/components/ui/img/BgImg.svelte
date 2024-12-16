<script lang="ts">
  let {
    src,
    alt = "bg",
    class: extraClass,
    style: extraStyle,
    imgRef = $bindable(),
    ...props
  }: {
    src: string;
    alt?: string;
    class?: string;
    style?: string;
    imgRef?: HTMLImageElement;
  } = $props();
</script>

<img
  bind:this={imgRef}
  {src}
  {alt}
  width="100%"
  height="100%"
  draggable="false"
  class="absolute max-w-none pointer-events-none select-none {extraClass}"
  style={extraStyle}
  {...props}
/>
