<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import { InfoMarker } from "$components/ui/button";
  import { BgImg, TurbulentImg } from "$components/ui/img";
  import kelp_floating from "$assets/surface/kelp_floating.png";

  let { class: extraClass = "" }: { class?: string } = $props();

  let openModal = $state(false);
</script>

<TurbulentImg src={kelp_floating} yoyo={true} class="opacity-30 {extraClass}" />
<InfoMarker
  onclick={() => (openModal = true)}
  class="absolute left-[222px] top-[111px] h-[55px] w-[55px] pointer-events-auto"
/>
<Modal bind:open={openModal} class="pointer-events-auto">
  <p>Hello</p>
</Modal>
