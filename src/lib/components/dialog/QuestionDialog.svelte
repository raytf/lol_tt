<script lang="ts">
  import type { Snippet } from "svelte";
  import { blur } from "svelte/transition";
  import type { DialogKey } from "$components/dialog";
  import { Dialog } from "$components/dialog";
  import { lolApi } from "$apis/lol.svelte";

  let {
    reveal = true,
    questionKey,
    option1Key,
    option2Key,
    option3Key,
    option1DialogKeys = [],
    option2DialogKeys = [],
    option3DialogKeys = [],
    option1Correct = false,
    option2Correct = false,
    option3Correct = false,
    onclick1,
    onclick2,
    onclick3,
    onFinish1,
    onFinish2,
    onFinish3,
  }: {
    reveal?: boolean;
    questionKey: string;
    option1Key: string;
    option2Key: string;
    option3Key: string;
    option1DialogKeys?: DialogKey[];
    option2DialogKeys?: DialogKey[];
    option3DialogKeys?: DialogKey[];
    option1Correct?: boolean;
    option2Correct?: boolean;
    option3Correct?: boolean;
    onclick1?: () => void;
    onclick2?: () => void;
    onclick3?: () => void;
    onFinish1?: () => void;
    onFinish2?: () => void;
    onFinish3?: () => void;
  } = $props();

  let clicked1 = $state(false);
  let clicked2 = $state(false);
  let clicked3 = $state(false);
  let dialogKeys = $state<DialogKey[]>([]);

  $effect(() => {
    if (!reveal) {
      dialogKeys = [];
      clicked1 = false;
      clicked2 = false;
      clicked3 = false;
    }
  });
</script>

{#if reveal}
  <div transition:blur class="container-question select-none">
    <h1 class="text-5xl font-bold mb-2">
      {$lolApi.getText(questionKey)}
    </h1>
    <div class="flex flex-col justify-evenly text-2xl">
      <button
        onclick={() => {
          clicked1 = true;
          dialogKeys = option1DialogKeys;
          onclick1?.();
        }}
        class="button-option {clicked1
          ? option1Correct
            ? 'text-green-500'
            : 'line-through text-red-500'
          : ''}"
      >
        {$lolApi.getText(option1Key)}
      </button>
      <button
        onclick={() => {
          clicked2 = true;
          dialogKeys = option2DialogKeys;
          onclick2?.();
        }}
        class="button-option {clicked2
          ? option2Correct
            ? 'text-green-500'
            : 'line-through text-red-500'
          : ''}"
      >
        {$lolApi.getText(option2Key)}
      </button>
      <button
        onclick={() => {
          clicked3 = true;
          dialogKeys = option3DialogKeys;
          onclick3?.();
        }}
        class="button-option {clicked3
          ? option3Correct
            ? 'text-green-500'
            : 'line-through text-red-500'
          : ''}"
      >
        {$lolApi.getText(option3Key)}
      </button>
    </div>
    {#if clicked1}
      <Dialog keys={option1DialogKeys} onFinished={onFinish1} />
    {/if}
    {#if clicked2}
      <Dialog keys={option2DialogKeys} onFinished={onFinish2} />
    {/if}
    {#if clicked3}
      <Dialog keys={option3DialogKeys} onFinished={onFinish3} />
    {/if}
  </div>
{/if}

<style>
  .container-question {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.55);
    padding: 2em;

    display: flex;
    flex-direction: column;
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
