import smile from "$assets/emoji/smile.svg";

const keys = [
  {
    imgSrc: smile,
    name: "dialog-name_captain",
    text: "ch1_mb-1",
  },
  {
    imgSrc: smile,
    name: "dialog-name_captain",
    text: "ch1_mb-2",
    options: [
      {
        text: "ch1_mb-3_o1",
        nextDialog: [
          { imgSrc: smile, name: "dialog-name_captain", text: "ch1_mb-4_o1" },
          { imgSrc: smile, name: "dialog-name_captain", text: "ch1_mb-5_o1" },
        ],
      },
      {
        text: "ch1_mb-3_o2",
        nextDialog: [
          { imgSrc: smile, name: "dialog-name_captain", text: "ch1_mb-4_o2" },
          { imgSrc: smile, name: "dialog-name_captain", text: "ch1_mb-5_o2" },
        ],
      },
    ],
  },
  {
    imgSrc: smile,
    name: "dialog-name_captain",
    text: "ch1_mb-6",
  },
  {
    imgSrc: smile,
    name: "dialog-name_captain",
    text: "ch1_mb-7",
    options: [
      {
        text: "ch1_mb-8_o1",
        nextDialog: [
          {
            imgSrc: smile,
            name: "dialog-name_captain",
            text: "ch1_mb-9_o1",
          },
          {
            imgSrc: smile,
            name: "dialog-name_captain",
            text: "ch1_mb-10_o1",
          },
        ],
        repeat: true,
      },
      {
        text: "ch1_mb-8_o2",
        nextDialog: [
          {
            imgSrc: smile,
            name: "dialog-name_captain",
            text: "ch1_mb-9_o2",
          },
          {
            imgSrc: smile,
            name: "dialog-name_captain",
            text: "ch1_mb-10_o2",
          },
        ],
        repeat: true,
      },
      {
        text: "ch1_mb-8_o3",
        nextDialog: [
          {
            imgSrc: smile,
            name: "dialog-name_captain",
            text: "ch1_mb-9_o3",
          },
          {
            imgSrc: smile,
            name: "dialog-name_captain",
            text: "ch1_mb-10_o3",
            italic: true,
          },
        ],
      },
    ],
  },
];

export default keys;
