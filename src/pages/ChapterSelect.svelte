<script>
  import { Card } from "flowbite-svelte";
  import { getGameApi } from "$apis/game.svelte";
  const gameApi = getGameApi();

  const chapters = [
    {
      id: 0,
      title: "Prologue",
      completed: true,
      link: "/prologue",
    },
    {
      id: 1,
      title: "Chapter 1",
      subtitle: "Above and Below",
      completed: false,
      link: "",
    },
    {
      id: 2,
      title: "Chapter 2",
      subtitle: "Light and Dark",
      completed: false,
      link: "",
    },
  ];
</script>

<div class="size-full p-8">
  <h1 class="text-5xl p-4">Chapter Select</h1>
  <div class="grid grid-cols-3 gap-4">
    {#each chapters as chapter}
      <Card
        class="dark cursor-pointer hover:bg-gray-700"
        onclick={() => gameApi.fadeScene(chapter.link)}
      >
        <h2 class="text-bold text-3xl text-white">{chapter.title}</h2>
        <p>{chapter.subtitle}</p>
      </Card>
    {/each}
  </div>
</div>

<style>
</style>
