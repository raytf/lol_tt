import { wrap } from "svelte-spa-router/wrap";

import Init from "./pages/Init.svelte";
import Title from "./pages/Title.svelte";
import Prologue from "./pages/story/Prologue.svelte";

export default {
  "/": Init,
  "/title": Title,
  "/story/prologue": Prologue,
};
