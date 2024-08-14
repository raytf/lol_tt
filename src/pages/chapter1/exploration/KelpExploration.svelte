<script lang="ts">
  import { Grid, Area } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import kelp from "$assets/chapter1/kelp.png";
</script>

<div class="w-full h-[200%]">
  <Area>
    <UnderwaterGradient
      class="absolute size-full"
      --color-top="#03E5B7"
      --color-bottom="#037ADE"
    />
  </Area>
</div>
