<script lang="ts">
  import { onMount } from "svelte";
  import type { DialogKey } from "$components/dialog";
  import { Dialog, QuestionDialog } from "$components/dialog";
  import smile from "$assets/emoji/smile.svg";

  const keys1 = [
    {
      imgSrc: smile,
      name: "dialog-name_captain",
      text: "ch1_1-1",
    },
    {
      imgSrc: smile,
      name: "dialog-name_captain",
      text: "ch1_1-2",
      options: [
        {
          text: "ch1_1-3_o1",
          nextDialog: [
            { imgSrc: smile, name: "dialog-name_captain", text: "ch1_1-4_o1" },
          ],
        },
        {
          text: "ch1_1-3_o2",
          nextDialog: [
            { imgSrc: smile, name: "dialog-name_captain", text: "ch1_1-4_o2" },
          ],
        },
      ],
    },
  ];

  const keys2 = [
    {
      imgSrc: smile,
      name: "dialog-name_captain",
      text: "ch1_1-5",
    },
    {
      imgSrc: smile,
      name: "dialog-name_captain",
      text: "ch1_1-6",
    },
    {
      imgSrc: smile,
      name: "dialog-name_captain",
      text: "ch1_2-1",
      options: [
        {
          text: "ch1_2-2_o1",
          nextDialog: [
            {
              imgSrc: smile,
              name: "dialog-name_captain",
              text: "ch1_2-3_o1",
            },
            {
              imgSrc: smile,
              name: "dialog-name_captain",
              text: "ch1_2-4_o1",
            },
          ],
        },
      ],
    },
  ];

  const smKeys = [
    {
      imgSrc: smile,
      name: "dialog-name_captain",
      text: "ch1_3-1",
    },
    {
      imgSrc: smile,
      name: "dialog-name_captain",
      text: "ch1_3-2",
    },
  ];
  const dialog = [keys1, keys2];
  let currentDialogIndex = $state(-1);
  let currentDialogKeys = $state<DialogKey[]>([]);

  function proceedDialog() {
    currentDialogIndex++;
    if (currentDialogIndex >= dialog.length) {
      currentDialogKeys = [];
      return;
    }

    currentDialogKeys = dialog[currentDialogIndex];
  }

  onMount(() => {
    proceedDialog();
  });
</script>

<Dialog
  once={false}
  top={true}
  keys={currentDialogKeys}
  onFinished={(nextDialog) => {
    if (nextDialog.length > 0) {
      currentDialogKeys = nextDialog;
      return;
    }
    proceedDialog();
  }}
/>
<!-- <OptionDialog
  option1Key="ch1_1-3_o1"
  option1DialogKeys={[
    { imgSrc: smile, name: "dialog-name_captain", text: "ch1_1-4_o1" },
  ]}
  option2Key="ch1_1-3_o2"
  option2DialogKeys={[
    { imgSrc: smile, name: "dialog-name_captain", text: "ch1_1-4_o2" },
  ]}
/> -->
