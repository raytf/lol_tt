import Init from "./pages/Init.svelte";
import Prologue from "./pages/Prologue.svelte";
import Title from "./pages/Title.svelte";
import ChapterSelect from "./pages/ChapterSelect.svelte";

export default {
  "/": Init,
  "/prologue": Prologue,
  "/title": Title,
  "/chapter-select": ChapterSelect,
};
