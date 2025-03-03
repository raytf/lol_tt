import { writable } from "svelte/store";
import { Howl, Howler } from "howler";
import type { HowlOptions } from "howler";

interface Track {
  sound: Howl;
  volume?: number;
}

export interface TrackOptions {
  src: string;
  volume?: number;
  loop?: boolean;
  onload?: () => void;
}

export interface PlayTrackOptions {
  src: string;
  volume?: number;
  loop?: boolean;
  fade?: boolean;
  fadeTime?: number;
}

export interface StopTrackOptions {
  src: string;
  fade?: boolean;
  fadeTime?: number;
  unload?: boolean;
}

export class AudioApi {
  soundEnabled = $state(false);
  tracks = new Map<string, Track>();
  constructor() {}

  toggleSound = () => {
    this.soundEnabled = !this.soundEnabled;
    if (!this.soundEnabled) {
      Howler.volume(0);
    } else {
      Howler.volume(1);
    }
  };

  loadTrack = ({ src, onload = () => {} }: TrackOptions) => {
    if (!this.soundEnabled) return;

    if (src in this.tracks) {
      console.log("Track already loaded");
      return;
    }

    const fullSrc = `${import.meta.env.BASE_URL}${src}`;
    const sound = new Howl({
      src: [fullSrc],
      volume: 0,
      loop: false,
      onload: onload,
    });
    this.tracks.set(src, {
      sound: sound,
      volume: 0,
    });
    console.log("Loaded tracks", this.tracks);
  };

  playTrack = ({
    src,
    volume = 1.0,
    loop = false,
    fade = true,
    fadeTime = 1000,
  }: PlayTrackOptions) => {
    if (!this.soundEnabled) return;

    const track = this.tracks.get(src);
    const sound = track?.sound;
    if (sound) {
      if (sound.playing()) {
        // Only one instance of sound at a time
        sound.stop();
      }
      sound.loop(loop);
      sound.volume(0);

      const id = sound.play();
      if (fade) sound.fade(0, volume, fadeTime, id);
      track.volume = volume;
      console.log("Played tracks", this.tracks);
    } else {
      this.loadTrack({
        src,
        volume,
        loop,
        onload: () => {
          this.playTrack({ src, volume, loop });
        },
      });
    }
  };

  stopTrack = ({
    src,
    fade = true,
    fadeTime = 1000,
    unload = true,
  }: StopTrackOptions) => {
    const track = this.tracks.get(src);
    const sound = track?.sound;
    if (sound) {
      if (fade) {
        const currentVolume: number = track.volume ?? 0;
        sound.once("fade", () => {
          sound.stop();
          if (unload) this.unloadTrack(src);
        });
        sound.fade(currentVolume, 0, fadeTime);
      } else {
        sound.stop();
        if (unload) this.unloadTrack(src);
      }
    }
  };

  unloadTrack = (src: string) => {
    const track = this.tracks.get(src);
    const sound = track?.sound;
    if (sound) {
      this.tracks.delete(src);
      console.log("unloaded track", this.tracks);
    }
  };
}

export const audioApi = writable<AudioApi>(new AudioApi());
