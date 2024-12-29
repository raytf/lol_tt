import { writable, get } from "svelte/store";
import { moveSub } from "$stores/exploration";

class ForestEvents {
  onClickArea(e: MouseEvent) {
    moveSub(e);
  }
}

export default writable(new ForestEvents());
