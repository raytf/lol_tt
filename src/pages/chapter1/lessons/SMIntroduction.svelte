<script>
  import { ScientificMethodDiagram } from "$components/scientificMethod";
  import { Dialog } from "$components/dialog";

  const dialogKeys = [
    {
      text: "ch1-dialog_1",
    },
  ];
</script>

<div class="size-full flex justify-center">
  <ScientificMethodDiagram
    class="w-[666px] h-[222px] mt-4"
    itemClass="h-[111px]"
  />
</div>
<Dialog keys={dialogKeys} />
