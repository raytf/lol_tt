<script lang="ts">
  import { Grid, Area } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import kelp from "$assets/chapter1/kelp.png";
</script>

<Grid class="grid-cols-1 w-full h-[200%]">
  {#snippet areas()}
    <Area>
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#03E5B7"
        --color-bottom="#037ADE"
      />
    </Area>
  {/snippet}
</Grid>
