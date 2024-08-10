import { setContext, getContext } from "svelte";
import { Howl, Howler } from "howler";
import type { HowlOptions } from "howler";

interface Track {
  sound: Howl;
  instances: number[];
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
    if (src in this.tracks) {
      console.log("Track already loaded");
      return;
    }

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

  playTrack = ({
    src,
    volume = 1.0,
    loop = false,
    onload = () => {},
  }: TrackOptions) => {
    const sound = this.tracks.get(src);
    if (sound) {
      console.log("sound state: " + sound.state());
      if (sound.playing()) {
        // Only one instance of sound at a time
        sound.stop();
      }
      sound.loop(loop);
      sound.volume(0);

      const id = sound.play();
      sound.fade(0, volume, 1000, id);
      console.log(this.tracks);
    }
  };

  stopTrack = (src: string, fade: boolean = false) => {
    const sound = this.tracks.get(src);
    if (sound) {
      if (fade) {
        sound.once("fade", () => {
          sound.stop();
        });
        sound.fade(sound.volume(), 0, 1000);
      } else {
        sound.stop();
      }
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
