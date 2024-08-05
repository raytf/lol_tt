import { setContext, getContext } from "svelte";
import { Howl, Howler } from "howler";
import type { HowlOptions } from "howler";

interface Track {
  [key: string]: Howl;
}

export interface TrackOptions {
  src: string;
  volume?: number;
  loop?: boolean;
  onload?: () => void;
}

export class AudioApi {
  soundEnabled = $state(true);
  tracks = new Map<string, Howl>();
  constructor() {}

  loadTrack = ({
    src,
    volume = 1.0,
    loop = false,
    onload = () => {},
  }: TrackOptions) => {
    const fullSrc = `${import.meta.env.BASE_URL}${src}`;
    const sound = new Howl({
      src: [fullSrc],
      volume: volume,
      loop: loop,
      onload: onload,
    });
    this.tracks.set(src, sound);
    console.log(this.tracks);
  };

  playTrack = (src: string) => {
    const sound = this.tracks.get(src);
    if (sound) {
      console.log("sound state: " + sound.state());
      sound.volume(0);
      sound.play();
      sound.fade(0, 1, 1000);
    }
  };
}

const CONTEXT_KEY = Symbol("AudioApi");

export function createAudioApi() {
  return setContext(CONTEXT_KEY, new AudioApi());
}

export function getAudioApi() {
  return getContext<ReturnType<typeof createAudioApi>>(CONTEXT_KEY);
}
