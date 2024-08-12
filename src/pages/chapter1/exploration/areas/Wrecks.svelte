<script lang="ts">
  import type { Snippet } from "svelte";
  import { Area, BgImg } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import relics2 from "$assets/relics/relics_2.svg";
  import relics3 from "$assets/relics/relics_3.svg";

  let {
    showInstruction = false,
    onmousedown,
    children,
    ...props
  }: {
    showInstruction?: boolean;
    onmousedown?: (event: MouseEvent) => void;
    children?: Snippet;
  } = $props();
</script>

<Area {showInstruction} {onmousedown} {...props}>
  <UnderwaterGradient
    class="absolute size-full"
    --color-top="#03E5B7"
    --color-bottom="#037ADE"
  />
  <div class="absolute size-full z-[1] pointer-events-none">
    <BgImg
      src={relics3}
      alt="relics-3"
      class="bottom-[-5%] right-[-11%] w-[144%] z-[1]"
    />
    <BgImg src={relics2} alt="relics-2" class="bottom-[-15%] z-[2]" />
  </div>

  {#if children}
    {@render children()}
  {/if}
</Area>
