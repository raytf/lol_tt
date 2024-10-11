<script lang="ts">
  import type { DialogOption, DialogKey } from "$components/dialog";
  import { Dialog } from "$components/dialog";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    options,
    onclickOption,
  }: {
    options: DialogOption[];
    onclickOption: (nextDialog: DialogKey[]) => void;
  } = $props();
</script>

<div class="container-options">
  {#each options as option, i}
    <button
      class="button-option"
      onclick={() => {
        onclickOption(options[i].nextDialog);
      }}
    >
      {lolApi.getText(option.text)}
    </button>
  {/each}
</div>

<style>
  .container-options {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.22);
    padding: 2em;
    padding-top: 222px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    z-index: 100;
  }
  .button-option {
    padding: 1em;
    margin: 0.5em;
    border: 1px solid black;
    border-radius: 0.5em;
    background: rgba(0, 0, 0, 0.55);
  }
</style>
