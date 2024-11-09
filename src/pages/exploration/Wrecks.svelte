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

  const grid = {
    width: $windowWidth * 1.5,
    height: $windowHeight * 3,
  };
  const gridOffset = spring({ x: 0, y: 0 }, { stiffness: 0.01, damping: 0.8 });
  const minYOffset = -grid.height + $windowHeight;
  const minXOffset = -grid.width + $windowWidth;

  onMount(() => {
    setSubPosition({ x: $windowWidth / 2, y: -222 });
    setTimeout(() => {
      setSubTarget({ x: $windowWidth / 2, y: $windowHeight / 2 });
      toast.push("Location: Wrecks");
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
    class="absolute w-[111px] h-[111px] top-[90%] left-[82%] z-[9]"
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
      { x: $subCoords.x, y: $subCoords.y, unit: "px", radius: 8 },
      { x: 84, y: 92, unit: "%", radius: 8 },
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
