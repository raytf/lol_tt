<script lang="ts">
  import { Button } from "$components/ui/button";
  import { lolApi } from "$apis/lol.svelte";

  let {
    key,
    disabledOptions,
    class: extraClass,
    onclickOption,
  }: {
    key: DialogKey;
    disabledOptions?: string[];
    class?: string;
    onclickOption: (
      selectedOption: DialogOption,
      nextDialog: DialogKey[],
    ) => void;
  } = $props();
</script>

<div class="container-options {extraClass}">
  {#if key.options}
    {#each key.options as option}
      <Button
        class="flex flex-row items-center h-[88px] m-2 text-xl {disabledOptions?.includes(
          option.text,
        ) && 'opacity-50 !pointer-events-none'}"
        onclick={() => {
          const selected = {
            imgSrc: option.imgSrc,
            name: "explorer",
            text: option.text,
            onProceed: option.onProceed,
          };
          const nextDialog = [...option.nextDialog];
          //const nextDialog = [selected, ...option.nextDialog];
          if (option.repeat) {
            const originalDialog = { ...key };
            originalDialog.alreadyRead = true;
            nextDialog.push(originalDialog);
          }

          onclickOption(option, nextDialog);
        }}
      >
        {#if option.imgSrc}
          <img src={option.imgSrc} alt="icon" class="h-full mr-2" />
        {/if}
        <p>{@html $lolApi.getText(option.text)}</p>
      </Button>
    {/each}
  {/if}
</div>

<style>
  .container-options {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.44);
    padding: 2em;
    padding-top: 200px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    user-select: none;
  }
</style>
