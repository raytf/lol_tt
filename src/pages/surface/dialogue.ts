import radio from "$assets/icons/radio.svg";

const missionBrief = [
  {
    imgSrc: radio,
    name: "mission-control",
    text: "brief-1",
    options: [
      {
        text: "brief-1_o1",
        nextDialog: [
          { imgSrc: radio, name: "mission-control", text: "brief-1_o1-1" },
        ],
      },
      {
        text: "brief-1_o2",
        nextDialog: [
          { imgSrc: radio, name: "mission-control", text: "brief-1_o2-1" },
        ],
      },
      {
        text: "brief-1_o3",
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
                nextDialog: [],
              },
            ],
          },
        ],
      },
      {
        text: "brief-2_o2",
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
