import Init from "./pages/Init.svelte";
import Intro from "./pages/Intro.svelte";
import Prologue from "./pages/Prologue.svelte";
import Title from "./pages/Title.svelte";
import ChapterSelect from "./pages/ChapterSelect.svelte";
// Chapter 1
import Ch1 from "./pages/chapter1";
import Ch1_Exploration_Start from "./pages/chapter1/exploration/Start.svelte";
import Ch1_Exploration_Shark from "./pages/chapter1/exploration/Shark.svelte";
import Ch1_Story_ShellEncounter from "./pages/chapter1/story/ShellEncounter.svelte";
import Ch1_Lesson_SMIntro from "./pages/chapter1/lessons/SMIntroduction.svelte";

export default {
  "/": Init,
  "/init/:from?": Init,
  "/intro": Intro,
  "/prologue": Prologue,
  "/title": Title,
  "/chapter-select": ChapterSelect,
  "/ch1": Ch1,
  "/ch1_exploration_start": Ch1_Exploration_Start,
  "/ch1_exploration_shark": Ch1_Exploration_Shark,
  "/ch1_story_shell-encounter": Ch1_Story_ShellEncounter,
  "/ch1_lesson_sm-intro": Ch1_Lesson_SMIntro,
};
