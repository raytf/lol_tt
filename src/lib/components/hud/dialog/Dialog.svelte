<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { DialogKey, DialogOption } from "$apis/dialog.svelte";
  import { DialogBox, Options } from "$components/hud/dialog";
  import { lolApi } from "$apis/lol.svelte";

  let {
    keys,
    top = false,
    onFinished,
    class: extraClass,
    optionsClass,
  }: {
    keys: DialogKey[];
    top?: boolean;
    onFinished?: () => void;
    class?: string;
    optionsClass?: string;
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

  function onclickNext() {
    if (!currentKey) return;
    if (currentKey.options) {
      showOptions = true;
      return;
    }

    if (currentKey.onProceed) currentKey.onProceed();
    nextLine();
  }

  function onclickOption(
    selectedOption: DialogOption,
    nextDialog: DialogKey[],
  ) {
    if (!currentKey) return;
    insertDialog(nextDialog);

    if (currentKey.onProceed) currentKey.onProceed();
    nextLine();
  }

  function nextLine() {
    dialogIndex++;
    showOptions = false;
    if (dialogIndex < dialogArray.length) {
      $lolApi.speakText(dialogArray[dialogIndex].text);
      return;
    }

    if (onFinished) onFinished();
  }

  function insertDialog(dialog: DialogKey[] = []) {
    dialogArray.splice(dialogIndex + 1, 0, ...dialog);
  }

  onMount(() => {
    // Speak the first dialog
    if (dialogArray.length > 0) {
      $lolApi.speakText(dialogArray[0].text);
    }
  });
</script>

{#if currentKey}
  <DialogBox
    onclick={onclickNext}
    options={currentKey.options ? true : false}
    {top}
    class={extraClass}
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
        {$lolApi.getText(currentKey.name)}
      {:else}
        ???
      {/if}
    {/snippet}
    {#snippet text()}
      {@html $lolApi.getText(currentKey.text)}
    {/snippet}
  </DialogBox>
  {#if currentKey.options && (currentKey.alreadyRead || showOptions)}
    <Options key={currentKey} {onclickOption} class={optionsClass} />
  {/if}
{/if}
