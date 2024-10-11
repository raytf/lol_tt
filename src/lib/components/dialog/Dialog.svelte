<script lang="ts">
  import { onMount } from "svelte";
  import type { DialogKey } from "$components/dialog";
  import { DialogBox, Options } from "$components/dialog";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    keys,
    hint = false,
    once = true,
    top = false,
    onProceed,
    onFinished,
  }: {
    keys: DialogKey[];
    once?: boolean;
    hint?: boolean;
    top?: boolean;
    onProceed?: () => void;
    onFinished?: (nextDialog: DialogKey[]) => void;
  } = $props();

  let dialogIndex = $state(0);
  let showDialog = $state(true);
  let showOptions = $state(false);

  function proceed(nextDialog: DialogKey[] = []) {
    dialogIndex++;
    if (dialogIndex < keys.length) {
      lolApi.speakText(keys[dialogIndex].text);
      if (onProceed) {
        onProceed();
      }
      return;
    }

    if (onFinished) {
      onFinished(nextDialog);
      showOptions = false;
      if (!once) dialogIndex = 0;
    }
  }

  onMount(() => {
    if (keys.length > 0) lolApi.speakText(keys[0].text);
  });
</script>

{#each keys as key, i}
  {#if i === dialogIndex}
    {#if showDialog}
      <DialogBox
        onclick={key.options ? () => (showOptions = true) : () => proceed([])}
        italic={hint}
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
    {#if showOptions && key.options}
      <Options options={key.options} onclickOption={proceed} />
    {/if}
  {/if}
{/each}
