import { get } from "svelte/store";
import {
  frownSlight,
  smileSlight,
  neutral,
  openMouth,
  hushed,
  smile,
  thinking,
  confused,
  grinSweat,
} from "$assets/emoji";
import radio from "$assets/icons/radio.svg";
import { hudApi, dialogApi } from "$apis";

export const status = [
  {
    imgSrc: smileSlight,
    name: "explorer",
    text: "tut_status-1",
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_status-2",
  },
  {
    imgSrc: grinSweat,
    name: "explorer",
    text: "tut_status-3",
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_status-4",
  },
];

export const missionBrief = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_mb-1",
    options: [
      {
        imgSrc: thinking,
        text: "tut_mb-1.1",
        repeat: true,
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_elaborate-1",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_elaborate-2",
            options: [
              {
                imgSrc: hushed,
                text: "tut_elaborate-2.1",
                repeat: true,
                nextDialog: [
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_elaborate-ql",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_elaborate-qn",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_elaborate-np",
                    onProceed: () => {
                      get(hudApi).startItemUnlock({
                        itemId: "notepad",
                      });
                      get(dialogApi).enableOption("tut_elaborate-2.2");
                    },
                  },
                ],
              },
              {
                imgSrc: smile,
                text: "tut_elaborate-2.2",
                nextDialog: [
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_elaborate-sm-1",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_elaborate-sm-2",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_elaborate-sm-3",
                    onStart: () => {
                      get(hudApi).openSmModalWithDialog();
                    },
                    onProceed: () => {
                      get(hudApi).closeSmModalWithDialog();
                      get(hudApi).startItemUnlock({
                        itemId: "sm",
                      });
                      get(dialogApi).enableOption("tut_mb-1.2");
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        imgSrc: smile,
        text: "tut_mb-1.2",
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_mb-end",
          },
        ],
      },
    ],
  },
];
