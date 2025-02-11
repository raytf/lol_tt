import {
  smile,
  grinOpen,
  kissingSmile,
  frownOpen,
  tongue,
  hushed as hushedRound,
} from "$assets/emoji/round";
import {
  hushed,
  smileOpen,
  unamused,
  openMouth,
  heartEyes,
  confused,
} from "$assets/emoji";

export const intro = [
  {
    imgSrc: smile,
    name: "dad",
    text: "intro-1",
    options: [
      {
        imgSrc: hushed,
        text: "intro-1.1",
        nextDialog: [
          {
            imgSrc: smile,
            name: "dad",
            text: "intro-1.1-1",
          },
          {
            imgSrc: smile,
            name: "dad",
            text: "intro-1.1-2",
          },
        ],
      },
    ],
  },
  {
    imgSrc: kissingSmile,
    name: "dad",
    text: "intro-2",
    options: [
      {
        imgSrc: smileOpen,
        text: "intro-2.1",
        nextDialog: [
          {
            imgSrc: tongue,
            name: "dad",
            text: "intro-2.1-1",
          },
          {
            imgSrc: unamused,
            name: "you",
            text: "intro-2.1-2",
          },
          {
            imgSrc: grinOpen,
            name: "dad",
            text: "intro-2.1-3",
          },
        ],
      },
    ],
  },
  {
    imgSrc: frownOpen,
    name: "dad",
    text: "intro-3",
  },
  {
    imgSrc: hushedRound,
    name: "dad",
    text: "intro-4",
    options: [
      { imgSrc: openMouth, text: "intro-4.1", nextDialog: [] },
      {
        imgSrc: hushed,
        text: "intro-4.2",
        nextDialog: [],
      },
      {
        imgSrc: confused,
        text: "intro-4.3",
        nextDialog: [],
      },
    ],
  },
  {
    imgSrc: smile,
    name: "dad",
    text: "intro-5",
  },
  {
    imgSrc: smile,
    name: "dad",
    text: "intro-6",
  },
  {
    imgSrc: grinOpen,
    name: "dad",
    text: "intro-7",
  },
];
