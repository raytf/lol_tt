<script>
  import LanguageLoader from "$lib/components/LanguageLoader.svelte";
  import Exploration from "./Exploration.svelte";
  import EncounterShell from "./story/EncounterShell.svelte";
</script>

<LanguageLoader />
<div class="relative size-full">
  <Exploration />
  <EncounterShell />
</div>
