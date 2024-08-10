<script>
  import { Card } from "flowbite-svelte";
  import UnderwaterGradient from "$components/visual/UnderwaterGradient.svelte";
  import { Done } from "$components/svg";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

  const chapters = [
    {
      id: 0,
      title: "Prologue",
      subtitle: "",
      link: "/prologue",
      completed: false,
      unlocked: true,
    },
    {
      id: 1,
      title: "Chapter 1",
      subtitle: "Light and Dark",
      link: "/chapter1/exploration",
      completed: false,
      unlocked: true,
    },
    {
      id: 2,
      title: "Chapter 2",
      subtitle: "Above and Below",
      link: "",
      completed: false,
      unlocked: false,
    },
    {
      id: 3,
      title: "Chapter 3",
      subtitle: "Hot and Cold",
      link: "",
      completed: false,
      unlocked: false,
    },
  ];
</script>

<div class="size-full flex flex-col items-center">
  <UnderwaterGradient
    --color-top="#20a4f3"
    --color-bottom="#182b3a"
    class="absolute size-full z-[-1]"
  />
  <h1 class="text-5xl p-8 font-bold text-slate-900">Chapter Select</h1>
  <div class="grid grid-cols-2 gap-4">
    {#each chapters as chapter}
      <Card
        class="relative w-[444px] dark cursor-pointer hover:bg-gray-700 {chapter.unlocked
          ? ''
          : 'blur pointer-events-none'}"
        onclick={() => gameApi.fadeScene(chapter.link)}
      >
        {#if chapter.completed}
          <Done class="absolute right-0 top-0 text-3xl text-green-400" />
        {/if}
        <h2 class="text-bold text-3xl text-white">
          {chapter.title}
        </h2>
        <p>{chapter.subtitle}</p>
      </Card>
    {/each}
  </div>
</div>

<style>
</style>
