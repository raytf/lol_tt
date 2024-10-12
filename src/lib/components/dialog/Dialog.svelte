<script lang="ts">
  import { onMount } from "svelte";
  import type { DialogKey } from "$components/dialog";
  import { DialogBox, Options } from "$components/dialog";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    keys,
    hint = false,
    top = false,
    onProceed,
    onFinished,
  }: {
    keys: DialogKey[];
    hint?: boolean;
    top?: boolean;
    onProceed?: () => void;
    onFinished?: () => void;
  } = $props();

  let dialogArray = $state([...keys]);
  let dialogIndex = $state(0);
  let showDialog = $state(true);
  let showOptions = $state(false);

  function proceed() {
    dialogIndex++;
    showOptions = false;
    if (dialogIndex < dialogArray.length) {
      lolApi.speakText(dialogArray[dialogIndex].text);
      if (onProceed) {
        onProceed();
      }
      return;
    }

    if (onFinished) {
      onFinished();
    }
  }

  function insertDialog(dialog: DialogKey[] = []) {
    dialogArray.splice(dialogIndex + 1, 0, ...dialog);
  }

  onMount(() => {
    // Speak the first dialog
    if (dialogArray.length > 0) lolApi.speakText(dialogArray[0].text);
  });
</script>

{#each dialogArray as key, i}
  {#if i === dialogIndex}
    {#if showDialog}
      <DialogBox
        onclick={key.options ? () => (showOptions = true) : proceed}
        italic={hint || key.italic}
        {top}
      >
        {#snippet avatar()}
          <div class="relative w-[111px] h-[111px]">
            {#if key.imgSrc}
              <img
                src={key.imgSrc}
                alt="avatar"
                class="size-full select-none"
              />
            {/if}
          </div>
        {/snippet}
        {#snippet name()}
          {#if key.name}
            {lolApi.getText(key.name)}
          {:else}
            ???
          {/if}
        {/snippet}
        {#snippet text()}
          {@html lolApi.getText(key.text)}
        {/snippet}
      </DialogBox>
    {/if}
    {#if key.options && (key.alreadyRead || showOptions)}
      <Options
        {key}
        onclickOption={(nextDialog) => {
          insertDialog(nextDialog);
          proceed();
        }}
      />
    {/if}
  {/if}
{/each}
