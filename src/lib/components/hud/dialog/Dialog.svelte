<script lang="ts">
  import { onMount } from "svelte";
  import type { DialogKey, DialogOption } from "$apis/dialog.svelte";
  import { DialogBox, Options } from "$components/hud/dialog";
  import { lolApi } from "$apis/lol.svelte";

  let {
    keys,
    top = false,
    onFinished,
    class: extraClass,
    style: extraStyle,
    optionsClass,
  }: {
    keys: DialogKey[];
    top?: boolean;
    onFinished?: () => void;
    class?: string;
    style?: string;
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
    showOptions = false;
    nextLine();
  }

  function nextLine() {
    dialogIndex++;

    if (currentKey) {
      $lolApi.speakText(currentKey.text);
      if (currentKey.onStart) currentKey.onStart();
    } else {
      if (onFinished) onFinished();
    }
  }

  function insertDialog(dialog: DialogKey[] = []) {
    dialogArray.splice(dialogIndex + 1, 0, ...dialog);
  }

  onMount(() => {
    if (currentKey) {
      $lolApi.speakText(currentKey.text);
    }
  });
</script>

{#if currentKey}
  <DialogBox
    onclick={onclickNext}
    options={currentKey.options ? true : false}
    {top}
    class={extraClass}
    style={extraStyle}
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
