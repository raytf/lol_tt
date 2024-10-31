<script lang="ts">
  import { spring } from "svelte/motion";
  import { TurbulentImg, BgImg, InteractiveImg } from "$lib/components/ui/img";
  import { Darkness, UnderwaterGradient } from "$components/visual";
  import { Grid, Area } from "$components/exploration";
  import { Submarine, Conch } from "$components/gameObjects";
  import { windowWidth, windowHeight } from "$stores/game";
  import { setTarget as setSubTarget, coords as subCoords } from "$stores/sub";
  import underwater from "$assets/underwater_1by3.jpg";
  import wrecks_1 from "$assets/wrecks/wrecks_1.png";
  import wrecks_2 from "$assets/wrecks/wrecks_2.png";
  import wrecks_3 from "$assets/wrecks/wrecks_3.png";
  import wrecks_kelp from "$assets/wrecks/wrecks_kelp.png";
  import wrecks_secret from "$assets/wrecks/wrecks_secret.png";

  const gridWidth = $windowWidth * 1.5;
  const gridHeight = $windowHeight * 3;
  const gridOffset = spring({ x: 0, y: 0 }, { stiffness: 0.01, damping: 0.8 });

  const minYOffset = -gridHeight + $windowHeight;
  const minXOffset = -gridWidth + $windowWidth;
  function moveSub(e: MouseEvent) {
    const currentOffset = $gridOffset;

    const halfWidth = $windowWidth / 2;
    const halfHeight = $windowHeight / 2;
    const halfWidthDiff = e.clientX - halfWidth;
    const halfHeightDiff = e.clientY - halfHeight;
    let newXOffset = currentOffset.x - halfWidthDiff;
    let newYOffset = currentOffset.y - halfHeightDiff;
    if (newXOffset > 0) newXOffset = 0;
    if (newYOffset > 0) newYOffset = 0;
    if (newXOffset < minXOffset) newXOffset = minXOffset;
    if (newYOffset < minYOffset) newYOffset = minYOffset;
    const newOffset = { x: newXOffset, y: newYOffset };

    gridOffset.set(newOffset);
    const x = e.clientX - $gridOffset.x;
    const y = e.clientY - $gridOffset.y;
    setSubTarget({ x, y });
  }
</script>

<Grid
  size={[gridWidth, gridHeight]}
  xOffset={$gridOffset.x}
  yOffset={$gridOffset.y}
  class="bg-blue-800"
>
  <TurbulentImg src={underwater} class="opacity-35 z-[1]" />
  <BgImg src={wrecks_3} class="w-[122%] bottom-0 z-[7]" />
  <BgImg
    src={wrecks_2}
    style="transform: translateX({$gridOffset.x / 10}px)"
    class="w-[115%] bottom-0 z-[9]"
  />
  <!-- <InteractiveImg
    src={conch}
    style="transform: translateX({$gridOffset.x / 10}px)"
    class="absolute w-[88px] h-[111px] top-[88%] left-[82%] z-[9]"
    onmouseenter={() => {
      console.log("conch");
    }}
    onmouseleave={() => {
      console.log("conch leave");
    }}
  /> -->
  <Conch
    class="absolute w-[111px] h-[111px] top-[86%] left-[82%] z-[9]"
    style="transform: translateX({$gridOffset.x / 10}px)"
  />
  <Submarine class="z-10" />
  <BgImg
    src={wrecks_kelp}
    style="filter: brightness({1.2 - $gridOffset.y / minYOffset})"
    class="opacity-80 z-[11]"
  />
  <BgImg
    src={wrecks_secret}
    style="transform: translateX({$gridOffset.x / 5}px)"
    class="w-[111%] bottom-0 z-[12]"
  />
  <BgImg
    src={wrecks_1}
    style="transform: translateX({$gridOffset.x / 5}px)"
    class="w-[111%] bottom-0 z-[13]"
  />
  <Darkness
    level={$gridOffset.y / minYOffset - 0.4}
    lights={[
      { x: $subCoords.x, y: $subCoords.y, unit: "px", radius: 8 },
      { x: 86, y: 92, unit: "%", radius: 11 },
    ]}
    class="z-50"
  />
  {#snippet areas()}
    <Area
      size={[gridWidth, $windowHeight]}
      onmousedown={moveSub}
      class="flex flex-row"
    >
      <UnderwaterGradient
        class="absolute w-full h-[101%]"
        --color-top="#03E5B7"
        --color-bottom="#00C1EF"
      />
    </Area>
    <Area size={[gridWidth, $windowHeight]} onmousedown={moveSub}>
      <UnderwaterGradient
        class="absolute w-full h-[101%]"
        --color-top="#00C1EF"
        --color-bottom="#037ADE"
      />
    </Area>
    <Area size={[gridWidth, $windowHeight]} onmousedown={moveSub}>
      <UnderwaterGradient
        class="absolute size-full"
        --color-top="#037ADE"
        --color-bottom="#182B3A"
      />
    </Area>
  {/snippet}
</Grid>
