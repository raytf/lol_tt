<script lang="ts">
  let {
    opacity = 100,
    transitionDuration = 1,
    class: extraClass = "",
    children,
  }: {
    opacity?: number;
    transitionDuration?: number;
    class?: string;
    children?: any;
  } = $props();
</script>

<div
  class="absolute size-full bg-black {extraClass}"
  style="transition-property: opacity; transition-duration: {transitionDuration}s; opacity: {opacity}%"
>
  {@render children?.()}
</div>
