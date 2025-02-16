<script lang="ts">
  let {
    startTime = 0.5,
    pathDuration = 0.2,
    class: extraClass,
  }: { startTime?: number; pathDuration?: number; class?: string } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  class={extraClass}
  ><g
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    ><path stroke-dasharray="20" stroke-dashoffset="20" d="M21 12h-17.5"
      ><animate
        fill="freeze"
        attributeName="stroke-dashoffset"
        begin="{startTime}s"
        dur="{pathDuration}s"
        values="20;0"
      /></path
    ><path stroke-dasharray="12" stroke-dashoffset="12" d="M3 12l7 7M3 12l7 -7"
      ><animate
        fill="freeze"
        attributeName="stroke-dashoffset"
        begin="{startTime ? startTime + pathDuration : pathDuration}s"
        dur="{pathDuration}s"
        values="12;0"
      /></path
    ></g
  ></svg
>
