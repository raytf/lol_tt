<script>
  import LanguageLoader from "$lib/components/LanguageLoader.svelte";
  import Exploration from "./Exploration.svelte";
  import ShellEncounter from "./encounters/Shell.svelte";
</script>

<LanguageLoader />
<div class="relative size-full">
  <Exploration />
  <ShellEncounter />
</div>
