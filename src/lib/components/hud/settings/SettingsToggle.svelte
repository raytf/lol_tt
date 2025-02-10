<script lang="ts">
  import { Settings } from "$components/svg/icons/hud";

  let { onclick, class: extraClass }: { onclick?: () => void; class?: string } =
    $props();
</script>

<button {onclick} class="button {extraClass}">
  <Settings class="w-[55px] h-[55px]" />
</button>

<style>
  .button {
    pointer-events: auto;
    position: absolute;
    margin: 0.44em;
    opacity: 0.88;
  }
</style>
