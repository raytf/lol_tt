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

export const trial1 = [
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch3_trial-1",
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch3_trial-2",
  },
  {
    imgSrc: neutral,
    name: "explorer",
    text: "ch3_trial-3",
  },
]

export const analysis = [
  {
    imgSrc: thinking,
    name: "explorer",
    text: "ch3_analysis-1",
  },
  {
    imgSrc: smileSlight,
    name: "explorer",
    text: "ch3_analysis-2",
  },
  {
    imgSrc: grinSweat,
    name: "explorer",
    text: "ch3_analysis-3",
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch3_analysis-4"
  }
]

export const anomaly = [
  {
    imgSrc: confused,
    name: "explorer",
    text: "ch3_anomaly-1",
  },
  {
    imgSrc: frownSlight,
    name: "explorer",
    text: "ch3_anomaly-2",
  },
  {
    imgSrc: thinking,
    name: "explorer",
    text: "ch3_anomaly-3",
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch3_anomaly-4",
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch3_anomaly-5",
  },
  {
    imgSrc: openMouth,
    name: "explorer",
    text: "ch3_anomaly-6",
  },
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
  {
    text: "vent_desc-9",
  },
  {
    text: "vent_desc-10",
  },
  {
    text: "vent_desc-11",
  },
  {
    text: "vent_desc-12",
  },
];
