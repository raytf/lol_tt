<script lang="ts">
  import steps from "./steps";
  import { Lol } from "$components/text";
  import { Reset } from "$components/svg/icons";
  import { getLolApi } from "$apis";
  const lolApi = getLolApi();

  let {
    onCorrect,
    onIncorrect,
  }: { onCorrect?: () => void; onIncorrect?: () => void } = $props();

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
    const title = lolApi.getText(titleKey);
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

<div class="container-puzzle bg-black">
  <h1 class="text-4xl font-bold mt-8">Enter password</h1>
  <p class="text-xl m-2">
    Hint: click the Scientific Method steps in the right order.
  </p>
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
        class="puzzle-item m-2 p-6 {step.bgColor} {clicked[i]
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
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    border-radius: 44%;

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
