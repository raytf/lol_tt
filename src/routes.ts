import Title from "./pages/title";
import Dev from "./pages/Dev.svelte";
// Exploration
import Surface from "./pages/location/surface";
import Wrecks from "./pages/location/wrecks";
import Forest from "./pages/location/forest";
// Chapter 1
import Ch1 from "./pages/chapter1";
// import Ch1_Encounter_Shell from "./pages/chapter1/encounters/Shell.svelte";
// import Ch1_Lesson_SMIntro from "./pages/chapter1/lessons/SMIntroduction.svelte";
// // Chapter 2
// import Ch2 from "./pages/chapter2";
// import Ch2_Exploration_Kelp from "./pages/chapter2/exploration/Kelp.svelte";
// import Ch2_Encounter_Otter from "./pages/chapter2/encounters/Otter.svelte";
// // Chapter 3
// import Ch3 from "./pages/chapter3";
// import Ch3_Exploration_Kelp from "./pages/chapter3/exploration/Kelp.svelte";
// import Ch3_Experiment from "./pages/chapter3/experiment/PressureDepth.svelte";
// // Chapter 4
// import Ch4 from "./pages/chapter4";
// import Ch4_Exploration from "./pages/chapter4/exploration/DeepOcean.svelte";

export default {
  "/dev": Dev,
  "/": Title,
  "/surface": Surface,
  "/wrecks": Wrecks,
  // "/forest": Forest,
  "/ch1": Ch1,
  // "/ch1_encounter_shell": Ch1_Encounter_Shell,
  // "/ch1_lesson_sm-intro": Ch1_Lesson_SMIntro,
  // "/ch2": Ch2,
  // "/ch2_exploration_kelp": Ch2_Exploration_Kelp,
  // "/ch2_encounter_otter": Ch2_Encounter_Otter,
  // "/ch3": Ch3,
  // "/ch3_exploration_kelp": Ch3_Exploration_Kelp,
  // "/ch3_experiment": Ch3_Experiment,
  // "/ch4": Ch4,
  // "/ch4_exploration": Ch4_Exploration,
};
