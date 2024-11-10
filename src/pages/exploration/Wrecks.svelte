<script lang="ts">
  import { onMount } from "svelte";
  import { spring } from "svelte/motion";
  import { toast } from "@zerodevx/svelte-toast";
  import { TurbulentImg, BgImg } from "$components/ui/img";
  import { Darkness, UnderwaterGradient } from "$components/visual";
  import { Grid, Area } from "$components/exploration";
  import { Submarine, Conch } from "$components/gameObjects";
  import { windowWidth, windowHeight } from "$stores/game";
  import { moveSub } from "$stores/exploration";
  import {
    setTarget as setSubTarget,
    setPosition as setSubPosition,
    coords as subCoords,
  } from "$stores/sub";
  import { WrecksShape } from "$components/svg/environment";
  import underwater from "$assets/underwater_1by3.jpg";
  import wrecks_1 from "$assets/wrecks/wrecks_1.png";
  import wrecks_2 from "$assets/wrecks/wrecks_2.png";
  import wrecks_3 from "$assets/wrecks/wrecks_3.png";
  import wrecks_secret from "$assets/wrecks/wrecks_secret.png";
  import { gameApi } from "$apis";

  let { params }: { params: { from: string } } = $props();

  const grid = {
    width: $windowWidth * 1.5,
    height: $windowHeight * 3,
  };
  const gridOffset = spring({ x: 0, y: 0 }, { stiffness: 0.01, damping: 0.8 });
  const minYOffset = -grid.height + $windowHeight;
  const minXOffset = -grid.width + $windowWidth;

  let initialPosition = { x: $windowWidth / 2, y: -222 };
  let initialTarget = { x: $windowWidth / 2, y: $windowHeight / 2 };
  if (params.from === "forest") {
    initialPosition = { x: grid.width + 111, y: 111 };
    initialTarget = { x: grid.width - 222, y: 111 };
    gridOffset.set({ x: minXOffset, y: 0 }, { hard: true });
  }
  onMount(() => {
    setSubPosition(initialPosition);
    setTimeout(() => {
      setSubTarget(initialTarget);
      toast.push(`From: ${params.from}`);
    }, 555);
  });
</script>

<Grid
  size={[grid.width, grid.height]}
  xOffset={$gridOffset.x}
  yOffset={$gridOffset.y}
>
  <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
  <BgImg src={wrecks_3} class="w-[133%] left-[-22%] bottom-0 z-[7]" />
  <BgImg
    src={wrecks_2}
    style="transform: translateX({$gridOffset.x / 10}px)"
    class="w-[122%] left-[-11%] bottom-0 z-[9]"
  />
  <Conch
    class="absolute w-[44px] h-[44px] top-[93%] left-[84%] z-[9]"
    style="transform: translateX({$gridOffset.x / 10}px)"
  />
  <Submarine class="z-10" />
  <WrecksShape
    style="transform: translateX({$gridOffset.x / 5}px)"
    class="absolute w-[111%] left-[-4%] bottom-0 pointer-events-none opacity-0 z-[13]"
  />
  <BgImg
    src={wrecks_secret}
    style="transform: translateX({$gridOffset.x / 5}px)"
    class="w-[111%] left-[-4%] bottom-0 z-[13]"
  />
  <BgImg
    src={wrecks_1}
    style="transform: translateX({$gridOffset.x / 5}px)"
    class="w-[111%] left-[-4%] bottom-0 z-[13] opacity-50"
  />
  <Darkness
    level={$gridOffset.y / minYOffset - 0.4}
    lights={[
      { x: $subCoords.x, y: $subCoords.y, unit: "px", radius: 4 },
      { x: 83, y: 94, unit: "%", radius: 8 },
    ]}
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
          setSubTarget({ x: grid.width + 111, y: 111 });
          $gameApi.fadeScene("/exploration_forest", 0.44);
        }}
        class="absolute right-[4%] top-[22%] text-2xl z-[25]">Forest</button
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
