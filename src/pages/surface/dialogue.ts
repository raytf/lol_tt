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
];

export { missionBrief };
