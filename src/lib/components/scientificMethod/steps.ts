import eye from "$assets/icons/eye.svg";
import question from "$assets/icons/question-mark.svg";
import lightbulb from "$assets/icons/light-bulb.svg";
import testTube from "$assets/icons/test-tube.svg";
import barChart from "$assets/icons/bar-chart.svg";
import notebook from "$assets/icons/notebook.svg";

export default [
  {
    titleKey: "sm-observation",
    description:
      "The first step in the scientific method is to make an observation about the world around you.",
    image: eye,
    border: "rounded-tl-3xl border-t-4 border-l-4 border-r-2 border-b-2",
    label: "sm-o",
  },
  {
    titleKey: "sm-question",
    description:
      "After making an observation, you should ask a question about what you observed.",
    image: question,
    border: "border-t-4 border-2",
    label: "sm-q",
  },
  {
    titleKey: "sm-hypothesis",
    description:
      "A hypothesis is a possible explanation for the observation you made.",
    image: lightbulb,
    border: "rounded-tr-3xl border-t-4 border-r-4 border-l-2 border-b-2",
    label: "sm-h",
  },
  {
    titleKey: "sm-experiment",
    description:
      "An experiment is a test to see if your hypothesis is correct.",
    image: testTube,
    border: "rounded-bl-3xl border-b-4 border-l-4 border-r-2 border-t-2",
    label: "sm-e",
  },
  {
    titleKey: "sm-analysis",
    description:
      "After conducting an experiment, you should analyze the results to see if they support your hypothesis.",
    image: barChart,
    border: "border-b-4 border-2",
    label: "sm-a",
  },
  {
    titleKey: "sm-conclusion",
    description:
      "The final step in the scientific method is to draw a conclusion based on the results of your experiment.",
    image: notebook,
    border: "rounded-br-3xl border-b-4 border-r-4 border-l-2 border-t-2",
    label: "sm-c",
  },
];
