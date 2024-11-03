<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { Flip } from "gsap/Flip";
  import { fade } from "svelte/transition";
  import { Lol } from "$components/text";
  import { Reset, Close } from "$components/svg/icons";
  import { Radio } from "$components/svg/icons";
  import { steps } from "$components/scientificMethod";
  import { lolApi, hudApi } from "$apis";

  let {
    onClose,
    onCorrect,
    onIncorrect,
    class: extraClass,
  }: {
    onClose?: () => void;
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
  onMount(() => {
    gsap.set(".container-smPuzzle", { opacity: 0 });
    gsap.to(".container-smPuzzle", { opacity: 1, duration: 1 });
  });

  function moveRadio() {
    const radio = document.querySelector(".radio") as HTMLElement | null,
      parentContainer = document.querySelector(".container-smPuzzle");
    if (radio && parentContainer) {
      const initialRadioState = Flip.getState(radio);
      radio.style.position = "absolute";
      radio.style.width = "555px";
      radio.style.height = "555px";
      parentContainer.appendChild(radio);

      Flip.from(initialRadioState, { absolute: true, duration: 1 });
    }
  }
</script>

<div
  transition:fade|global={{ duration: 555 }}
  class="container-smPuzzle text-black {extraClass}"
>
  <button
    onclick={() => {
      //Remove later
      moveRadio();
      onClose?.();
    }}
    class="absolute top-4 right-4"
  >
    <Close class="w-[55px] h-[55px]" />
  </button>
  <div class="flex flex-row justify-center items-center">
    <Radio class="radio" style="width: 88px; height: 88px;" />
    <h1 class="text-4xl font-bold mt-4 mx-4">
      {$lolApi.getText("sm-puzzle_title")}
    </h1>
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
  <div class="puzzle-grid mt-8">
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
  <p class="text-xl mt-2">
    {$lolApi.getText("sm-puzzle_instructions")}
  </p>
</div>

<style>
  .container-smPuzzle {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.55);
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
    user-select: none;
  }
</style>
