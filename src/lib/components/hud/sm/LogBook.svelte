<script lang="ts">
  import { Paper } from "$components/svg";
</script>

<div class="container-logBook">
  <div class="absolute w-[88%] h-[88%] text-black">
    <Paper width="100%" height="100%" class="absolute" />
    <div class="container-text">
      <p class="text-4xl">Log book</p>
    </div>
  </div>
</div>

<style>
  .container-logBook {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container-text {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 1rem;
    z-index: 1;
  }
</style>
