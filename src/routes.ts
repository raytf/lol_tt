import Init from "./pages/Init.svelte";
import Introduction from "./pages/Introduction.svelte";
import Prologue from "./pages/Prologue.svelte";
import Title from "./pages/Title.svelte";
import ChapterSelect from "./pages/ChapterSelect.svelte";
// Chapter 1
import Ch1 from "./pages/chapter1";
import Ch1_Exploration_Wrecks from "./pages/chapter1/exploration/Wrecks.svelte";
import Ch1_Encounter_Shell from "./pages/chapter1/encounters/Shell.svelte";
import Ch1_Lesson_SMIntro from "./pages/chapter1/lessons/SMIntroduction.svelte";
// Chapter 2
import Ch2 from "./pages/chapter2";
import Ch2_Exploration_Kelp from "./pages/chapter2/exploration/Kelp.svelte";
import Ch2_Encounter_Otter from "./pages/chapter2/encounters/Otter.svelte";

export default {
  "/": Init,
  "/init/:from?": Init,
  "/intro": Introduction,
  "/prologue": Prologue,
  "/title": Title,
  "/chapter-select": ChapterSelect,
  "/ch1": Ch1,
  "/ch1_exploration_wrecks": Ch1_Exploration_Wrecks,
  "/ch1_encounter_shell": Ch1_Encounter_Shell,
  "/ch1_lesson_sm-intro": Ch1_Lesson_SMIntro,
  "/ch2": Ch2,
  "/ch2_exploration_kelp": Ch2_Exploration_Kelp,
  "/ch2_encounter_otter": Ch2_Encounter_Otter,
};
