import { writable, get } from "svelte/store";
import type { Spring } from "svelte/motion";

class PlayerState {}

export default writable(new PlayerState());
