<script>
    import {gameIsReady} from "../lib/helpers/LoLApi.svelte.ts";
    $effect(() => {
        gameIsReady();
    })
</script>

<div class="size-full bg-blue-200">
    <h1>Init</h1>
</div>