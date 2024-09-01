<script lang="ts">
  import ExplorationWrecks from "./chapter1/exploration/Wrecks.svelte";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();
</script>

<p>{lolApi.getText("title")}</p>
