<script lang="ts">
  import { Lol } from "$components/text";
  import { SimpleButton } from "$components/ui/button";
  import { SmButton } from "$components/hud/notepad";
  import { notepadApi, infoApi, objectivesApi, lolApi, hudApi } from "$apis";
  import { cn } from "$lib/utils";

  import { hypothesis } from "$dialog/chapter3";
</script>

{#if $notepadApi.currentPage.type === "sm"}
  <Lol key="np-abyss-notes_title" class="font-bold underline" />

  <SmButton step="sm-o" />
  {#each $notepadApi.currentPage.observations as observation}
    <Lol key={observation} class="text-left" />
  {/each}

  {#if $notepadApi.currentPage.question}
    <SmButton step="sm-q" />
    <Lol key={$notepadApi.currentPage.question} class="text-left" />
  {/if}

  {#if $notepadApi.currentPage.hypothesis}
    <SmButton step="sm-h" />
    <Lol key={$notepadApi.currentPage.hypothesis} class="text-left" />
  {:else}
    <SimpleButton
      onclick={() => {
        $hudApi.startDialog({
          keys: hypothesis,
          onFinished: () => {
            $objectivesApi.completeTask("task_hypothesis");
          },
        });
      }}
      class="pointer-events-auto">{$lolApi.getText("take-guess")}</SimpleButton
    >
  {/if}
{/if}
