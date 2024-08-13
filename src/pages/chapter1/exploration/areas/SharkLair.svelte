<script lang="ts">
  import type { Snippet } from "svelte";
  import { Area, BgImg } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import foliage1 from "$assets/foliage/foliage_1.svg";
  import foliage2 from "$assets/foliage/foliage_2.svg";

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
  <div class="absolute size-full z-[1] overflow-x-clip pointer-events-none">
    <BgImg
      src={foliage2}
      alt="foliage-2"
      class="scale-x-[-1] h-[111%] bottom-[-5%] right-0 w-[111%] z-[1]"
    />
    <BgImg
      src={foliage1}
      alt="foliage-1"
      class="bottom-[-4%] left-[-34%] w-[144%] z-[3]"
    />
  </div>

  {#if children}
    {@render children()}
  {/if}
</Area>
