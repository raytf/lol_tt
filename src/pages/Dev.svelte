<script lang="ts">
  import {
    RadioPassword,
    ScientificMethodDiagram,
    steps,
  } from "$components/scientificMethod";

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
  const empty = ["_", "_", "_", "_", "_", "_"];
  let password = $state([...empty]);

  function checkPassword() {
    const correctPassword = steps.map((step) => step.title[0]);
    console.log("Correct password:", correctPassword);
    if (password.join("") === correctPassword.join("")) {
      console.log("Password correct!");
    } else {
      console.log("Password incorrect!");
    }
  }

  function resetPassword() {
    password = [...empty];
    currentIndex = 0;
  }

  let currentIndex = $state(0);
</script>

<div class="size-full bg-blue-200">
  {#each randomSteps as step, i}
    <button
      onclick={() => {
        password[currentIndex] = step.title[0];
        currentIndex++;
        if (currentIndex >= password.length) {
          checkPassword();
          //currentIndex = 0;
        }
      }}
    >
      <p class="select-none">{step.title}</p>
    </button>
  {/each}
  <div class="absolute bottom-0 w-full flex justify-center items-end pb-8">
    {#each password as char, i}
      <span class="text-8xl mx-4 w-[55px]">{char}</span>
    {/each}
    <button onclick={resetPassword}>Clear</button>
  </div>
  <!-- <ScientificMethodDiagram
    class="w-[666px] h-[222px] mt-14 z-[1]"
    itemClass="h-[111px]"
  /> -->
</div>
