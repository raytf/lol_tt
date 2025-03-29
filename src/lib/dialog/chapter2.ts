import { get } from "svelte/store";
import {
  downcastSweat,
  grin,
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
import { notepadApi, hudApi, objectivesApi } from "$apis";
import wrecks from "$stores/wrecks.svelte";
import forest from "$stores/forest.svelte";

export const creak = [
  {
    text: "sub-creak-1",
  },
];

export const oqh = [
  {
    imgSrc: conch_openMouth,
    name: "conch",
    text: "ch2_ohq-1",
    onProceed: () => {
      get(notepadApi).addLine("o_monster-deep");
    },
  },
  {
    imgSrc: grinSweat,
    name: "explorer",
    text: "ch2_ohq-2",
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_ohq-3",
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_ohq-4",
  },
  {
    imgSrc: hushed,
    name: "explorer",
    text: "ch2_ohq-5",
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_ohq-6",
    onStart: () => {
      get(forest).questionKey = "ch2_pressure-q";
      get(objectivesApi).completeTask("task_question");
    },
    options: [
      {
        text: "ch2_ohq-6.1",
        nextDialog: [
          {
            imgSrc: smileSlight,
            name: "explorer",
            text: "ch2_pressure-h1",
            onProceed: () => {
              const notepad = get(notepadApi);
              notepad.openPage("forest-notes");
              get(forest).hypothesisKey = "ch2_pressure-h1";
              get(objectivesApi).completeTask("task_hypothesis");
              get(hudApi).showNotepad = true;
            },
          },
        ],
      },
      {
        text: "ch2_ohq-6.2",
        nextDialog: [
          {
            imgSrc: smileSlight,
            name: "explorer",
            text: "ch2_pressure-h2",
            onProceed: () => {
              const notepad = get(notepadApi);
              notepad.openPage("forest-notes");
              get(forest).hypothesisKey = "ch2_pressure-h2";
              get(objectivesApi).completeTask("task_hypothesis");
              get(hudApi).showNotepad = true;
            },
          },
        ],
      },
      {
        text: "ch2_ohq-6.3",
        nextDialog: [
          {
            imgSrc: smileSlight,
            name: "explorer",
            text: "ch2_pressure-h3",
            onProceed: () => {
              const notepad = get(notepadApi);
              notepad.openPage("forest-notes");
              get(forest).hypothesisKey = "ch2_pressure-h3";
              get(objectivesApi).completeTask("task_hypothesis");
              get(hudApi).showNotepad = true;
            },
          },
        ],
      },
    ],
  },
];

export const tool = [
  {
    imgSrc: thinking,
    name: "explorer",
    text: "ch2_tool-1",
  },
  {
    imgSrc: hushed,
    name: "explorer",
    text: "ch2_tool-2",
  },
];

export const crane = [
  {
    imgSrc: smileOpen,
    name: "explorer",
    text: "ch2_crane-1",
  },
  {
    imgSrc: frownSlight,
    name: "explorer",
    text: "ch2_crane-2",
  },
  {
    imgSrc: thinking,
    name: "explorer",
    text: "ch2_crane-3",
  },
  {
    imgSrc: openMouth,
    name: "explorer",
    text: "ch2_crane-4",
  },
  {
    imgSrc: grin,
    name: "explorer",
    text: "ch2_crane-5",
  },
];
