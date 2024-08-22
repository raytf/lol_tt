<script lang="ts">
  import { onMount } from "svelte";
  import type { DialogKey } from "$components/dialog";
  import { DialogBox } from "$components/dialog";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    keys,
    hint = false,
    once = true,
    onProceed,
    onFinished,
  }: {
    keys: DialogKey[];
    once?: boolean;
    hint?: boolean;
    onProceed?: () => void;
    onFinished?: () => void;
  } = $props();

  let dialogIndex = $state(0);

  function nextDialog() {
    dialogIndex++;
    if (dialogIndex < keys.length) {
      //lolApi.speakText(keys[dialogIndex].text);
      if (onProceed) {
        onProceed();
      }
      return;
    }

    if (onFinished) {
      onFinished();
      if (!once) dialogIndex = 0;
    }
  }

  onMount(() => {
    //lolApi.speakText(keys[0].text);
  });
</script>

{#each keys as key, i}
  {#if i === dialogIndex}
    <DialogBox onclick={nextDialog} italic={hint}>
      {#snippet avatar()}
        <div class="relative w-[111px] h-[111px]">
          {#if key.imgSrc}
            <img src={key.imgSrc} alt="avatar" class="size-full select-none" />
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
{/each}
