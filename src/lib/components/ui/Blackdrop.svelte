<script lang="ts">
  let { id, class: extraClass = "" }: { id?: string; class?: string } =
    $props();
</script>

<div {id} class="absolute size-full bg-black {extraClass}"></div>
