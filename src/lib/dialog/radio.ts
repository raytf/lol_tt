import { get } from "svelte/store";
import {
  hudApi,
  dialogApi,
  smApi,
  gameApi,
  audioApi,
  inventoryApi,
} from "$apis";
import radio from "$assets/icons/radio.svg";
import cool from "$assets/emoji/cool.svg";
import openMouth from "$assets/emoji/open-mouth.svg";
import sweat from "$assets/emoji/sweat.svg";
import downcastSweat from "$assets/emoji/downcast-sweat.svg";
import worried from "$assets/emoji/worried.svg";
import pensive from "$assets/emoji/pensive.svg";
import thinking from "$assets/emoji/thinking.svg";
import smile from "$assets/emoji/smile.svg";
import neutral from "$assets/emoji/neutral.svg";
import hushed from "$assets/emoji/hushed.svg";
import heartEyes from "$assets/emoji/heart-eyes.svg";
import tongue from "$assets/emoji/tongue.svg";
import frownSlight from "$assets/emoji/frown-slight.svg";
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
  {
    imgSrc: radio,
    name: "mission-control",
    text: "ch1_observation-4",
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
