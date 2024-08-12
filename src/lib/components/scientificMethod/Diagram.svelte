<script lang="ts">
  import { gsap } from "gsap";
  import eye from "$assets/icons/eye.svg";
  import question from "$assets/icons/question-mark.svg";
  import lightbulb from "$assets/icons/light-bulb.svg";
  import testTube from "$assets/icons/test-tube.svg";
  import barChart from "$assets/icons/bar-chart.svg";
  import notebook from "$assets/icons/notebook.svg";

  let {
    visible = true,
    activeIndex = 0,
    class: extraClass,
    itemClass,
  }: {
    visible?: boolean;
    activeIndex?: number;
    class?: string;
    itemClass?: string;
  } = $props();

  const steps = [
    {
      title: "Observation",
      description:
        "The first step in the scientific method is to make an observation about the world around you.",
      image: eye,
      bgColor: "bg-blue-500",
      border: "rounded-tl-3xl border-t-4 border-l-4 border-r-2 border-b-2",
    },
    {
      title: "Question",
      description:
        "After making an observation, you should ask a question about what you observed.",
      image: question,
      bgColor: "bg-cyan-500 border-t-4 border-2",
    },
    {
      title: "Hypothesis",
      description:
        "A hypothesis is a possible explanation for the observation you made.",
      image: lightbulb,
      bgColor: "bg-green-500",
      border: "rounded-tr-3xl border-t-4 border-r-4 border-l-2 border-b-2",
    },
    {
      title: "Experiment",
      description:
        "An experiment is a test to see if your hypothesis is correct.",
      image: testTube,
      bgColor: "bg-yellow-300",
      border: "rounded-bl-3xl border-b-4 border-l-4 border-r-2 border-t-2",
    },
    {
      title: "Analysis",
      description:
        "After conducting an experiment, you should analyze the results to see if they support your hypothesis.",
      image: barChart,
      bgColor: "bg-orange-500 border-b-4 border-2",
    },
    {
      title: "Conclusion",
      description:
        "The final step in the scientific method is to draw a conclusion based on the results of your experiment.",
      image: notebook,
      bgColor: "bg-red-500",
      border: "rounded-br-3xl border-b-4 border-r-4 border-l-2 border-t-2",
    },
  ];

  let revealTl: gsap.core.Timeline;
  $effect(() => {
    gsap.set(".grid-item", { opacity: 0 });
    revealTl = gsap.timeline({ paused: true });
    revealTl.to(".grid-item", {
      opacity: 1,
      duration: 1,
      stagger: 0.44,
    });
  });

  $effect(() => {
    if (visible) {
      revealTl.play();
    } else {
      revealTl.reverse();
    }
  });
</script>

<div class="grid grid-cols-3 grid-rows-2 {extraClass}">
  {#each steps as step, i}
    <div
      class="{itemClass} {activeIndex === i
        ? ''
        : activeIndex >= 0
          ? 'brightness-50'
          : ''} grid-item border-black {step.border} {step.bgColor}"
    >
      <p class="text-2xl font-bold text-black">{i + 1}. {step.title}</p>
      <img src={step.image} alt="icon" class="w-[55px] h-[55px] m-2" />
    </div>
  {/each}
</div>

<style>
  .grid-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition: filter 1s;
  }
</style>
