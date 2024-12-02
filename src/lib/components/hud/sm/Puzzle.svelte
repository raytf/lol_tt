<script lang="ts">
  import { onMount } from "svelte";
  import { Popover } from "flowbite-svelte";
  import { gsap } from "gsap";
  import { CustomWiggle } from "gsap/CustomWiggle";
  import { fade } from "svelte/transition";
  import { Lol } from "$components/text";
  import { Reset, Close, Pulse } from "$components/svg/icons";
  import { InfoButton } from "$components/ui/button";
  import { steps } from "$components/scientificMethod";
  import { lolApi, objectivesApi } from "$apis";
  import { flipElement, doFlip } from "$stores/flip";

  let {
    onClose,
    onCall,
    onIncorrect,
    class: extraClass,
  }: {
    onClose?: () => void;
    onCall?: () => void;
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
    playEndAnimation();
  }

  function passwordIncorrect() {
    isIncorrect = true;
    gsap.to(".container-password", {
      duration: 0.44,
      rotation: 11,
      ease: "shake",
    });

    setTimeout(() => {
      resetPassword();
      onIncorrect && onIncorrect();
    }, 1111);
  }

  function resetPassword() {
    isCorrect = false;
    isIncorrect = false;
    clicked = [...resetValues];
    password = [...emptyValues];
    currentIndex = 0;
  }

  CustomWiggle.create("shake", { wiggles: 4 });
  let currentIndex = $state(0);
  let startContainerElement: HTMLElement;
  let endContainerElement: HTMLElement;
  onMount(() => {
    gsap.set(
      [".container-smPuzzle", ".anim_start-1", ".anim_start-2", ".anim_end"],
      {
        opacity: 0,
      },
    );
    gsap.to(".container-smPuzzle", { opacity: 1, duration: 1 });

    if ($objectivesApi.hasCompleted("obj_check-equipment")) {
      playStartAnimation();
    } else {
      playEndAnimation();
    }
  });

  function playStartAnimation() {
    if ($flipElement && startContainerElement) {
      doFlip(
        () => {
          startContainerElement.appendChild($flipElement);
        },
        {
          absolute: true,
          duration: 1,
          onComplete: () => {
            gsap.to(".anim_start-1", { opacity: 1, duration: 1 });
            gsap.to(".anim_start-2", { opacity: 1, delay: 0.5, duration: 1 });
          },
        },
      );
    }
  }

  function playEndAnimation() {
    gsap.to([".anim_start-1", ".anim_start-2"], { opacity: 0, duration: 1 });
    if ($flipElement && endContainerElement) {
      doFlip(
        () => {
          endContainerElement.appendChild($flipElement);
        },
        {
          absolute: true,
          duration: 1,
          onComplete: () => {
            gsap.to(".anim_end", {
              opacity: 1,
              duration: 1,
              onComplete: () => {
                onClose?.();
                setTimeout(() => {
                  onCall?.();
                }, 1111);
              },
            });
          },
        },
      );
    }
  }
</script>

<div
  transition:fade|global={{ duration: 555 }}
  class="container-smPuzzle text-black {extraClass}"
>
  <div
    class="absolute size-full flex flex-col items-center justify-center pointer-events-none"
  >
    <Pulse class="anim_end w-[88px] h-[88px]" />
    <div bind:this={endContainerElement} class="w-[222px] h-[222px]"></div>
  </div>
  <button
    onclick={() => {
      onClose?.();
    }}
    class="absolute top-4 right-4"
  >
    <Close class="w-[55px] h-[55px]" />
  </button>
  <div class="flex flex-row justify-center items-center">
    <span bind:this={startContainerElement} class="w-[111px] h-[111px]"></span>
    <p class="anim_start-1 text-4xl font-bold mt-4 ml-4 mr-1">
      {$lolApi.getText("sm-puzzle_title")}
    </p>
    <InfoButton
      onclick={() => $lolApi.speakText("hint_radio-code")}
      buttonClass="anim_start-1 w-[22px] h-[22px]"
      imgClass="size-full"
    />
  </div>
  <Popover title={$lolApi.getText("hint")} trigger="click" offset={0}
    >{$lolApi.getText("hint_radio-code")}</Popover
  >

  <div class="anim_start-1 relative z-[-1]">
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
    </div>
    <button onclick={resetPassword} class="absolute top-6 -right-12">
      <Reset class="w-[55px] h-[55px]" />
    </button>
  </div>

  <div class="anim_start-2 puzzle-grid mt-8">
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
        class="puzzle-item m-2 p-4 {step.label} {clicked[i]
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
    background: rgba(255, 255, 255, 0.44);
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
    border-radius: 2em;

    background-color: var(--color);

    user-select: none;
  }
  .container-password {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }
</style>
