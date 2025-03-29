<script lang="ts">
  import { Lol } from "$components/text";
  import { InfoButton } from "$components/ui/button";
  import { SmButton } from "$components/hud/notepad";
  import { infoApi, objectivesApi, inventoryApi, hudApi } from "$apis";
  import { tool } from "$dialog/chapter2";
</script>

<div class="flex gap-2">
  <SmButton step="sm-e" />
  <Lol key="np-forest-experiment_title" class="font-bold underline" />
</div>
<div class="flex gap-2">
  <button
    onclick={() => {
      $infoApi.openModal({
        textKeys: ["ind-variable_desc-1", "ind-variable_desc-2"],
        onClose: () => {
          $objectivesApi.completeTask("task_review-ind");
        },
      });
    }}
    class="flex hover:font-bold pointer-events-auto"
  >
    <InfoButton /><Lol key="ind-variable" />:
  </button>
  <Lol key="np-forest-experiment_depth" />
</div>
<div class="flex gap-2">
  <button
    onclick={() => {
      $infoApi.openModal({
        textKeys: ["dep-variable_desc-1", "dep-variable_desc-2"],
        onClose: () => {
          $objectivesApi.completeTask("task_review-dep");
          if (!$inventoryApi.isItemUnlocked("pg")) {
            $hudApi.startDialog({
              keys: tool,
            });
          }
        },
      });
    }}
    class="flex hover:font-bold pointer-events-auto"
  >
    <InfoButton /><Lol key="dep-variable" />:
  </button>
  <Lol key="np-forest-experiment_pressure" />
</div>
