<script lang="ts">
  import { Info } from "$components/svg/icons";

  let {
    onclick,
    buttonClass,
    imgClass,
  }: { onclick?: () => void; buttonClass?: string; imgClass?: string } =
    $props();
</script>

<button {onclick} class={buttonClass}>
  <Info class="object-fill {imgClass}" />
</button>
