import { get } from "svelte/store";
import {
  hudApi,
  dialogApi,
  smApi,
  gameApi,
  audioApi,
  notepadApi,
  inventoryApi,
  objectivesApi,
} from "$apis";
import radio from "$assets/icons/radio.svg";
import {
  confused,
  cool,
  downcastSweat,
  pensive,
  thinking,
  openMouth,
  neutral,
  hushed,
  smile,
  frownSlight,
} from "$assets/emoji";
import { MissingCrew } from "$components/visual/story";
import { storyComponent } from "$stores/story";

const audio = get(audioApi);
const game = get(gameApi);
const hud = get(hudApi);
const sm = get(smApi);

export const checkIn = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "brief-1",
    options: [
      {
        text: "brief-1_o1",
        imgSrc: cool,
        nextDialog: [
          { imgSrc: radio, name: "mission-control", text: "brief-1_o1-1" },
        ],
      },
      {
        text: "brief-1_o2",
        imgSrc: openMouth,
        nextDialog: [
          { imgSrc: radio, name: "mission-control", text: "brief-1_o2-1" },
        ],
      },
      {
        text: "brief-1_o3",
        imgSrc: downcastSweat,
        nextDialog: [
          { imgSrc: radio, name: "mission-control", text: "brief-1_o3-1" },
        ],
      },
    ],
  },
];

export const observationTask = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "ch1_observation-1",
    onStart: () => {
      hud.openSmModalWithDialog();
    },
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "sm-observation_desc",
    onStart: () => {
      sm.currentIndex = 0;
    },
    onProceed: () => {
      hud.closeSmModalWithDialog();
    },
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "ch1_observation-2",
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "ch1_observation-3",
  },
];

export const missionBrief = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "brief-2",
    options: [
      {
        text: "brief-2_o1",
        imgSrc: neutral,
        repeat: true,
        onProceed: () => {},
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o1-1",
            onProceed: () => {
              audio.playTrack({
                src: "music/tritons-triangle.mp3",
                volume: 0.44,
                loop: true,
                fade: true,
              });
              storyComponent.set(MissingCrew);
            },
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o1-2",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o1-3",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o1-4",
            onProceed: () => {
              audio.stopTrack({
                src: "music/tritons-triangle.mp3",
                fade: true,
                fadeTime: 4444,
              });
              storyComponent.set(null);
            },
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o1-5",
            options: [
              {
                text: "brief-2_o1-5_o1",
                imgSrc: pensive,
                nextDialog: [
                  {
                    imgSrc: neutral,
                    name: "mission-control",
                    text: "brief-2_o1-5_o1-1",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o1-5_o1-2",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o1-5_o1-3",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: "brief-2_o2",
        imgSrc: thinking,
        repeat: true,
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o2-1",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o2-2",
            options: [
              {
                imgSrc: hushed,
                text: "brief-2_o2-2_o1",
                nextDialog: [
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o2-2_o1-1",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o2-2_o1-2",
                    onStart: () => {
                      hud.openSmModalWithDialog();
                    },
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o2-2_o1-3",
                    onProceed: () => {
                      hud.closeSmModalWithDialog();
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: "brief-2_o3",
        imgSrc: smile,
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o3-1",
          },
          ...observationTask,
        ],
      },
    ],
  },
];

export const observationReview = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "ch1_review-1",
    options: [
      {
        imgSrc: confused,
        text: "ch1_review-1_o1",
        repeat: true,
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "ch1_strange-1",
          },
          {
            imgSrc: frownSlight,
            name: "mission-control",
            text: "ch1_strange-2",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "ch1_strange-3",
          },
          {
            imgSrc: downcastSweat,
            name: "mission-control",
            text: "ch1_strange-4",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "ch1_strange-5",
          },
        ],
      },
      {
        imgSrc: smile,
        text: "ch1_review-1_o2",
        nextDialog: [
          {
            imgSrc: smile,
            name: "mission-control",
            text: "ch1_observations-1",
            onStart: () => {
              get(notepadApi).openPage(1);
              get(hudApi).showNotepad = true;
            },
          },
          {
            imgSrc: smile,
            name: "mission-control",
            text: "ch1_observations-2",
          },
          {
            imgSrc: smile,
            name: "mission-control",
            text: "ch1_observations-3",
            onProceed: () => {
              get(hudApi).showNotepad = false;
            },
          },
        ],
      },
    ],
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "ch1_review-2",
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "ch1_review-3",
    options: [
      {
        imgSrc: hushed,
        text: "ch1_review-3_o1",
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "ch1_review-3_o1-1",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "ch1_review-3_o1-2",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "ch1_review-3_o1-3",
            onProceed: () => {
              get(objectivesApi).completeTask("task_show-observations");
            },
          },
        ],
      },
    ],
  },
];

export const noSignal = [
  {
    imgSrc: radio,
    text: "radio_crackle",
  },
  {
    imgSrc: frownSlight,
    name: "you",
    text: "radio_no-signal",
  },
];

export const lostSignal = [
  {
    imgSrc: radio,
    text: "radio_crackle",
  },
  {
    imgSrc: frownSlight,
    name: "you",
    text: "radio_lost-signal",
  },
];
