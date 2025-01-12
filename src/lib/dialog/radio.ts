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
const dialog = get(dialogApi);

export const checkIn = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_brief-1",
    options: [
      {
        text: "tut_brief-1_o1",
        imgSrc: cool,
        nextDialog: [
          { imgSrc: radio, name: "mission-control", text: "tut_brief-1_o1-1" },
        ],
      },
      {
        text: "tut_brief-1_o2",
        imgSrc: openMouth,
        nextDialog: [
          { imgSrc: radio, name: "mission-control", text: "tut_brief-1_o2-1" },
        ],
      },
      {
        text: "tut_brief-1_o3",
        imgSrc: downcastSweat,
        nextDialog: [
          { imgSrc: radio, name: "mission-control", text: "tut_brief-1_o3-1" },
        ],
      },
    ],
  },
];

export const observationTask = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_observation-1",
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
    text: "tut_observation-2",
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_observation-3",
  },
];

export const missionBrief = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_brief-1",
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_brief-2",
    options: [
      {
        text: "tut_brief-2_o1",
        imgSrc: neutral,
        repeat: true,
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_brief-2_o1-1",
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
            text: "tut_brief-2_o1-2",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_brief-2_o1-3",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_brief-2_o1-4",
            onProceed: () => {},
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_brief-2_o1-5",
            onProceed: () => {
              audio.stopTrack({
                src: "music/tritons-triangle.mp3",
                fade: true,
                fadeTime: 4444,
              });
              storyComponent.set(null);
            },
            options: [
              {
                text: "tut_brief-2_o1-5_o1",
                imgSrc: pensive,
                nextDialog: [
                  {
                    imgSrc: neutral,
                    name: "mission-control",
                    text: "tut_brief-2_o1-5_o1-1",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_brief-2_o1-5_o1-2",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_brief-2_o1-5_o1-3",
                    onProceed: () => {
                      dialog.enableOption("tut_brief-2_o2");
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: "tut_brief-2_o2",
        imgSrc: thinking,
        repeat: true,
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_brief-2_o2-1",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_brief-2_o2-2",
            options: [
              {
                imgSrc: hushed,
                text: "tut_brief-2_o2-2_o1",
                nextDialog: [
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_brief-2_o2-2_o1-1",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_brief-2_o2-2_o1-2",
                    onStart: () => {
                      hud.openSmModalWithDialog();
                    },
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_brief-2_o2-2_o1-3",
                    onProceed: () => {
                      hud.closeSmModalWithDialog();
                      dialog.enableOption("tut_brief-2_o3");
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: "tut_brief-2_o3",
        imgSrc: smile,
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_brief-2_o3-1",
          },
          ...observationTask,
        ],
      },
    ],
  },
];

export const explainSm = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_sm",
    options: [
      {
        imgSrc: thinking,
        text: "tut_sm_o1",
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_o-1",
            onStart: () => {
              hud.openSmModalWithDialog();
              sm.currentIndex = 0;
            },
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_o-2",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_q-1",
            onStart: () => {
              sm.currentIndex = 1;
            },
            onProceed: () => {
              hud.closeSmModalWithDialog();
            },
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_q-2",
            onStart: () => {
              hud.showNotepad = true;
            },
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_q-3",
            options: [
              {
                imgSrc: thinking,
                text: "tut_q_o1",
                nextDialog: [
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_q_o1-1",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_q_o1-2",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const observationReview = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_review-1",
    options: [
      {
        imgSrc: smile,
        text: "tut_review-1_o1",
        nextDialog: [
          {
            imgSrc: smile,
            name: "mission-control",
            text: "tut_observations-1",
            onStart: () => {
              get(notepadApi).openPage(1);
              hud.showNotepad = true;
            },
          },
          {
            imgSrc: smile,
            name: "mission-control",
            text: "tut_observations-2",
          },
          {
            imgSrc: smile,
            name: "mission-control",
            text: "tut_observations-3",
            onProceed: () => {
              //get(hudApi).showNotepad = false;
            },
          },
        ],
      },
    ],
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_review-2",
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_review-3",
    onProceed: () => {
      hud.showNotepad = false;
    },
    options: [
      {
        imgSrc: hushed,
        text: "tut_review-3_o1",
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_review-4",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_review-5",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_review-6",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_review-7",
            onProceed: () => {
              //get(objectivesApi).completeTask("task_show-observations");
            },
          },
          ...explainSm,
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
