import {
  downcastSweat,
  grinSweat,
  hushed,
  frownSlight,
  thinking,
  kissingClosed,
  openMouth,
  smileOpen,
  neutral,
  smileSlight,
  fearful,
  confused,
  pensive,
} from "$assets/emoji";
import {
  conch_devious,
  conch_neutral,
  conch_smile,
  conch_smileWide,
  conch_angry,
  conch_openMouth,
  conch_eyes,
} from "$assets/conch";
import { get } from "svelte/store";
import { audioApi, gameApi, notepadApi, objectivesApi, hudApi } from "$apis";
import wrecks from "$stores/wrecks.svelte";
import forest from "$stores/forest.svelte";

import { showConchFace, conchLightRadius, conchFace } from "$stores/conch";
import {
  coords as subCoords,
  setTarget as setSubTarget,
  direction as subDirection,
} from "$stores/sub";
import { gridOffset } from "$stores/exploration";

export const wrecksAnalysis = [
  {
    imgSrc: neutral,
    name: "explorer",
    text: "ch1_analysis-1",
  },
  {
    imgSrc: neutral,
    name: "explorer",
    text: "ch1_analysis-2",
    onStart: () => {
      get(notepadApi).notepadClass = "opacity-30";
      get(notepadApi).updateRowClass(0, "font-bold");
      gridOffset.set({ x: gridOffset.current.x, y: 0 });
    },
  },
  {
    imgSrc: neutral,
    name: "explorer",
    text: "ch1_analysis-3",
    onStart: () => {
      get(notepadApi).updateRowClass(0, "");
      get(notepadApi).updateRowClass(1, "font-bold");
      gridOffset.set({ x: gridOffset.current.x, y: -450 });
    },
  },
  {
    imgSrc: neutral,
    name: "explorer",
    text: "ch1_analysis-4",
    onStart: () => {
      get(notepadApi).updateRowClass(1, "");
      get(notepadApi).updateRowClass(2, "font-bold");
      gridOffset.set({ x: gridOffset.current.x, y: -900 });
    },
    onProceed: () => {
      get(notepadApi).notepadClass = "";
    },
  },
];

export const wrecksCorrect = [
  {
    imgSrc: smileOpen,
    name: "explorer",
    text: "ch1_hypothesis-correct",
  },
];

export const wrecksIncorrect = [
  {
    imgSrc: frownSlight,
    name: "explorer",
    text: "ch1_hypothesis-incorrect-1",
  },
  {
    imgSrc: smileSlight,
    name: "explorer",
    text: "ch1_hypothesis-incorrect-2",
  },
];

export const smColor = [
  {
    imgSrc: thinking,
    name: "explorer",
    text: "ch1_color-q",
    onStart: () => {
      const notepad = get(notepadApi);
      notepad.openPage("wrecks");
      notepad.addLine("np-wrecks-notes_question");
    },
    options: [
      {
        imgSrc: smileSlight,
        text: "ch1_color-h1",
        nextDialog: [],
        onProceed: () => {
          const notepad = get(notepadApi);
          notepad.openPage("wrecks");
          //notepad.addLine("ch1_color-h1");
          get(wrecks).hypothesisKey = "ch1_color-h1";
        },
      },
      {
        imgSrc: smileSlight,
        text: "ch1_color-h2",
        nextDialog: [],
        onProceed: () => {
          const notepad = get(notepadApi);
          notepad.openPage("wrecks");
          //notepad.addLine("ch1_color-h2");
          get(wrecks).hypothesisKey = "ch1_color-h2";
        },
      },
      {
        imgSrc: smileSlight,
        text: "ch1_color-h3",
        nextDialog: [],
        onProceed: () => {
          const notepad = get(notepadApi);
          notepad.openPage("wrecks");
          //notepad.addLine("ch1_color-h3");
          get(wrecks).hypothesisKey = "ch1_color-h3";
        },
      },
    ],
  },
];

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

// export const conchEncounter = [
//   {
//     text: "ch1_conch-1",
//     onStart: () => {
//       conchFace.set(conch_angry);
//       showConchFace.set(true);
//       conchLightRadius.set(8);
//     },
//   },
//   {
//     text: "ch1_conch-2",
//     options: [
//       {
//         imgSrc: smileOpen,
//         name: "you",
//         text: "ch1_conch-2.1",
//         nextDialog: [
//           {
//             text: "ch1_conch-2.1-1",
//             onStart: () => {
//               conchFace.set(conch_neutral);
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "conch",
//     text: "ch1_conch-3",
//     onStart: () => {
//       conchFace.set(conch_angry);
//       //conchFace.set(conch_devious);
//     },
//   },
//   {
//     name: "conch",
//     text: "ch1_conch-4",
//     onStart: () => {
//       conchFace.set(conch_angry);
//     },
//     options: [
//       {
//         imgSrc: neutral,
//         text: "ch1_conch-4.1",
//         nextDialog: [
//           {
//             name: "conch",
//             text: "ch1_conch-4.1-1",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "conch",
//     text: "ch1_conch-5",
//     onProceed: () => {
//       showConchFace.set(false);
//       conchLightRadius.set(0);
//     },
//   },
// ];

export const enterForest = [
  {
    name: "narrator",
    text: "enter-forest-1",
  },
  {
    name: "narrator",
    text: "enter-forest-2",
    onStart: () => {
      get(forest).monsterActivated = true;
    },
  },
  {
    imgSrc: fearful,
    name: "explorer",
    text: "enter-forest-3",
  },
];

export const conchEncounter = [
  {
    imgSrc: downcastSweat,
    name: "explorer",
    text: "ch1_conch-1",
  },
  {
    text: "ch1_conch-2",
    onStart: () => {
      showConchFace.set(true);
      conchLightRadius.set(8);
    },
  },
  {
    imgSrc: kissingClosed,
    name: "explorer",
    text: "ch1_conch-3",
  },
  {
    imgSrc: grinSweat,
    name: "explorer",
    text: "ch1_conch-4",
  },
  {
    imgSrc: confused,
    name: "explorer",
    text: "ch1_conch-5",
  },
  {
    text: "ch1_conch-6",
    onStart: () => {
      // subDirection.set({ x: 1, y: get(subDirection).y });
      gridOffset.set({ x: -900, y: -900 });
    },
    onProceed: () => {
      setSubTarget({ x: 1400, y: 1100 });
    },
  },
  {
    imgSrc: openMouth,
    name: "explorer",
    text: "ch1_conch-7",
  },
  {
    imgSrc: conch_eyes,
    name: "conch",
    text: "ch1_conch-8",
  },
  {
    imgSrc: conch_eyes,
    name: "conch",
    text: "ch1_conch-9",
  },
  {
    imgSrc: neutral,
    name: "explorer",
    text: "ch1_conch-10",
  },
  {
    imgSrc: conch_openMouth,
    name: "conch",
    text: "ch1_conch-11",
    onStart: () => {
      conchFace.set(conch_openMouth);
    },
  },
  {
    imgSrc: neutral,
    name: "explorer",
    text: "ch1_conch-12",
  },
  {
    imgSrc: smileSlight,
    name: "explorer",
    text: "ch1_conch-13",
  },
  {
    imgSrc: pensive,
    name: "explorer",
    text: "ch1_conch-14",
  },
  {
    imgSrc: thinking,
    name: "explorer",
    text: "ch1_conch-15",
  },
  {
    imgSrc: conch_eyes,
    name: "conch",
    text: "ch1_conch-16",
    onStart: () => {
      conchFace.set(conch_eyes);
    },
  },
  {
    imgSrc: conch_eyes,
    name: "conch",
    text: "ch1_conch-17",
  },
  {
    imgSrc: conch_devious,
    name: "conch",
    text: "ch1_conch-18",
    onStart: () => {
      conchFace.set(conch_devious);
    },
    onProceed: () => {
      showConchFace.set(false);
      conchLightRadius.set(0);
      get(hudApi).startItemUnlock({
        itemId: "conch",
      });
    },
  },
];
