import { get } from "svelte/store";
import { hudApi, dialogApi, smApi, objectivesApi } from "$apis";
import openMouth from "$assets/emoji/open-mouth.svg";
import neutral from "$assets/emoji/neutral.svg";
import pensive from "$assets/emoji/pensive.svg";
import smile from "$assets/emoji/smile.svg";
import thinking from "$assets/emoji/thinking.svg";
import confused from "$assets/emoji/confused.svg";
import dizzy from "$assets/emoji/dizzy.svg";
import conch_smile from "$assets/characters/conch/smile.png";
import conch_scary from "$assets/characters/conch/scary.png";
import conch_openMouth from "$assets/characters/conch/openMouth.png";
import conch_frown from "$assets/characters/conch/frown.png";
import conch_neutral from "$assets/characters/conch/neutral.png";
import conch_cool from "$assets/characters/conch/cool.png";

export const observationTask = (onComplete?: () => void) => {
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

export const conchEncounter1 = [
  {
    imgSrc: conch_scary,
    name: "conch",
    text: "ch1_conch-encounter-1",
    options: [
      {
        imgSrc: openMouth,
        text: "ch1_conch-encounter-1_o1",
        nextDialog: [
          {
            imgSrc: conch_neutral,
            name: "conch",
            text: "ch1_conch-encounter-1_o1-1",
          },
          {
            imgSrc: conch_cool,
            name: "conch",
            text: "ch1_conch-encounter-1_o1-2",
          },
        ],
      },
    ],
  },
];

export const conchEncounter2 = (onComplete?: () => void) => {
  return [
    {
      imgSrc: conch_scary,
      name: "conch",
      text: "ch1_conch-encounter-2",
    },
    {
      imgSrc: conch_scary,
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
              imgSrc: conch_neutral,
              name: "conch",
              text: "ch1_conch-encounter-3_o2-3",
            },
            {
              imgSrc: neutral,
              name: "you",
              text: "ch1_conch-encounter-3_o2-4",
            },
            {
              imgSrc: conch_openMouth,
              name: "conch",
              text: "ch1_conch-encounter-3_o2-5",
            },
            {
              imgSrc: conch_frown,
              name: "conch",
              text: "ch1_conch-encounter-3_o2-6",
            },
            {
              imgSrc: conch_neutral,
              name: "conch",
              text: "ch1_conch-encounter-3_o2-7",
            },
            {
              imgSrc: conch_neutral,
              name: "conch",
              text: "ch1_conch-encounter-3_o2-8",
              onProceed: () => {
                get(smApi).isInteractable = false;
                get(smApi).modalClass = "pt-[111px]";
                get(hudApi).showSmModal = true;
              },
            },
            {
              imgSrc: conch_neutral,
              name: "conch",
              text: "ch1_conch-encounter-4",
              onProceed: () => {
                get(smApi).currentIndex = 0;
              },
            },
            {
              imgSrc: conch_neutral,
              name: "conch",
              text: "sm-observation_desc",
              onProceed: () => {
                get(hudApi).showSmModal = false;
                get(smApi).reset();
              },
            },
            observationTask(onComplete),
          ],
        },
      ],
    },
  ];
};

export const conchReview1 = [
  {
    imgSrc: conch_scary,
    name: "conch",
    text: "ch1_conch-review-1",
    options: [
      {
        imgSrc: openMouth,
        text: "ch1_conch-review-1_o1",
        nextDialog: [
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch1_conch-review-1_o1-1",
          },
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch1_conch-review-1_o1-2",
          },
        ],
      },
    ],
    onProceed: () => {
      get(smApi).isInteractable = false;
      get(smApi).modalClass = "pt-[111px]";
      get(hudApi).showSmModal = true;
    },
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch1_conch-review-2",
    onProceed: () => {
      get(smApi).currentIndex = 1;
    },
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch1_conch-review-3",
    onProceed: () => {
      get(hudApi).showSmModal = false;
      get(smApi).reset();
    },
  },
  {
    imgSrc: conch_smile,
    name: "conch",
    text: "ch1_conch-review-4",
    options: [
      {
        imgSrc: thinking,
        text: "ch1_conch-review-4_q1",
        nextDialog: [
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch1_conch-review-4_q1-1",
          },
          {
            imgSrc: conch_smile,
            name: "conch",
            text: "ch1_conch-review-4_q1-2",
            options: [
              {
                imgSrc: thinking,
                text: "ch1_conch-review-4_q2",
                nextDialog: [
                  {
                    imgSrc: conch_smile,
                    name: "conch",
                    text: "ch1_conch-review-4_q2-1",
                  },
                  {
                    imgSrc: conch_smile,
                    name: "conch",
                    text: "ch1_conch-review-4_q2-2",
                    options: [
                      {
                        imgSrc: thinking,
                        text: "ch1_conch-review-4_q3",
                        nextDialog: [
                          {
                            imgSrc: conch_smile,
                            name: "conch",
                            text: "ch1_conch-review-4_q3-1",
                          },
                          {
                            imgSrc: conch_smile,
                            name: "conch",
                            text: "ch1_conch-review-4_q3-2",
                            onProceed: () => {},
                          },
                          {
                            imgSrc: conch_smile,
                            name: "conch",
                            text: "ch1_conch-review-5",
                          },
                        ],
                      },
                    ],
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
