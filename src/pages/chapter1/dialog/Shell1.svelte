<script lang="ts">
  import { DialogBox } from "$components/dialog";
  import shell from "$assets/avatars/shell.png";
  import { getLolApi } from "$apis/lol.svelte";
  const lolApi = getLolApi();

  const keys = [
    {
      imgSrc: shell,
      name: "dialog-name_shell",
      text: "ch1-dialog_1",
    },
  ];
</script>

{#each keys as key, i}
  <DialogBox onclick={() => console.log("dialog hello")}>
    {#snippet avatar()}
      <img src={key.imgSrc} alt="avatar" class="w-[111px] h-[111px]" />
    {/snippet}
    {#snippet name()}
      {lolApi.getText(key.name)}
    {/snippet}
    {#snippet text()}
      {lolApi.getText(key.text)}
    {/snippet}
  </DialogBox>
{/each}
