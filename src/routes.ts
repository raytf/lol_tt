import Init from "./pages/Init.svelte";
import Intro from "./pages/Intro.svelte";
import Prologue from "./pages/Prologue.svelte";
import Title from "./pages/Title.svelte";
import ChapterSelect from "./pages/ChapterSelect.svelte";
// Chapter 1
import Ch1 from "./pages/chapter1";
import Ch1_Lesson_SMIntro from "./pages/chapter1/lessons/SMIntroduction.svelte";

export default {
  "/": Init,
  "/init/:from?": Init,
  "/intro": Intro,
  "/prologue": Prologue,
  "/title": Title,
  "/chapter-select": ChapterSelect,
  "/ch1": Ch1,
  "/ch1_lesson_sm-introduction": Ch1_Lesson_SMIntro,
};
