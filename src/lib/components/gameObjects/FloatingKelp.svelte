<script lang="ts">
  import { InfoMarker } from "$components/ui/button";
  import { BgImg, TurbulentImg } from "$components/ui/img";
  import kelp_floating from "$assets/surface/kelp_floating.png";
  import { infoApi } from "$apis";

  let { class: extraClass = "" }: { class?: string } = $props();
</script>

<TurbulentImg src={kelp_floating} yoyo={true} class="opacity-30 {extraClass}" />
<!-- <InfoMarker
  type="sm-o"
  onclick={() => {
    $infoApi.openModal({ textKeys: ["o_floating-kelp"], infoType: "sm-o" });
  }}
  class="absolute left-[222px] top-[111px] h-[55px] w-[55px] pointer-events-auto"
/> -->
