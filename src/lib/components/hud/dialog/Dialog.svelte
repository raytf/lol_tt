<script lang="ts">
  import { onMount } from "svelte";
  import type { Dialog } from "$apis/dialog.svelte";
  import { DialogBox, Options } from "$components/hud/dialog";
  import { lolApi } from "$apis/lol.svelte";

  let {
    dialog,
    class: extraClass,
    style: extraStyle,
    optionsClass,
  }: {
    dialog: Dialog | null;
    class?: string;
    style?: string;
    optionsClass?: string;
  } = $props();

  let showOptions = $state(false);

  function onclickNext() {
    const currentKey = dialog?.currentKey;
    if (!currentKey) return;
    if (currentKey.options) {
      currentKey.onShowOptions?.();
      showOptions = true;
      return;
    }

    if (currentKey.onProceed) currentKey.onProceed();
    dialog.nextLine();
  }

  function onclickOption(
    selectedOption: DialogOption,
    nextDialog: DialogKey[],
  ) {
    const currentKey = dialog?.currentKey;
    if (!currentKey) return;
    dialog.insertDialog(nextDialog);

    if (currentKey.onProceed) currentKey.onProceed();
    showOptions = false;
    dialog.nextLine();
  }

  onMount(() => {
    const currentKey = dialog?.currentKey;
    if (currentKey) {
      currentKey?.onStart?.();
      $lolApi.speakText(currentKey.text);
    }
  });
</script>

{#if dialog && dialog?.currentKey}
  <DialogBox
    onclick={onclickNext}
    options={dialog?.currentKey.options ? true : false}
    top={dialog?.position === "top"}
    class="{dialog?.blockInput && 'pointer-events-auto'} {extraClass}"
    style={extraStyle}
  >
    {#snippet avatar()}
      <div class="relative w-[111px] h-[111px]">
        {#if dialog.currentKey?.imgSrc}
          <img
            src={dialog?.currentKey?.imgSrc}
            alt="avatar"
            class="size-full select-none"
          />
        {/if}
      </div>
    {/snippet}
    {#snippet name()}
      {#if dialog.currentKey?.name}
        {$lolApi.getText(dialog.currentKey?.name)}
      {:else}
        ???
      {/if}
    {/snippet}
    {#snippet text()}
      {@html $lolApi.getText(dialog.currentKey?.text)}
    {/snippet}
  </DialogBox>
  {#if dialog?.currentKey.options && (dialog?.currentKey.alreadyRead || showOptions)}
    <Options
      key={dialog?.currentKey}
      disabledOptions={dialog?.disabledOptions}
      {onclickOption}
      class={optionsClass}
    />
  {/if}
{/if}
