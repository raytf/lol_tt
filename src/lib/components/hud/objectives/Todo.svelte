<script lang="ts">
  import type { Task } from "$apis/hud.svelte";
  import { fade } from "svelte/transition";
  import { Lol } from "$components/text";
  let { task }: { task: Task } = $props();
</script>

<li in:fade|global class="flex flex-row items-center pl-4">
  <input type="checkbox" checked={task.completed} />
  <Lol key={task.key} class="ml-2 {task.completed ? 'line-through' : ''}" />
</li>
