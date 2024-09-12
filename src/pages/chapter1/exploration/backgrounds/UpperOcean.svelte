<script lang="ts">
  import { TurbulentImg } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import underwater from "$assets/underwater_surface.jpg";
</script>

<UnderwaterGradient
  class="absolute size-full"
  --color-top="#03E5B7"
  --color-bottom="#037ADE"
/>
<TurbulentImg src={underwater} class="opacity-20" />
