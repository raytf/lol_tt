import { get } from "svelte/store";
import { hudApi, dialogApi, smApi, gameApi, audioApi } from "$apis";
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

const missionBrief = [
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
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o1-5",
            onProceed: () => {
              audio.stopTrack({
                src: "music/tritons-triangle.mp3",
                fade: true,
                fadeTime: 2222,
              });
              storyComponent.set(null);
            },
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o1-6",
            options: [
              {
                text: "brief-2_o1-6_o1",
                imgSrc: pensive,
                nextDialog: [
                  {
                    imgSrc: neutral,
                    name: "mission-control",
                    text: "brief-2_o1-6_o1-1",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o1-6_o1-2",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o1-6_o1-3",
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
                repeat: true,
                nextDialog: [
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o2-2_o1-1",
                    onProceed: () => {
                      get(smApi).isInteractable = false;
                      get(smApi).modalClass = "pt-[111px]";
                      get(hudApi).showSmModal = true;
                    },
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o2-2_o1-2",
                    onProceed: () => {
                      // get(smApi).currentIndex = 0;
                    },
                  },
                  // {
                  //   imgSrc: radio,
                  //   name: "mission-control",
                  //   text: "sm-observation_desc",
                  //   onProceed: () => {
                  //     get(smApi).currentIndex = 1;
                  //   },
                  // },
                  // {
                  //   imgSrc: radio,
                  //   name: "mission-control",
                  //   text: "sm-question_desc",
                  //   onProceed: () => {
                  //     get(smApi).currentIndex = 2;
                  //   },
                  // },
                  // {
                  //   imgSrc: radio,
                  //   name: "mission-control",
                  //   text: "sm-hypothesis_desc",
                  //   onProceed: () => {
                  //     get(smApi).currentIndex = 3;
                  //   },
                  // },
                  // {
                  //   imgSrc: radio,
                  //   name: "mission-control",
                  //   text: "sm-experiment_desc",
                  //   onProceed: () => {
                  //     get(smApi).currentIndex = 4;
                  //   },
                  // },
                  // {
                  //   imgSrc: radio,
                  //   name: "mission-control",
                  //   text: "sm-analysis_desc",
                  //   onProceed: () => {
                  //     get(smApi).currentIndex = 5;
                  //   },
                  // },
                  // {
                  //   imgSrc: radio,
                  //   name: "mission-control",
                  //   text: "sm-conclusion_desc",
                  //   onProceed: () => {
                  //     get(smApi).currentIndex = -1;
                  //   },
                  // },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o2-3",
                    onProceed: () => {
                      get(hudApi).showSmModal = false;
                      get(smApi).reset();
                    },
                  },
                ],
              },
              {
                imgSrc: smile,
                text: "brief-2_o2-2_o2",
                nextDialog: [],
              },
            ],
          },
        ],
      },
      {
        text: "brief-2_o3",
        imgSrc: smile,
        nextDialog: [],
      },
    ],
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "brief-3",
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "brief-4",
  },
];

const noSignal = [
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

const lostSignal = [
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

export { missionBrief, noSignal, lostSignal };
