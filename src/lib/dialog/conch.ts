import openMouth from "$assets/emoji/open-mouth.svg";
import neutral from "$assets/emoji/neutral.svg";
import pensive from "$assets/emoji/pensive.svg";
import smile from "$assets/emoji/smile.svg";
import thinking from "$assets/emoji/thinking.svg";
import confused from "$assets/emoji/confused.svg";
import dizzy from "$assets/emoji/dizzy.svg";
import conch_smile from "$assets/characters/conch/smile.png";

const observationTask = (onComplete?: () => void) => {
  return {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch1_conch-encounter-5",
    options: [
      {
        imgSrc: confused,
        text: "ch1_conch-encounter-5_o1",
        repeat: true,
        nextDialog: [
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch1_conch-encounter-5_o1-1",
          },
        ],
      },
      {
        imgSrc: smile,
        text: "ch1_conch-encounter-5_o2",
        nextDialog: [],
        onProceed: onComplete,
      },
    ],
  };
};

const conchEncounter1 = [
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch1_conch-encounter-1",
    options: [
      {
        imgSrc: openMouth,
        text: "ch1_conch-encounter-1_o1",
        nextDialog: [
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch1_conch-encounter-1_o1-1",
          },
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch1_conch-encounter-1_o1-2",
          },
        ],
      },
    ],
  },
];

const conchEncounter2 = (onComplete?: () => void) => {
  return [
    {
      imgSrc: conch_smile,
      name: "conch",
      text: "ch1_conch-encounter-2",
    },
    {
      imgSrc: conch_smile,
      name: "conch",
      text: "ch1_conch-encounter-3",
      options: [
        {
          imgSrc: neutral,
          text: "ch1_conch-encounter-3_o1",
          nextDialog: [],
        },
        {
          imgSrc: pensive,
          text: "ch1_conch-encounter-3_o2",
          nextDialog: [
            {
              imgSrc: neutral,
              name: "you",
              text: "ch1_conch-encounter-3_o2-1",
            },
            {
              imgSrc: neutral,
              name: "you",
              text: "ch1_conch-encounter-3_o2-2",
            },
            {
              imgSrc: conch_smile,
              name: "conch",
              text: "ch1_conch-encounter-3_o2-3",
            },
            {
              imgSrc: neutral,
              name: "you",
              text: "ch1_conch-encounter-3_o2-4",
            },
            {
              imgSrc: conch_smile,
              name: "conch",
              text: "ch1_conch-encounter-3_o2-5",
            },
            {
              imgSrc: conch_smile,
              name: "conch",
              text: "ch1_conch-encounter-3_o2-6",
            },
            {
              imgSrc: conch_smile,
              name: "conch",
              text: "ch1_conch-encounter-3_o2-7",
            },
            {
              imgSrc: conch_smile,
              name: "conch",
              text: "ch1_conch-encounter-3_o2-8",
            },
            {
              imgSrc: conch_smile,
              name: "conch",
              text: "ch1_conch-encounter-4",
            },
            observationTask(onComplete),
          ],
        },
      ],
    },
  ];
};

export { conchEncounter1, conchEncounter2 };
