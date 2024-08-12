<script lang="ts">
  import type { Snippet } from "svelte";
  import { Area } from "$components/exploration";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import relics2 from "$assets/chapter1/relics/relics_2.svg";
  import relics3 from "$assets/chapter1/relics/relics_3.svg";

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

<Area {onmousedown} {...props}>
  <div class="absolute size-full z-0">
    <UnderwaterGradient
      class="absolute size-full"
      --color-top="#03E5B7"
      --color-bottom="#037ADE"
    />
    <img
      src={relics3}
      alt="relics-3"
      class="absolute bottom-0 right-[-11%] w-[144%] max-w-none z-[1]"
    />
    <img src={relics2} alt="relics-2" class="absolute bottom-[-11%] z-[2]" />
  </div>

  {#if children}
    {@render children()}
  {/if}
</Area>
