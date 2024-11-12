import { writable, get } from "svelte/store";

class NotepadApi {
  title = $state("");
  lines = $state<string[]>([]);
}

export const notepadApi = writable<NotepadApi>(new NotepadApi());
