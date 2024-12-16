<script lang="ts">
  import { onMount } from "svelte";
  import { Grid, Area } from "$components/exploration";
  import { Submarine } from "$components/gameObjects";
  import { TurbulentImg, BgImg } from "$components/ui/img";
  import { Darkness, UnderwaterGradient } from "$components/visual";
  import { gridOffset, minOffset, moveSub } from "$stores/exploration";
  import { gameApi } from "$apis";

  import { ForestPath } from "$components/svg/environment";
  import underwater from "$assets/underwater_wide.jpg";
  import forest_1 from "$assets/forest/forest_1.png";
  import kelp_foreground from "$assets/forest/kelp_foreground.png";

  const grid = {
    width: $gameApi.windowWidth * 3,
    height: $gameApi.windowHeight * 4,
  };
  minOffset.set({
    x: -grid.width + $gameApi.windowWidth,
    y: -grid.height + $gameApi.windowHeight,
  });
</script>

<Grid
  size={[grid.width, grid.height]}
  xOffset={$gridOffset.x}
  yOffset={$gridOffset.y}
  class="grid-rows-4"
>
  <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
  <ForestPath class="absolute size-full z-[5] opacity-0 pointer-events-none" />
  <BgImg src={forest_1} class="z-[5]" />
  <Submarine class="z-10" />
  <BgImg src={kelp_foreground} class="size-full z-[11]" />

  {#snippet areas()}
    <Area size={[grid.width, $gameApi.windowHeight]} onmousedown={moveSub}>
      <UnderwaterGradient
        class="absolute w-full h-[101%]"
        --color-top="#03E5B7"
        --color-bottom="#00C1EF"
      />
    </Area>
    <Area size={[grid.width, $gameApi.windowHeight]} onmousedown={moveSub}>
      <UnderwaterGradient
        class="absolute w-full h-[101%]"
        --color-top="#00C1EF"
        --color-bottom="#037ADE"
      />
    </Area>
    <Area size={[grid.width, $gameApi.windowHeight]} onmousedown={moveSub}>
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#037ADE"
        --color-bottom="#182B3A"
      />
    </Area>
    <Area size={[grid.width, $gameApi.windowHeight]} onmousedown={moveSub}>
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#182B3A"
        --color-bottom="#00172a"
      />
    </Area>
  {/snippet}
</Grid>
