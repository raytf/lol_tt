import { writable, get } from "svelte/store";
import type { Spring } from "svelte/motion";

class AbyssState {
    numMeasured = $state(0);
}

export default writable(new AbyssState());
