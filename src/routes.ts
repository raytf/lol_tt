import Init from "./pages/Init.svelte";
import Intro from "./pages/Intro.svelte";
import Prologue from "./pages/Prologue.svelte";
import Title from "./pages/Title.svelte";
import ChapterSelect from "./pages/ChapterSelect.svelte";
// Chapter 1
import Ch1Exploration from "./pages/chapter1/Exploration.svelte";

export default {
  "/": Init,
  "/init/:from?": Init,
  "/intro": Intro,
  "/prologue": Prologue,
  "/title": Title,
  "/chapter-select": ChapterSelect,
  "/chapter1/exploration": Ch1Exploration,
};
