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
        imgSrc: heartEyes,
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
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o1-1",
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
            options: [
              {
                text: "brief-2_o1-3_o1",
                imgSrc: hushed,
                nextDialog: [
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o1-3_o1-1",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "brief-2_o1-3_o1-2",
                  },
                ],
              },
              {
                text: "brief-2_o1-3_o2",
                imgSrc: neutral,
                nextDialog: [],
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
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "brief-2_o2-3",
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

export { missionBrief };
