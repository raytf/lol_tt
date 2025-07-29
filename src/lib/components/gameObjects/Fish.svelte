<script lang="ts">
  import { cn } from "$lib/utils";
  import {
    clown,
    goldfish,
    pink,
    piranha,
    puffer_green,
    purple,
    red,
    scarlet_blue,
    stripe_blue,
    stripe_yellow,
    yellow,
  } from "$assets/fish";
  import { FishType } from "$components/gameObjects";

  let {
    fishType,
    size = 111,
    class: extraClass = "",
    onclick,
  }: {
    fishType: FishType;
    size: number;
    class: string;
    onclick?: () => void;
  } = $props();

  const fishImages = {
    [FishType.Clown]: clown,
    [FishType.Goldfish]: goldfish,
    [FishType.Pink]: pink,
    [FishType.Piranha]: piranha,
    [FishType.PufferGreen]: puffer_green,
    [FishType.Purple]: purple,
    [FishType.Red]: red,
    [FishType.ScarletBlue]: scarlet_blue,
    [FishType.StripeBlue]: stripe_blue,
    [FishType.StripeYellow]: stripe_yellow,
    [FishType.Yellow]: yellow,
  } as const;

  let hovered = $state(false);
</script>

<button
  onmouseenter={() => {
    hovered = true;
    onclick?.();
  }}
  onmouseleave={() => {
    hovered = false;
  }}
  class={cn("absolute", extraClass)}
>
  <img
    src={fishImages[fishType]}
    alt={fishType}
    height={size}
    width={size}
    class="pointer-events-none select-none {hovered
      ? 'brightness-200'
      : 'brightness-100'}"
  />
</button>
