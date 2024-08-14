import Init from "./pages/Init.svelte";
import Introduction from "./pages/Introduction.svelte";
import Prologue from "./pages/Prologue.svelte";
import Title from "./pages/Title.svelte";
import ChapterSelect from "./pages/ChapterSelect.svelte";
// Chapter 1
import Ch1 from "./pages/chapter1";
import Ch1_Exploration_Start from "./pages/chapter1/exploration/StartExploration.svelte";
import Ch1_Story_ShellEncounter from "./pages/chapter1/story/ShellEncounter.svelte";
import Ch1_Lesson_SMIntro from "./pages/chapter1/lessons/SMIntroduction.svelte";
import Ch1_Exploration_Kelp from "./pages/chapter1/exploration/KelpExploration.svelte";
import Ch1_Exploration_Shark from "./pages/chapter1/exploration/SharkExploration.svelte";
import Ch1_Story_SharkEncounter from "./pages/chapter1/story/SharkEncounter.svelte";

export default {
  "/": Init,
  "/init/:from?": Init,
  "/intro": Introduction,
  "/prologue": Prologue,
  "/title": Title,
  "/chapter-select": ChapterSelect,
  "/ch1": Ch1,
  "/ch1_exploration_start": Ch1_Exploration_Start,
  "/ch1_exploration_kelp": Ch1_Exploration_Kelp,
  "/ch1_exploration_shark": Ch1_Exploration_Shark,
  "/ch1_story_shell-encounter": Ch1_Story_ShellEncounter,
  "/ch1_story_shark-encounter": Ch1_Story_SharkEncounter,
  "/ch1_lesson_sm-intro": Ch1_Lesson_SMIntro,
};
