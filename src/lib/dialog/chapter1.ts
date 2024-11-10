import openMouth from "$assets/emoji/open-mouth.svg";
import conch_smile from "$assets/characters/conch/smile.png";

const conchEncounter = [
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

export { conchEncounter };
