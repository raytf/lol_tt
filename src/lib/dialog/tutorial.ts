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
} from "$assets/emoji";
import radio from "$assets/icons/radio.svg";
import { hudApi, dialogApi } from "$apis";

export const status = [
  {
    imgSrc: smileSlight,
    name: "you",
    text: "tut_status-1",
  },
  {
    imgSrc: radio,
    name: "mission-control",
    text: "tut_status-2",
  },
  {
    imgSrc: smileSlight,
    name: "you",
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
        imgSrc: hushed,
        text: "tut_mb-1.1",
        repeat: true,
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_data",
            options: [
              {
                imgSrc: hushed,
                text: "tut_data.ql",
                repeat: true,
                nextDialog: [
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_data.ql-1",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_data.ql-2",
                    onProceed: () => {
                      get(dialogApi).enableOption("tut_data.qn");
                    },
                  },
                ],
              },
              {
                imgSrc: hushed,
                text: "tut_data.qn",
                repeat: true,
                nextDialog: [
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_data.qn-1",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_data.qn-2",
                  },
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_data.qn-3",
                    onProceed: () => {
                      const hud = get(hudApi);
                      hud.startItemUnlock({
                        itemId: "pg",
                        onFinished: () => {
                          hud.startItemUnlock({
                            itemId: "th",
                          });
                        },
                      });
                      get(dialogApi).enableOption("tut_data.ok");
                    },
                  },
                ],
              },
              {
                imgSrc: smile,
                text: "tut_data.ok",
                nextDialog: [
                  {
                    imgSrc: radio,
                    name: "mission-control",
                    text: "tut_data.ok-1",
                    onProceed: () => {
                      get(hudApi).startItemUnlock({
                        itemId: "notepad",
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
        imgSrc: thinking,
        text: "tut_mb-1.2",
        repeat: true,
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_sm-1",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_sm-2",
            onStart: () => {
              get(hudApi).openSmModalWithDialog();
            },
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_sm-3",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_sm-4",
            onProceed: () => {
              get(hudApi).closeSmModalWithDialog();
              get(hudApi).startItemUnlock({
                itemId: "sm",
              });
              get(dialogApi).enableOption("tut_mb-1.3");
            },
          },
        ],
      },
      {
        imgSrc: smile,
        text: "tut_mb-1.3",
        nextDialog: [
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_info-1",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_info-2",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_info-3",
          },
          {
            imgSrc: neutral,
            name: "you",
            text: "tut_info-4",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_info-5",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_info-6",
          },
          {
            imgSrc: radio,
            name: "mission-control",
            text: "tut_info-7",
          },
        ],
      },
    ],
  },
];
