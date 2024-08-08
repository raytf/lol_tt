<script lang="ts">
  import { tweened, spring } from "svelte/motion";
  import { Grid, Area } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import Submarine from "$components/visual/Submarine.svelte";

  const xOffset = tweened(0, {
    duration: 500,
  });
  const yOffset = tweened(0, {
    duration: 500,
  });

  let subDirection = $state(1);
  const defaultCoords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let subCoords = spring(
    { x: defaultCoords.x, y: defaultCoords.y },
    {
      stiffness: 0.01,
      damping: 0.8,
    },
  );

  let upEnabled = $state(false);
  let downEnabled = $state(false);
  let leftEnabled = $state(false);
  let rightEnabled = $state(false);

  function resetNav() {
    upEnabled = false;
    downEnabled = false;
    leftEnabled = false;
    rightEnabled = false;
  }

  function handleMouseDown(event: MouseEvent) {
    const x = event.clientX - $xOffset;
    const y = event.clientY - $yOffset;
    moveSub(x, y);
  }

  function moveSub(x: number, y: number) {
    subCoords.set({ x: x, y: y });

    const dx = x - $subCoords.x;
    subDirection = dx <= 0 ? 1 : -1;
  }
</script>

<Grid
  xOffset={$xOffset}
  yOffset={$yOffset}
  {upEnabled}
  {downEnabled}
  {leftEnabled}
  {rightEnabled}
  onUp={() => {
    yOffset.update((current) => {
      const newOffset = current + window.innerHeight;
      const x = defaultCoords.x - $xOffset;
      const y = defaultCoords.y - newOffset;
      moveSub(x, y);
      return current + window.innerHeight;
    });
    resetNav();
  }}
  onDown={() => {
    yOffset.update((current) => {
      const newOffset = current - window.innerHeight;
      const x = defaultCoords.x - $xOffset;
      const y = defaultCoords.y - newOffset;
      moveSub(x, y);
      return current - window.innerHeight;
    });
    resetNav();
  }}
  onLeft={() => {
    xOffset.update((current) => {
      const newOffset = current + window.innerWidth;
      const x = defaultCoords.x - newOffset;
      const y = defaultCoords.y - $yOffset;
      moveSub(x, y);
      return current + window.innerWidth;
    });
    resetNav();
  }}
  onRight={() => {
    xOffset.update((current) => {
      const newOffset = current - window.innerWidth;
      const x = defaultCoords.x - newOffset;
      const y = defaultCoords.y - $yOffset;
      moveSub(x, y);
      return newOffset;
    });
    resetNav();
  }}
  class="grid-cols-3 h-[100vh] w-[300vw]"
>
  {#snippet characters()}
    <Submarine
      scaleX={subDirection}
      style="transform: translate({$subCoords.x}px, {$subCoords.y}px)"
    />
  {/snippet}
  {#snippet areas()}
    <Area
      handleMouseDown={(e) => {
        handleMouseDown(e);
        rightEnabled = true;
      }}
      class=""
    >
      <UnderwaterGradient
        class="absolute size-full z-[-1]"
        style="transform: translate(0, 0)"
        --color-top="#03E5B7"
        --color-bottom="#037ADE"
      />
    </Area>
    <Area
      handleMouseDown={(e) => {
        handleMouseDown(e);
        leftEnabled = true;
        rightEnabled = true;
      }}
      class=""
    >
      <UnderwaterGradient
        class="absolute size-full z-[-1]"
        style="transform: translate(0, 0)"
        --color-top="#03E5B7"
        --color-bottom="#037ADE"
      />
    </Area>
    <Area
      handleMouseDown={(e) => {
        handleMouseDown(e);
        leftEnabled = true;
        downEnabled = true;
      }}
      class=""
    >
      <UnderwaterGradient
        class="absolute size-full z-[-1]"
        style="transform: translate(0, 0)"
        --color-top="#03E5B7"
        --color-bottom="#037ADE"
      />
    </Area>
    <Area
      handleMouseDown={(e) => {
        handleMouseDown(e);
        upEnabled = true;
      }}
      class="col-end-4"
    >
      <UnderwaterGradient
        class="absolute size-full z-[-1]"
        style="transform: translate(0, 0)"
        --color-top="#037ADE"
        --color-bottom="#182b3a"
      />
    </Area>
  {/snippet}
</Grid>
