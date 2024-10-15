<script lang="ts">
  let {
    opacity = 100,
    transitionDuration = 1,
    class: extraClass = "",
  }: {
    opacity?: number;
    transitionDuration?: number;
    class?: string;
  } = $props();
</script>

<div
  class="absolute size-full bg-black {extraClass}"
  style="transition-property: opacity; transition-duration: {transitionDuration}s; opacity: {opacity}%"
></div>
