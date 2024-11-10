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
  import forest_2 from "$assets/forest/forest_2.png";
  import forest_3 from "$assets/forest/forest_3.png";
  import forest_secret from "$assets/forest/forest_secret.png";
  import forest_habitat from "$assets/forest/forest_habitat.png";
  import kelp_1 from "$assets/forest/kelp_1.png";
  import kelp_2 from "$assets/forest/kelp_2.png";

  import { gameApi } from "$apis";

  const grid = {
    width: $windowWidth * 2,
    height: $windowHeight * 3,
  };
  const gridOffset = spring({ x: 0, y: 0 }, { stiffness: 0.01, damping: 0.8 });
  const doubleHeightOffset = -($windowHeight * 2) + $windowHeight;
  const tripleHeightOffset = -grid.height + $windowHeight;
  let minYOffset = $state(tripleHeightOffset);
  const minXOffset = -grid.width + $windowWidth;
  let heightRatio = $derived(
    Math.abs($gridOffset.y) / Math.abs(tripleHeightOffset),
  );

  function onAreaClick(e: MouseEvent) {
    const firstHalf = Math.abs($gridOffset.x) < Math.abs(minXOffset / 2);
    if (firstHalf) {
      minYOffset = doubleHeightOffset;
    } else {
      minYOffset = tripleHeightOffset;
    }
    moveSub(e, gridOffset, { x: minXOffset, y: minYOffset });
  }

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
  <BgImg src={forest_3} class="w-[111%] right-0 bottom-0 z-[7]" />
  <BgImg
    src={forest_2}
    style="transform: translateX({$gridOffset.x / 10}px);"
    class="w-[111%] right-[-8%] bottom-0 z-[8]"
  />
  <BgImg
    src={kelp_2}
    style="transform: translateX({$gridOffset.x / 8}px); filter: brightness({1 -
      heightRatio})"
    class="w-[111%] left-0 bottom-0 z-[9]"
  />
  <Submarine class="z-10" />
  <BgImg
    src={kelp_1}
    style="transform: translateX({$gridOffset.x / 5}px); filter: brightness({1 -
      heightRatio})"
    class="w-[111%] left-0 bottom-0 z-[12]"
  />
  <BgImg
    src={forest_secret}
    style="transform: translateX({$gridOffset.x / 5}px);"
    class="w-[111%] left-0 bottom-0 z-[13]"
  />
  <BgImg
    src={forest_1}
    style="transform: translateX({$gridOffset.x / 5}px);"
    class="w-[111%] left-0 bottom-0 z-[13] opacity-80"
  />
  <BgImg
    src={forest_habitat}
    style="transform: translateX({$gridOffset.x / 5}px);"
    class="w-[111%] right-[-11%] bottom-0 z-[14]"
  />

  <Darkness
    level={$gridOffset.y / tripleHeightOffset}
    lights={[{ x: $subCoords.x, y: $subCoords.y, unit: "px", radius: 4 }]}
    class="z-50"
  />
  {#snippet areas()}
    <Area
      size={[grid.width, $windowHeight]}
      onmousedown={onAreaClick}
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
    <Area size={[grid.width, $windowHeight]} onmousedown={onAreaClick}>
      <UnderwaterGradient
        class="absolute w-full h-[101%]"
        --color-top="#00C1EF"
        --color-bottom="#037ADE"
      />
    </Area>
    <Area size={[grid.width, $windowHeight]} onmousedown={onAreaClick}>
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#037ADE"
        --color-bottom="#182B3A"
      />
    </Area>
  {/snippet}
</Grid>
