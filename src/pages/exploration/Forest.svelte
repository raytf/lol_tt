<script lang="ts">
  import { onMount } from "svelte";
  import { spring } from "svelte/motion";
  import { Grid, Area } from "$components/exploration";
  import { Submarine } from "$components/gameObjects";
  import { TurbulentImg, BgImg } from "$components/ui/img";
  import { Darkness, UnderwaterGradient } from "$components/visual";
  import { windowWidth, windowHeight } from "$stores/game";
  import { moveSub } from "$stores/exploration";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
    coords as subCoords,
  } from "$stores/sub";
  import underwater from "$assets/underwater_1by3.jpg";
  import forest_1 from "$assets/forest/forest_1.png";
  import { gameApi } from "$apis";

  const grid = {
    width: $windowWidth * 2,
    height: $windowHeight * 3,
  };
  const gridOffset = spring({ x: 0, y: 0 }, { stiffness: 0.01, damping: 0.8 });
  const minYOffset = -grid.height + $windowHeight;
  const minXOffset = -grid.width + $windowWidth;

  onMount(() => {
    setSubPosition({ x: -111, y: 111 });
    setTimeout(() => {
      setSubTarget({ x: 222, y: 111 });
      //toast.push("Location: Wrecks");
    }, 555);
  });
</script>

<Grid
  size={[grid.width, grid.height]}
  xOffset={$gridOffset.x}
  yOffset={$gridOffset.y}
>
  <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
  <Submarine class="z-10" />
  <BgImg
    src={forest_1}
    style="transform: translateX({$gridOffset.x /
      5}px); filter: brightness({1.2 - $gridOffset.y / minYOffset})"
    class="w-[111%] left-0 bottom-0 z-[13] opacity-100"
  />
  <Darkness
    level={$gridOffset.y / minYOffset - 0.4}
    lights={[{ x: $subCoords.x, y: $subCoords.y, unit: "px", radius: 8 }]}
    class="z-50"
  />
  {#snippet areas()}
    <Area
      size={[grid.width, $windowHeight]}
      onmousedown={(e) =>
        moveSub(e, gridOffset, { x: minXOffset, y: minYOffset })}
      class="flex flex-row"
    >
      <UnderwaterGradient
        class="absolute w-full h-[101%]"
        --color-top="#03E5B7"
        --color-bottom="#00C1EF"
      />
      <button
        onclick={() => {
          setSubTarget({ x: -111, y: 111 });
          $gameApi.fadeScene("/exploration_wrecks/forest", 0.44);
        }}
        class="absolute left-[4%] top-[22%] text-2xl z-[25]">Wrecks</button
      >
    </Area>
    <Area
      size={[grid.width, $windowHeight]}
      onmousedown={(e) =>
        moveSub(e, gridOffset, { x: minXOffset, y: minYOffset })}
    >
      <UnderwaterGradient
        class="absolute w-full h-[101%]"
        --color-top="#00C1EF"
        --color-bottom="#037ADE"
      />
    </Area>
    <Area
      size={[grid.width, $windowHeight]}
      onmousedown={(e) =>
        moveSub(e, gridOffset, { x: minXOffset, y: minYOffset })}
    >
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#037ADE"
        --color-bottom="#182B3A"
      />
    </Area>
  {/snippet}
</Grid>
