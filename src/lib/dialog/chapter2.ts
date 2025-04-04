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
  cool,
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
      const notepad = get(notepadApi);
      notepad.openPage("forest-notes");
      if (notepad.currentPage.type === "sm") {
        notepad.currentPage.question = "ch2_pressure-q";
      }
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
              if (notepad.currentPage.type === "sm") {
                notepad.currentPage.hypothesis = "ch2_pressure-h1";
              }
              get(objectivesApi).completeTask("task_hypothesis");
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
              if (notepad.currentPage.type === "sm") {
                notepad.currentPage.hypothesis = "ch2_pressure-h2";
              }
              get(objectivesApi).completeTask("task_hypothesis");
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
              if (notepad.currentPage.type === "sm") {
                notepad.currentPage.hypothesis = "ch2_pressure-h3";
              }
              get(objectivesApi).completeTask("task_hypothesis");
            },
          },
        ],
      },
    ],
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_ohq-7",
    onStart: () => {
      get(hudApi).showNotepad = true;
    },
  },
];

export const tool = [
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_tool-1",
  },
  {
    imgSrc: smileSlight,
    name: "explorer",
    text: "ch2_tool-2",
  },
  {
    imgSrc: smileSlight,
    name: "explorer",
    text: "ch2_tool-3",
  },
  {
    imgSrc: thinking,
    name: "explorer",
    text: "ch2_tool-4",
  },
  {
    imgSrc: hushed,
    name: "explorer",
    text: "ch2_tool-5",
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

export const hCorrect = [
  {
    imgSrc: smileOpen,
    name: "explorer",
    text: "ch2_hypothesis-correct",
  },
];

export const hIncorrect = [
  {
    imgSrc: frownSlight,
    name: "explorer",
    text: "ch2_hypothesis-incorrect-1",
  },
  {
    imgSrc: smileSlight,
    name: "explorer",
    text: "ch2_hypothesis-incorrect-2",
  },
];

export const analyze = [
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_analyze-1",
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_analyze-2",
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_analyze-3",
    onStart: () => {
      const notepad = get(notepadApi);
      if (notepad.currentPage.type === "experiment") {
        notepad.currentPage.showGraph = true;
      }
      get(objectivesApi).completeTask("task_pressure-analysis");
    },
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_analyze-4",
    options: [
      {
        text: "ch2_analyze-4.1",
        repeat: true,
        nextDialog: [
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch2_analyze-4.1-1",
          },
        ],
      },
      {
        text: "ch2_analyze-4.2",
        nextDialog: [
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch2_analyze-4.2-1",
          },
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch2_analyze-4.2-2",
            onProceed: () => {
              const notepad = get(notepadApi);
              if (notepad.currentPage.type === "experiment") {
                notepad.currentPage.showConclusion = true;
              }
            },
          },
        ],
      },
      {
        text: "ch2_analyze-4.3",
        repeat: true,
        nextDialog: [
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch2_analyze-4.3-1",
          },
        ],
      },
    ],
  },
];

export const linear = [
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_linear-1",
    onStart: () => {
      get(objectivesApi).completeTask("task_pressure-conclusion");
    },
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_linear-2",
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch2_linear-3",
    onProceed: () => {
      const hud = get(hudApi);
      hud.startItemUnlock({
        itemId: "pg",
        unlockType: "upgrade",
        onFinished: () => {
          hud.startDialog({
            keys: [
              {
                imgSrc: smileOpen,
                name: "explorer",
                text: "ch2_linear-4",
              },
            ],
          });
        },
      });
    },
  },
];
