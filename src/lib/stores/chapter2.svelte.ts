import { writable, get } from "svelte/store";

class Chapter2State {
  abyssUnlocked = $state(false);
}

export default writable(new Chapter2State());
