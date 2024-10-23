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
  let currentKey = $derived.by(() => {
    if (dialogIndex >= dialogArray.length) {
      return null;
    }
    return dialogArray[dialogIndex];
  });
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
    if (dialogArray.length > 0) {
      lolApi.speakText(dialogArray[0].text);
    }
  });
</script>

{#if currentKey}
  <DialogBox
    onclick={currentKey.options ? () => (showOptions = true) : proceed}
    options={currentKey.options ? true : false}
    italic={hint || currentKey.italic}
    {top}
  >
    {#snippet avatar()}
      <div class="relative w-[111px] h-[111px]">
        {#if currentKey.imgSrc}
          <img
            src={currentKey.imgSrc}
            alt="avatar"
            class="size-full select-none"
          />
        {/if}
      </div>
    {/snippet}
    {#snippet name()}
      {#if currentKey.name}
        {lolApi.getText(currentKey.name)}
      {:else}
        ???
      {/if}
    {/snippet}
    {#snippet text()}
      {@html lolApi.getText(currentKey.text)}
    {/snippet}
  </DialogBox>
  {#if currentKey.options && (currentKey.alreadyRead || showOptions)}
    <Options
      key={currentKey}
      onclickOption={(nextDialog) => {
        insertDialog(nextDialog);
        proceed();
      }}
    />
  {/if}
{/if}
