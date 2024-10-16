<script lang="ts">
  import type { DialogKey } from "$components/dialog";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { gsap } from "gsap";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  let {
    key,
    onclickOption,
  }: {
    key: DialogKey;
    onclickOption: (nextDialog: DialogKey[]) => void;
  } = $props();

  onMount(() => {
    gsap.to(".container-options", {
      opacity: 1,
      duration: 1,
    });
  });
</script>

<div transition:fade|global class="container-options">
  {#if key.options}
    {#each key.options as option}
      <button
        class="button-option"
        onclick={() => {
          const nextDialog = [...option.nextDialog];
          if (option.repeat) {
            const originalDialog = { ...key };
            originalDialog.alreadyRead = true;
            nextDialog.push(originalDialog);
          }

          onclickOption(nextDialog);
        }}
      >
        {lolApi.getText(option.text)}
      </button>
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
    padding-top: 222px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    user-select: none;
    z-index: 100;
    opacity: 0;
  }
  .button-option {
    padding: 1em;
    margin: 0.5em;
    border: 1px solid black;
    border-radius: 0.5em;
    background: rgba(0, 0, 0, 0.55);
    transition: transform 0.5s;
    will-change: transform;
    backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-font-smoothing: subpixel-antialiased;
  }
  .button-option:hover {
    transform: scale(1.022);
  }
</style>
