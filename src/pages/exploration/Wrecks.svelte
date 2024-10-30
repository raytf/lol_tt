<script lang="ts">
  import { Grid, Area } from "$components/explorationOld";
  import { Submarine } from "$components/gameObjects";
</script>

<Grid class="size-full">
  <Submarine class="z-10" />
  {#snippet areas()}
    <Area></Area>
    <div class="bg-blue-200 size-full"></div>
  {/snippet}
</Grid>
