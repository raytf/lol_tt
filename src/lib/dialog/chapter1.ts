import {
  downcastSweat,
  grinSweat,
  hushed,
  frownSlight,
  thinking,
  openMouth,
  smileOpen,
  neutral,
  smileSlight,
} from "$assets/emoji";
import {
  conch_devious,
  conch_neutral,
  conch_smile,
  conch_smileWide,
  conch_angry,
} from "$assets/conch";
import { get } from "svelte/store";
import { audioApi, gameApi } from "$apis";
import { showConchFace, conchLightRadius, conchFace } from "$stores/conch";

export const shipWreck = [
  {
    imgSrc: hushed,
    name: "you",
    text: "ch1_ship-1",
  },
  {
    imgSrc: frownSlight,
    name: "you",
    text: "ch1_ship-2",
  },
  {
    imgSrc: thinking,
    name: "you",
    text: "ch1_ship-3",
  },
];

export const conchScare = [
  {
    text: "conch-scare-1",
    onStart: () => {
      get(audioApi).playTrack({
        src: "sound/spooky-laugh.mp3",
        volume: 0.4,
      });
      showConchFace.set(true);
      conchLightRadius.set(8);
    },
  },
  {
    imgSrc: downcastSweat,
    name: "you",
    text: "conch-scare-2",
  },
  {
    imgSrc: grinSweat,
    name: "you",
    text: "conch-scare-3",
    onProceed: () => {
      showConchFace.set(false);
      conchLightRadius.set(0);
    },
  },
];

export const conchEncounter = [
  {
    text: "ch1_conch-1",
    onStart: () => {
      conchFace.set(conch_angry);
      showConchFace.set(true);
      conchLightRadius.set(8);
    },
  },
  {
    text: "ch1_conch-2",
    options: [
      {
        imgSrc: smileOpen,
        name: "you",
        text: "ch1_conch-2.1",
        nextDialog: [
          {
            text: "ch1_conch-2.1-1",
            onStart: () => {
              conchFace.set(conch_neutral);
            },
          },
        ],
      },
    ],
  },
  {
    name: "conch",
    text: "ch1_conch-3",
    onStart: () => {
      conchFace.set(conch_devious);
    },
  },
  {
    name: "conch",
    text: "ch1_conch-4",
    onStart: () => {
      conchFace.set(conch_angry);
    },
    options: [
      {
        imgSrc: neutral,
        text: "ch1_conch-4.1",
        nextDialog: [
          {
            name: "conch",
            text: "ch1_conch-4.1-1",
          },
        ],
      },
    ],
  },
  {
    name: "conch",
    text: "ch1_conch-5",
    onProceed: () => {
      showConchFace.set(false);
      conchLightRadius.set(0);
    },
  },
];
