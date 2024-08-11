<script lang="ts">
  import { DialogBox } from "$components/dialog";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  interface DialogKey {
    imgSrc?: string;
    name?: string;
    text: string;
  }

  let { keys, onFinished }: { keys: DialogKey[]; onFinished?: () => void } =
    $props();

  let dialogIndex = $state(0);

  function nextDialog() {
    dialogIndex++;
    if (dialogIndex < keys.length) {
      return;
    }

    if (onFinished) {
      onFinished();
    }
  }
</script>

{#each keys as key, i}
  {#if i === dialogIndex}
    <DialogBox onclick={nextDialog}>
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
        {lolApi.getText(key.text)}
      {/snippet}
    </DialogBox>
  {/if}
{/each}
