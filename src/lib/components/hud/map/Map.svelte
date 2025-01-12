<script lang="ts">
  import map from "$assets/map.png";
  import { Close } from "$components/svg/icons";

  let { onClose, class: extraClass }: { onClose?: () => void; class?: string } =
    $props();
</script>

<div class="container-map {extraClass}">
  <button
    onclick={onClose}
    class="absolute top-1 left-1 flex items-center pointer-events-auto text-black z-[1]"
    ><Close class="w-[33px] h-[33px] mr-1" /> Close Map</button
  >
  <div class="absolute size-full overflow-hidden opacity-70">
    <img src={map} alt="map" class="absolute -right-[0.5%] w-[101%] h-full" />
  </div>
</div>

<style>
  .container-map {
    position: absolute;
    top: 0;
    right: 0.5%;
    height: 100%;
    width: 100%;
  }
</style>
