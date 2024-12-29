import { writable, get } from "svelte/store";
import { moveSub } from "$stores/exploration";
import { audioApi } from "$apis";

const audio = get(audioApi);

class ForestEvents {
  onEnter() {
    get(audioApi).playTrack({
      src: "music/tangled-depths.mp3",
      volume: 0.55,
      loop: true,
    });
  }

  onClickArea(e: MouseEvent) {
    moveSub(e);
  }
}

export default writable(new ForestEvents());
