<script lang="ts">
  import { Lol } from "$components/text";
  import { InfoButton } from "$components/ui/button";
  import { infoApi, lolApi } from "$apis";
</script>

<Lol key="np-cover_title" class="font-bold underline" />
<Lol key="np-cover_subtitle" />
<button
  onclick={() => {
    $infoApi.openModal({
      textKeys: ["tut_elaborate-ql"],
    });
  }}
  class="flex hover:font-bold pointer-events-auto"
>
  <InfoButton /><Lol key="ql-data" />
</button>
<button
  onclick={() => {
    $infoApi.openModal({
      textKeys: ["tut_elaborate-qn"],
    });
  }}
  class="flex hover:font-bold pointer-events-auto"
>
  <InfoButton /><Lol key="qn-data" />
</button>
<!-- <Lol key="notepad-line_ee-1" class="inline-block" /> -->
<p class="inline-block">
  {$lolApi.getText("np-cover_ee-1")}
  <button
    onclick={() => {
      $infoApi.openModal({
        textKeys: ["ee_desc-1", "ee_desc-2"],
      });
    }}
    class="inline-block hover:font-bold pointer-events-auto"
  >
    <InfoButton />{$lolApi.getText("ee_name")}
  </button>
</p>
<br />
<br />
<Lol key="np-cover_ee-2" />
