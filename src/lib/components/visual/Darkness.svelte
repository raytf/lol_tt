<script lang="ts">
  type Light = {
    x: number;
    y: number;
    unit: string;
    radius: number;
    // color: string;
  };
  let {
    level = 0,
    lights = [],
    class: extraClass,
  }: { level?: number; lights?: Light[]; class?: string } = $props();

  let mask = $derived.by(() => {
    let mask = "";
    lights.forEach((light, idx) => {
      if (idx !== 0) mask += `, `;
      mask += `radial-gradient(
      circle ${light.radius}rem at ${light.x}${light.unit} ${light.y}${light.unit},
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    )`;
    });
    return mask;
  });
</script>

<div
  class="darkness {extraClass}"
  style="mask-image: {mask}; background-color: rgba(0, 0, 0, {level});"
></div>

<style>
  .darkness {
    position: absolute;
    width: 100%;
    height: 100%;

    pointer-events: none;
    mask-composite: intersect;
  }
</style>
