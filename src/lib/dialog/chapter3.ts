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
import { notepadApi } from "$apis";

export const hypothesis = [
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch3_hypothesis-1",
    options: [
      {
        text: "ch3_hypothesis-1.1",
        nextDialog: [{
          imgSrc: smileSlight,
          name: "explorer",
          text: "ch3_hypothesis-1.1-1",
          onProceed: () => {
            const abyssNotesPage = get(notepadApi).currentPage as SMPageData;
            if (abyssNotesPage) {
              abyssNotesPage.hypothesis = "ch3_hypothesis-1.1-1";
            }
          }
        }],
      },
      {
        text: "ch3_hypothesis-1.2",
        nextDialog: [{
          imgSrc: smileSlight,
          name: "explorer",
          text: "ch3_hypothesis-1.2-1",
          onProceed: () => {
            const abyssNotesPage = get(notepadApi).currentPage as SMPageData;
            if (abyssNotesPage) {
              abyssNotesPage.hypothesis = "ch3_hypothesis-1.2-1";
            }
          }
        }],
      },
      {
        text: "ch3_hypothesis-1.3",
        nextDialog: [{
          imgSrc: smileSlight,
          name: "explorer",
          text: "ch3_hypothesis-1.3-1",
          onProceed: () => {
            const abyssNotesPage = get(notepadApi).currentPage as SMPageData;
            if (abyssNotesPage) {
              abyssNotesPage.hypothesis = "ch3_hypothesis-1.3-1";
            }
          }
        }],
      },
    ]
  }
]

export const hiddenEntrance = [
  {
    imgSrc: hushed,
    name: "explorer",
    text: "ch3_find-entrance-1",
  },
  {
    imgSrc: hushed,
    name: "explorer",
    text: "ch3_find-entrance-2",
  },
];

export const ventDescription = [
  {
    text: "vent_desc-1",
  },
  {
    text: "vent_desc-2",
  },
  {
    text: "vent_desc-3",
  },
  {
    text: "vent_desc-4",
  },
  {
    text: "vent_desc-5",
  },
  {
    text: "vent_desc-6",
  },
  {
    text: "vent_desc-7",
  },
  {
    text: "vent_desc-8",
  },
];
