<script lang="ts">
  import { fade } from "svelte/transition";
  import { Lol } from "$components/text";
  import { Reset, Close } from "$components/svg/icons";
  import { steps } from "$components/scientificMethod";
  import { lolApi, hudApi } from "$apis";

  let {
    onCorrect,
    onIncorrect,
    class: extraClass,
  }: {
    onCorrect?: () => void;
    onIncorrect?: () => void;
    class?: string;
  } = $props();

  function shuffleArray(array: any[]): any[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const randomSteps = shuffleArray(steps);
  const emptyValues = ["_", "_", "_", "_", "_", "_"];
  let password = $state([...emptyValues]);
  const resetValues = [false, false, false, false, false, false];
  let clicked = $state([...resetValues]);
  let isIncorrect = $state(false);
  let isCorrect = $state(false);

  function getLolFirstLetter(titleKey: string): string {
    const title = $lolApi.getText(titleKey);
    return title[0];
  }

  function checkPassword() {
    const correctPassword = steps.map((step) =>
      getLolFirstLetter(step.titleKey),
    );

    if (password.join("") === correctPassword.join("")) {
      passwordCorrect();
    } else {
      passwordIncorrect();
    }
  }

  function passwordCorrect() {
    isCorrect = true;
    onCorrect && onCorrect();
  }

  function passwordIncorrect() {
    isIncorrect = true;
    onIncorrect && onIncorrect();
  }

  function resetPassword() {
    isCorrect = false;
    isIncorrect = false;
    clicked = [...resetValues];
    password = [...emptyValues];
    currentIndex = 0;
  }

  let currentIndex = $state(0);
</script>

<div
  transition:fade|global={{ duration: 222 }}
  class="container-puzzle pointer-events-auto {extraClass}"
>
  <h1 class="text-4xl font-bold mt-8">Enter password</h1>
  <p class="text-xl m-2">
    Click the Scientific Method steps in the right order.
  </p>
  <button
    onclick={() => {
      $hudApi.showSmPuzzle = false;
    }}
    class="absolute top-4 right-4"
  >
    <Close class="w-[55px] h-[55px] text-white" />
  </button>
  <div class="puzzle-grid">
    {#each randomSteps as step, i}
      <button
        onclick={() => {
          if (currentIndex >= password.length) return;
          clicked[i] = true;
          password[currentIndex] = getLolFirstLetter(step.titleKey);
          currentIndex++;
          if (currentIndex >= password.length) {
            checkPassword();
          }
        }}
        class="puzzle-item m-2 p-4 {step.bgColor} {clicked[i]
          ? 'opacity-50 pointer-events-none'
          : ''}"
      >
        <Lol
          key={step.titleKey}
          class="text-2xl text-black font-bold select-none"
        />
        <img src={step.image} alt="icon" class="w-[55px] h-[55px] m-2" />
      </button>
    {/each}
  </div>
  <div class="container-password">
    {#each password as char, i}
      <span
        class="text-8xl mx-4 w-[55px] text-center {isIncorrect
          ? 'text-red-500'
          : isCorrect
            ? 'text-green-500'
            : ''}">{char}</span
      >
    {/each}
    <button onclick={resetPassword} class="absolute right-44">
      <Reset class="w-[55px] h-[55px]" />
    </button>
  </div>
</div>

<style>
  .container-puzzle {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.88);
  }
  .puzzle-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  .puzzle-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: black 1px solid;
    border-radius: 22%;

    user-select: none;
  }
  .container-password {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;
    user-select: none;
  }
</style>
