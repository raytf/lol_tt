<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { gameApi, hudApi, lolApi } from "$apis";
  import { Dive } from "$components/svg/icons";
  import { Button, SimpleButton } from "$components/ui/button";

  onMount(() => {
    // $hudApi.enabled = true;
    // $hudApi.showMissionBrief = true;
  });
</script>

<div class="size-full bg-blue-200">
  <SimpleButton class="">
    <Dive class="w-[33px] h-[33px]" />
    <p class="text-2xl">{$lolApi.getText("dive")}</p>
  </SimpleButton>
</div>
