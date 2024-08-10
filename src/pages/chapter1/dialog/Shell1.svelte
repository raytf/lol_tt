<script lang="ts">
  import { Dialog } from "$components/dialog";
  import shell from "$assets/avatars/shell.png";

  const keys = [
    {
      text: "ch1-dialog_1",
    },
    {
      imgSrc: shell,
      name: "dialog-name_you",
      text: "ch1-dialog_2",
    },
    {
      text: "ch1-dialog_3",
    },
    {
      imgSrc: shell,
      name: "dialog-name_you",
      text: "ch1-dialog_4",
    },
  ];
</script>

<Dialog {keys} onFinished={() => console.log("finished")} />
